const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming db is already set up

// Route to get available rides (pending status)
router.get('/rides', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "pending"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching available rides:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching available rides' });
  }
});

// Route to request a new ride booking
router.post('/rides/requested', async (req, res) => {
  const { pickup, dropoff, time, seats } = req.body;
  try {
    // Insert new booking request into the `ride_requests` table (create this table if it doesn't exist)
    const sql = `
      INSERT INTO ride_requests (pickup, dropoff, time, seats, status)
      VALUES (?, ?, ?, ?, "pending")
    `;
    await db.query(sql, [pickup, dropoff, time, seats]);
    
    // Respond with success
    res.status(201).json({ message: 'Ride booking request created successfully!' });
  } catch (error) {
    console.error('Error creating ride booking request:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to create ride booking request' });
  }
});

// Route to book a specific ride by ID
router.post('/rides/book/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Update the ride status to 'booked'
    await db.query('UPDATE drivedetails SET status = "booked" WHERE id = ?', [rideId]);
    res.json({ message: 'Ride booked successfully' });
  } catch (error) {
    console.error('Error booking ride:', error.message, error.stack);
    res.status(500).json({ message: 'Error booking ride' });
  }
});

module.exports = router;
