const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Import the database connection

const router = express.Router();
const SECRET_KEY = 'your_secret_key_here'; // Use an environment variable for security

// Driver Login Route
router.post('/driver/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find driver by email
    const [result] = await db.query('SELECT * FROM driver WHERE email = ?', [email]);

    // Check if driver exists
    if (result.length === 0) {
      return res.status(400).json({ error: 'Driver not found' });
    }

    const driver = result[0];

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, driver.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid login credentials' });
    }

    // Generate a JWT token for the driver
    const token = jwt.sign({ id: driver.id, email: driver.email }, SECRET_KEY, { expiresIn: '1h' });

    // Send response with token and redirect information
    res.status(200).json({ token, redirect: '/driverdashboard' });
  } catch (error) {
    console.error('Error during driver login:', error.message);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
