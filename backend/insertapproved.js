const express = require('express');
const router = express.Router();
const db = require('./db');

// Route to approve a ride
router.post('/rides/approve/:id', async (req, res) => {
  const { id: driveId } = req.params;
  const { driverId, riderId } = req.body; // Assume these details are provided by the frontend

  try {
    // Insert the approved ride with driver and rider details
    await db.query(
      `INSERT INTO approved_rides (drive_id, driver_id, rider_id) VALUES (?, ?, ?)`,
      [driveId, driverId, riderId]
    );

    // Update ride status in drivedetails to 'approved'
    await db.query('UPDATE drivedetails SET status = "approved" WHERE id = ?', [driveId]);

    res.status(200).json({ message: 'Ride approved successfully' });
  } catch (error) {
    console.error('Error approving ride:', error);
    res.status(500).json({ message: 'Error approving ride' });
  }
});

// Route to fetch all approved rides with rider and driver details
router.get('/rides/approved', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ar.id AS approval_id,
        d.start AS start_location,
        d.end AS end_location,
        d.date AS ride_date,
        d.seats AS available_seats,
        d.price AS rate,
        drivers.name AS driver_name,
        drivers.phone AS driver_phone,
        riders.name AS rider_name,
        riders.phone AS rider_phone
      FROM approved_rides ar
      JOIN drivedetails d ON ar.drive_id = d.id
      JOIN drivers ON ar.driver_id = drivers.id
      JOIN riders ON ar.rider_id = riders.id
      WHERE d.status = "approved"
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching approved rides:', error);
    res.status(500).json({ message: 'Error fetching approved rides' });
  }
});

module.exports = router;
