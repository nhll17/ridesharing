const express = require('express');
const db = require('./db'); // Import your database connection
const router = express.Router();

// Endpoint to add drive details
router.post('/drives', async (req, res) => {
  const { startLocation, endLocation, time, availableSeats, vehicleDetails, rate, phone } = req.body;

  try {
    const sql = `
      INSERT INTO drivedetails (start, end, date, seats, vehicle_type, price, phone_no)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [startLocation, endLocation, time, availableSeats, vehicleDetails, rate, phone]);
    
    res.status(201).json({ message: 'Drive details saved successfully!' });
  } catch (error) {
    console.error('Error inserting drive details:', error);
    res.status(500).json({ error: 'Failed to save drive details' });
  }
});

module.exports = router;
