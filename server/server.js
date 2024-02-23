const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://Insightsfull:Insightsfull2024@insightsfull.admxrow.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
