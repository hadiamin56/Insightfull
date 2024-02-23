const UserModel = require('../models/User');

exports.submitForm = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // If the email already exists, send a response with an error message
      return res.status(400).json({ message: 'Email already exists' });
    }

    // If the email is unique, create a new user and save it to the database
    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
