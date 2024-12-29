const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Import the database connection

const router = express.Router();
const SECRET_KEY = 'your_secret_key_here'; // Replace this with an environment variable

// Rider Login Route
router.post('/rider/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find rider by email
    const [result] = await db.query('SELECT * FROM rider WHERE email = ?', [email]);

    // Check if rider exists
    if (result.length === 0) {
      return res.status(400).json({ error: 'Rider not found' });
    }

    const rider = result[0];

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, rider.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid login credentials' });
    }

    // Generate a JWT token for the rider
    const token = jwt.sign({ id: rider.id, email: rider.email }, SECRET_KEY, { expiresIn: '1h' });

    // Send response with token and redirect information
    res.status(200).json({ token, redirect: '/ridebooking' });
  } catch (error) {
    console.error('Error during rider login:', error.message);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
