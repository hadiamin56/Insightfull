const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9622451242@hH",
  database: "insightfull",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// API endpoint
app.post("/api/form", (req, res) => {
  const { name, email, contact, query } = req.body;
  const queryStr = "INSERT INTO user_queries (name, email, contact, query) VALUES (?, ?, ?, ?)";
  db.query(queryStr, [name, email, contact, query], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Database error" });  // Updated to send JSON response
    } else {
      res.status(200).json({ message: "Your query has been sent" });  // Sending success as JSON
    }
  });
});

// Endpoint for admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Query to validate admin credentials
  const queryStr = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(queryStr, [username, password], (err, result) => {
    if (err) {
      console.error("Error validating admin login:", err);
      res.status(500).json({ error: "Database error" });
    } else if (result.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      // Admin successfully authenticated
      res.status(200).json({ message: "Login successful", admin: result[0] });
    }
  });
});

// Endpoint to fetch all user queries (protected)
app.get("/api/admin/user-queries", (req, res) => {
  const queryStr = "SELECT * FROM user_queries";
  db.query(queryStr, (err, results) => {
    if (err) {
      console.error("Error fetching user queries:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start server
const PORT = 5000;  // Make sure the server listens on port 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
