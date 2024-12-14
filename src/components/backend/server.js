require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS package
const mysql = require("mysql2");
const app = express();

// Log environment variables for debugging
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

// CORS setup: Allow requests from your frontend (localhost:3000)
const corsOptions = {
  origin: "http://localhost:3000", // Ensure this matches the frontend URL
  methods: "GET,POST",
  credentials: true, // If you need to include cookies or headers
};

// Enable CORS middleware globally for all routes
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

// Test database connection
db.getConnection()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if connection fails
  });

// API endpoint for user queries (Contact Form)
app.post("/api/form", (req, res) => {
  const { name, email, contact, query } = req.body;

  // Insert data into the database
  const queryStr = "INSERT INTO user_queries (name, email, contact, query) VALUES (?, ?, ?, ?)";
  
  db.query(queryStr, [name, email, contact, query])
    .then(() => res.status(200).json({ message: "Your query has been sent" }))
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Database error" });
    });
});

// Admin login endpoint
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Validate the admin credentials (check against the database or predefined values)
  const adminQuery = "SELECT * FROM user WHERE username = ? AND password = ?";
  
  db.query(adminQuery, [username, password])
    .then((results) => {
      if (results.length > 0) {
        // If credentials are valid, return success
        res.status(200).json({ message: "Login successful", admin: results[0] });
      } else {
        // Invalid credentials
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error("Error during admin login:", err);
      res.status(500).json({ error: "Database error" });
    });
});

// GET endpoint to fetch all queries
app.get("/api/admin/queries", async (req, res) => {
  const queriesQuery = "SELECT * FROM user_queries";

  try {
    const [results] = await db.query(queriesQuery); // Use `await` and destructure the result
    console.log("Fetched queries:", results);  // Log the results for debugging
    res.json(results);
  } catch (err) {
    console.error("Error fetching queries:", err);
    res.status(500).json({ message: "Error fetching queries", error: err.message });
  }
});

// Other APIs can be added here
// Start the server
const PORT = process.env.PORT || 5000; // Use the environment's PORT or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
