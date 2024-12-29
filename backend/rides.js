const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Route to get requested rides
router.get('/rides/requested', async (req, res) => {
  try {
    // Ensure you're selecting from the correct table and matching status
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "booked"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching ride requests:', error);
    res.status(500).json({ message: 'Error fetching ride requests' });
  }
});

// Route to approve a ride
router.post('/rides/approve/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Ensure you're updating the correct table and using the correct status column
    await db.query('UPDATE drivedetails SET status = "approved" WHERE id = ?', [rideId]);
    res.json({ message: 'Ride approved successfully' });
  } catch (error) {
    console.error('Error approving ride:', error);
    res.status(500).json({ message: 'Error approving ride' });
  }
});

// Route to reject a ride
router.post('/rides/reject/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    await db.query('UPDATE drivedetails SET status = "rejected" WHERE id = ?', [rideId]);
    res.json({ message: 'Ride rejected successfully' });
  } catch (error) {
    console.error('Error rejecting ride:', error);
    res.status(500).json({ message: 'Error rejecting ride' });
  }
});

module.exports = router;
