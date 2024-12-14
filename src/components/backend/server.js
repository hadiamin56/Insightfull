require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

// CORS setup

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://insightfull.vercel.app'], // Add allowed origins here
  credentials: true, // Allow credentials if needed
};

// Apply CORS middleware
app.options('*', cors(corsOptions)); // Enable preflight for all routes

// Middleware
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

// API endpoint for user queries
app.post("/api/form", (req, res) => {
  const { name, email, contact, query } = req.body;
  const queryStr =
    "INSERT INTO user_queries (name, email, contact, query) VALUES (?, ?, ?, ?)";
  db.query(queryStr, [name, email, contact, query])
    .then(() => res.status(200).json({ message: "Your query has been sent" }))
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Database error" });
    });
});

// Endpoint for admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const queryStr = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(queryStr, [username, password])
    .then(([result]) => {
      if (result.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        res.status(200).json({ message: "Login successful", admin: result[0] });
      }
    })
    .catch((err) => {
      console.error("Error validating admin login:", err);
      res.status(500).json({ error: "Database error" });
    });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the environment's PORT or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
