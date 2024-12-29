const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db'); // Import the database connection
const router = express.Router();

// Driver Registration with Vehicle Details
router.post('/driver/register', async (req, res) => {
  const { name, email, password, phone, vehicleType, licensePlate } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert driver details into the driver table
    const driverSql = 'INSERT INTO driver (name, email, password, vehicle_type, license_plate, phone_no) VALUES (?, ?, ?, ?, ?, ?)';
    const driverParams = [name, email, hashedPassword, vehicleType, licensePlate, phone];
    
    db.query(driverSql, driverParams, (driverErr, driverResult) => {
      if (driverErr) return res.status(500).json({ error: driverErr.message });

      // Insert vehicle details into the vehicles table with driverName
      const vehicleSql = 'INSERT INTO vehicles (driver_name, vehicle_type, license_plate) VALUES (?, ?, ?)';
      const vehicleParams = [name, vehicleType, licensePlate];
      
      db.query(vehicleSql, vehicleParams, (vehicleErr) => {
        if (vehicleErr) return res.status(500).json({ error: 'Failed to add vehicle information' });

        res.status(201).json({ message: 'Driver and vehicle registered successfully!', redirect: '/login' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Rider Registration
router.post('/rider/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO rider (name, email, password, phone_no) VALUES (?, ?, ?, ?)';
    const params = [name, email, hashedPassword, phone];
    
    db.query(sql, params, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Rider registered successfully!', redirect: '/login' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;

















