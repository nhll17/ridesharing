const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Route to get all available rides with status 'pending'
router.get('/rides', async (req, res) => {
  try {
    // Query to fetch all rides with status = 'pending'
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "pending"');
    
    // Log the fetched rows for debugging
    console.log('Fetched rides:', rows);
    
    // Send the fetched rides
    res.json(rows);
  } catch (error) {
    console.error('Error fetching available rides:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching available rides' });
  }
});

// Route to book a ride
router.post('/rides/book/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Update the ride status to 'booked'
    await db.query('UPDATE drivedetails SET status = "booked" WHERE id = ?', [rideId]);
    
    // Send a success message
    res.json({ message: 'Ride booked successfully' });
  } catch (error) {
    console.error('Error booking ride:', error.message, error.stack);
    res.status(500).json({ message: 'Error booking ride' });
  }
});

module.exports = router;
