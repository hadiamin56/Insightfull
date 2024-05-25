const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(/* MongoDB connection options */);

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Define other fields here
});
const Contact = mongoose.model('Contact', contactSchema);

// Endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newContact = new Contact({ name, email });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
