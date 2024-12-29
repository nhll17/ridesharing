const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Route to get all approved rides
router.get('/rides/rideStatus', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "approved"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching approved rides:', error.message);
    res.status(500).json({ message: 'Error fetching approved rides' });
  }
});



module.exports = router;
