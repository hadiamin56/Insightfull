const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

require('dotenv').config(); // To load .env variables
const app = express();

app.use(cors({
  origin: ["https://insightfull.vercel.app", "http://localhost:3000","https://sql7.freemysqlhosting.net"], // Allow local and deployed frontend
  credentials: true
}));

// Middleware
app.use(bodyParser.json());


// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST ,  // Default to localhost for local
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database!');
});


// API endpoint
app.post("/api/form", (req, res) => {
  const { name, email, contact, query } = req.body;
  const queryStr = "INSERT INTO user_queries (name, email, contact, query) VALUES (?, ?, ?, ?)";
  db.query(queryStr, [name, email, contact, query], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json({ message: "Your query has been sent" });
    }
  });
});

// Endpoint for admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const queryStr = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(queryStr, [username, password], (err, result) => {
    if (err) {
      console.error("Error validating admin login:", err);
      res.status(500).json({ error: "Database error" });
    } else if (result.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(200).json({ message: "Login successful", admin: result[0] });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000; // Use PORT environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
