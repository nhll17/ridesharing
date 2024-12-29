const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Route to get rides with status 'booked' (requested rides)
router.get('/rides/requested', async (req, res) => {
  try {
    // Query to fetch all rides with status = 'booked'
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "booked"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching ride requests:', error.message);
    res.status(500).json({ message: 'Error fetching ride requests' });
  }
});

// Route to approve a ride (change status to 'approved')
router.post('/rides/approve/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Update the ride status to 'approved'
    await db.query('UPDATE drivedetails SET status = "approved" WHERE id = ?', [rideId]);
    res.json({ message: 'Ride approved successfully' });
  } catch (error) {
    console.error('Error approving ride:', error.message);
    res.status(500).json({ message: 'Error approving ride' });
  }
});

// Route to reject a ride (change status to 'rejected')
router.post('/rides/reject/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Update the ride status to 'rejected'
    await db.query('UPDATE drivedetails SET status = "rejected" WHERE id = ?', [rideId]);
    res.json({ message: 'Ride rejected successfully' });
  } catch (error) {
    console.error('Error rejecting ride:', error.message);
    res.status(500).json({ message: 'Error rejecting ride' });
  }
});

module.exports = router;