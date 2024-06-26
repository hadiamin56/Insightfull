const express = require('express');
const router = express.Router();
const User = require('../models/signupmodels');

// Add this line to parse form data
router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (request, response) => {
    try {
        const { fullName, contactnumber, email, Reason } = request.body;

        // Create a new user
        const newUser = new User({ fullName, contactnumber, email, Reason });
        const savedUser = await newUser.save();

        response.json(savedUser);
    } catch (error) {
        console.error('Error during signup:', error);
        response.status(500).json({ error: 'An internal server error occurred' });
    }
});

module.exports = router;
