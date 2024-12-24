require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2/promise'); // Use the promise version of mysql2
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session); // For MySQL session store
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const xlsx = require("xlsx");
// const fileUpload = require('express-fileupload');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify folder where files will be uploaded
  },
  filename: (req, file, cb) => {
    // Set the filename of the uploaded file
    cb(null, Date.now() + path.extname(file.originalname)); // Using timestamp as unique file name
  }
});

// Create a multer instance with disk storage for other API
const uploadDisk = multer({ storage });

// Create a multer instance with in-memory storage for the '/upload-result' endpoint
const uploadMemory = multer(); // Default storage (in-memory storage)

// CORS setup: Allow requests from your frontend (localhost:3000)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_FRONTEND_URL // Vercel URL in production
    : 'http://localhost:3000', // Local URL for development
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allow DELETE method
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers to allow
  credentials: true, // Allow credentials to be true
};

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());
// Middleware to parse form data (file uploads)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session configuration// app.use(fileUpload()); // Initialize file upload middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    cookie: { 
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000, // 1 hour expiration time for session
    },
  })
);

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectTimeout: 10000, // 10 seconds
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
db.getConnection()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if connection fails
  });


  //admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      const adminQuery = "SELECT * FROM user WHERE username = ? AND password = ?";
      const [results] = await db.query(adminQuery, [username, password]);
  
      if (results.length > 0) {
        req.session.isAdmin = true;
        req.session.user = results[0];
        return res.status(200).json({ message: "Login successful", admin: results[0] });
      } else {
        return res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (err) {
      console.error("Backend error:", err);
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });

// API endpoint to get user queries from the database
// Define the /api/admin/queries endpoint
app.get('/api/admin/queries', async (req, res) => {
  try {
    // Query to fetch results sorted by 'status' (0 at the top and 1 at the bottom)
    const [results] = await db.query('SELECT * FROM user_queries ORDER BY status ASC');
    res.status(200).json(results); // Return the result as JSON
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      error: 'Failed to fetch queries',
      details: err.message
    });
  }
});

// PATCH route to update notes and status
app.patch("/api/admin/updateQuery/:id", async (req, res) => {
  const { id } = req.params;
  const { notes, status } = req.body;

  try {
    const connection = await db.getConnection();

    const query = `
      UPDATE user_queries
      SET notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await connection.execute(query, [notes, status, id]);
    connection.release();

    res.status(200).json({ message: "Query updated successfully!" });
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ error: "Failed to update query" });
  }
});



// Admin logout endpoint
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out successfully" });
  });
});

// Session check endpoint
app.get("/api/admin/session", (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({ isLoggedIn: true });
  }
  res.json({ isLoggedIn: false });
});
// POST endpoint to handle private sectors submission
app.post('/api/admin/PrivateSectors', uploadDisk.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.path : null;  // Get the image file path
  // Validate input data
  if (!title || !description || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert form data into the database
  const insertQuery = "INSERT INTO private_sectors (title, description, image) VALUES (?, ?, ?)";
  try {
    await db.query(insertQuery, [title, description, image]);
    res.status(200).json({ message: "Your data has been submitted successfully!" });
  } catch (err) {
    console.error("Error inserting query:", err);
    res.status(500).json({ message: "Error submitting query, please try again later." });
  }
});

// POST endpoint to handle contact form submission
app.post('/api/form', async (req, res) => {
  const { name, email, contact, query } = req.body;

  // Validate input data
  if (!name || !email || !contact || !query) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert form data into the database
  const insertQuery = "INSERT INTO user_queries (name, email, contact, query, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
  try {
    await db.query(insertQuery, [name, email, contact, query]);
    res.status(200).json({ message: "Your query has been submitted successfully!" });
  } catch (err) {
    console.error("Error inserting query:", err);
    res.status(500).json({ message: "Error submitting query, please try again later." });
  }
});

// GET endpoint to fetch all private sectors
app.get('/api/admin/PrivateSectorDetails', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM private_sectors');
    if (result[0] && result[0].length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ message: 'Error fetching data from database', error: err.message });
  }
});

// DELETE endpoint to delete a private sector
app.delete('/api/admin/PrivateSectorDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM private_sectors WHERE id = ?', [id]);
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).json({ message: 'Error deleting record' });
  }
});

app.post("/api/admin/uploadSliderImage", uploadDisk.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename } = req.file;
  const imageUrl = "uploads/" + filename;

  try {
    console.log("File uploaded successfully:", filename);

    // Insert image URL into the database
    const connection = await db.getConnection();
    const query = `INSERT INTO slider_table (image_url) VALUES (?)`;
    const [result] = await connection.execute(query, [imageUrl]);
    connection.release();

    res.status(200).json({
      message: "File uploaded successfully.",
      image: {
        id: result.insertId, // Include the ID for frontend usage
        image_url: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to upload image.", details: error.message });
  }
});




app.get("/api/admin/getSliderImages", async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute("SELECT * FROM slider_table");
    connection.release();

    // Log the rows fetched from the database
    console.log("Fetched Images:", rows);

    if (rows.length === 0) {
      return res.status(200).json([]); // Send an empty array if no images found
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching slider images:", error);
    res.status(500).json({ error: "Failed to fetch images", details: error.message });
  }
});

// DELETE route to delete a slider image by its ID
app.delete("/api/admin/deleteSliderImage/:id", async (req, res) => {
  const imageId = req.params.id;

  try {
    // Query to delete the image from the database by ID
    const connection = await db.getConnection();
    const [result] = await connection.execute(
      "DELETE FROM slider_table WHERE id = ?",
      [imageId]
    );
    connection.release(); // Release the connection back to the pool

    // If no rows were affected, the image wasn't found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image", details: error.message });
  }
});


// API to upload result (file uploaded in memory, no file saved to disk)
app.post("/upload-result", uploadMemory.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Read the uploaded Excel file data (from memory, no file saved to disk)
    const workbook = xlsx.read(file.buffer, { type: "buffer" });

    // Assuming the first sheet contains the student results
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Log the parsed data to inspect it
    console.log("Parsed Data:", data);

    // Prepare the data for saving to the database
    const studentResults = data.map((row) => ({
      name: row["Name"],
      parentage: row["Parentage"],
      class: row["Class"],
      section: row["Section"],
      phone_number: row["Phone Number"],
      roll_no: row["Roll No"],
      dob: row["DOB"],
      max_marks: row["Max Marks"],
      marks_obtained: row["Marks Obtained"],
      result: row["Result"],
    }));

    // Save the student results to the database
    const response = await saveStudentResults(studentResults);

    // Handle different responses based on the results
    if (response.errors.length > 0 && response.successes.length === 0) {
      // If all records already exist
      res.status(200).json({
        message: "No new records added. All data already exists.",
        errors: response.errors,
      });
    } else if (response.successes.length > 0) {
      // If some records are added
      res.status(200).json({
        message: "File processed and data saved successfully!",
        errors: response.errors,
        successes: response.successes,
      });
    } else {
      // Default response
      res.status(200).json({
        message: "No changes made.",
      });
    }
  } catch (error) {
    console.error("Error processing uploaded file:", error);
    res.status(500).json({ message: "Error processing file.", error });
  }
});

// Function to save student results to the database
const saveStudentResults = async (studentResults) => {
  const queryInsert = `
    INSERT INTO student_results 
      (name, parentage, class, section, phone_number, roll_no, dob, max_marks, marks_obtained, result)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const checkQuery = `
    SELECT COUNT(*) AS count FROM student_results WHERE roll_no = ?
  `;

  let errors = [];
  let successes = [];

  try {
    for (const result of studentResults) {
      // Check if roll_no already exists in the database
      const [rows] = await db.query(checkQuery, [result.roll_no]);
      if (rows[0].count > 0) {
        // If roll_no exists, push an error message
        errors.push(`Roll No ${result.roll_no} already exists.`);
      } else {
        // Insert new record into the database
        await db.query(queryInsert, [
          result.name,
          result.parentage,
          result.class,
          result.section,
          result.phone_number,
          result.roll_no,
          result.dob,
          result.max_marks,
          result.marks_obtained,
          result.result,
        ]);
        successes.push(`Roll No ${result.roll_no} added successfully.`);
      }
    }

    return {
      errors,
      successes,
    };

  } catch (error) {
    console.error("Error saving student results: ", error);
    throw new Error("Database error");
  }
};




//get search results for roll no
app.get("/api/results", async (req, res) => {
  const rollNo = req.query.roll_no; // Get roll_no from query parameter

  if (!rollNo) {
    return res.status(400).json({ error: "roll_no is required" });
  }

  try {
    // Execute the query using async/await
    const [results] = await db.query("SELECT * FROM student_results WHERE roll_no = ?", [rollNo]);

    // Check if any results are found
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found for the given roll number." });
    }

    // Send the first matching result
    res.status(200).json(results[0]); // Return the first result as JSON
  } catch (err) {
    // Log the error and send a 500 status code if there was an issue
    console.error("Error executing query:", err);
    res.status(500).json({
      error: "Failed to fetch data",
      details: err.message, // Include the error message for debugging
    });
  }
});

// Endpoint to fetch all student results
app.get("/api/results/all-results", async (req, res) => {
  try {
    // Query to fetch all records
    const query = `
      SELECT * FROM student_results
    `;

    // Execute the query
    const [results] = await db.query(query); // Assuming db.query() supports promise-based execution

    // Check if any data is available
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found." });
    }

    // Send the results as JSON
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching all results:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


app.post("/api/admin/uploadMultipleImages", uploadDisk.array("images", 10), async (req, res) => {
  // Check if files are uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded." });
  }

  const query = "INSERT INTO images_gallery (image_path) VALUES (?)";

  try {
    // Get a connection from the pool
    const connection = await db.getConnection();

    // Loop through each uploaded image and insert into the database
    for (const file of req.files) {
      const imagePath = file.path; // Get the uploaded image path
      await connection.execute(query, [imagePath]); // Use await with promise-based db.execute
    }

    connection.release(); // Release the connection back to the pool

    // Send success response after processing all files
    res.status(200).json({
      message: "Images uploaded and saved successfully.",
    });
  } catch (err) {
    console.error("Error inserting data into the database:", err);
    return res.status(500).json({ message: "Database error." });
  }
});

// Route to fetch images from the gallery
app.get("/api/admin/imagesGallery", async (req, res) => {
  const query = "SELECT id, image_path FROM images_gallery"; // Ensure id is selected

  try {
    // Get a connection from the pool
    const connection = await db.getConnection();

    // Execute the query
    const [rows] = await connection.execute(query);
    console.log(rows); // Check the fetched rows to ensure id is there
    connection.release(); // Release the connection back to the pool

    // Map the rows to include full URLs for each image, and include the id
    const images = rows.map((row) => ({
      id: row.id, // Include the image ID
      image_url: `http://localhost:5000/${row.image_path}`, // Adjust the URL
    }));

    // Send the list of images
    res.status(200).json({ images });
  } catch (err) {
    console.error("Error fetching gallery images:", err);
    return res.status(500).json({ message: "Failed to fetch gallery images." });
  }
});


//delete image from
app.delete("/api/admin/deleteImage/:id", async (req, res) => {
  const imageId = req.params.id; // Image ID to be deleted
  try {
    // Query to delete the image from the database by ID
    const connection = await db.getConnection();
    const [result] = await connection.execute(
      "DELETE FROM images_gallery WHERE id = ?",
      [imageId]
    );
    connection.release(); // Release the connection back to the pool

    // If no rows were affected, the image wasn't found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image", details: error.message });
  }
});


app.post("/api/notifications", uploadDisk.single("file"), async (req, res) => {
  const { notification_text, link_text } = req.body;
  let filePath = null;

  // Check if file is uploaded
  if (req.file) {
    filePath = req.file.path; // Path of the uploaded file
  }

  try {
    // Insert the notification into the database
    const result = await db.query(
      "INSERT INTO Notifications (notification_text, file_path, link_text) VALUES (?, ?, ?)",
      [notification_text, filePath, link_text]
    );

    res.json({
      id: result.insertId,
      notification_text,
      file_path: filePath,
      link_text,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add notification." });
  }
});


// Your API endpoint
app.get("/api/notificationsview", async (req, res) => {
  try {
    // Use `await` instead of a callback-based query
    const [results, fields] = await db.query("SELECT * FROM Notifications ORDER BY created_at DESC");
    res.json(results); // Send back the fetched results
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});

app.delete('/api/notificationdelete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch file path before deleting
    const [result] = await db.query('SELECT file_path FROM Notifications WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    const filePath = result[0].file_path;

    // Delete the notification from the database
    await db.query('DELETE FROM Notifications WHERE id = ?', [id]);

    // Remove associated file if it exists
    if (filePath) {
      const fs = require('fs');
      const path = require('path');
      const fileToDelete = path.join(__dirname, 'uploads', path.basename(filePath));

      fs.unlink(fileToDelete, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Failed to delete file:', err);
        }
      });
    }

    res.status(200).json({ message: 'Notification deleted successfully!' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: 'Error deleting notification.' });
  }
});

  
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;
