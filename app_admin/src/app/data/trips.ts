const express = require('express');
const jwt = require('express-jwt');
const { tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip } = require('../controllers/tripsController');  // Import these from your controller
const router = express.Router();  // Make sure to initialize the router

// JWT authentication middleware
const auth = jwt({
  secret: process.env['JWT_SECRET']
  ,  // Ensure JWT_SECRET is in your .env file
    userProperty: 'payload',
    algorithms: ['HS256']  // Ensure this matches your JWT signing algorithm
});

// Define the routes for adding, updating, and deleting trips
router.post('/add', auth, tripsAddTrip);
router.put('/update/:id', auth, tripsUpdateTrip);
router.delete('/delete/:id', auth, tripsDeleteTrip);

module.exports = router;  // Export the router for use in other files
