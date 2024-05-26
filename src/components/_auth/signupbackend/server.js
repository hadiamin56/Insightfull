const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is up and running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to database:', error));

app.use(express.json());
app.use(cors({ origin: 'https://insightfull.vercel.app' })); // Allow requests from frontend domain
app.use('/app', routes);
