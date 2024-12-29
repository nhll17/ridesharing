const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const rideRoutes = require('./rideRoutes');
const driverRoutes = require('./driverRoutes');
const availrides = require('./availrides');
const bookRoutes = require('./bookRoutes');  
const fetchapprove = require('./fetchapprove');  
const driverlogin = require('./driverlogin');
const riderlogin = require('./riderlogin');
const statusfetch = require('./statusfetch')
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes); // For registration and login routes
app.use('/api', rideRoutes); // For ride booking routes
app.use('/api', driverRoutes);
app.use('/api', availrides);
app.use('/api', bookRoutes);
app.use('/api',fetchapprove);
app.use('/api',driverlogin);
app.use('/api',riderlogin);
app.use('/api',statusfetch);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
