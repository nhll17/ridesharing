const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Route to get all approved rides
router.get('/rides/approved', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM drivedetails WHERE status = "approved"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching approved rides:', error.message);
    res.status(500).json({ message: 'Error fetching approved rides' });
  }
});

// Route to mark a ride as completed and insert it into completed_bookings
router.post('/rides/complete/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    // Fetch the ride details
    const [rideDetails] = await db.query('SELECT * FROM drivedetails WHERE id = ?', [rideId]);

    if (!rideDetails.length) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const ride = rideDetails[0];
    const { id: drive_id, driver_id, rider_id, start, end, date, seats, price } = ride;

    // Insert into completed_bookings
    await db.query(
      `INSERT INTO completed_bookings (drive_id, start_location, end_location, date, seats, price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [drive_id, start, end, date, seats, price]
    );

    // Update the ride status to 'completed' in `drivedetails`
    await db.query('UPDATE drivedetails SET status = "completed" WHERE id = ?', [rideId]);

    res.status(200).json({ message: 'Ride marked as completed and added to completed bookings successfully' });
  } catch (error) {
    console.error('Error marking ride as completed and adding to completed bookings:', error.message);
    res.status(500).json({ message: 'Error marking ride as completed and adding to completed bookings' });
  }
});

module.exports = router;
