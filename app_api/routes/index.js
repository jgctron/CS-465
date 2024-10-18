const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/authentication');
const ctrlTrips = require('../controllers/trips'); 
const { expressjwt } = require('express-jwt');  // Update the import here

// JWT authentication middleware
const auth = expressjwt({
  secret: process.env.JWT_SECRET,  // Your secret from the environment
  algorithms: ['HS256'], // Algorithm to verify the token
  userProperty: 'payload' // This will store the token data in `req.payload`
});

// Authentication routes
router.post('/auth/register', ctrlAuth.register);
router.post('/auth/login', ctrlAuth.login);

// Protect the trip routes
router.post('/trips', auth, ctrlTrips.tripsAddTrip);   // Add trip
router.put('/trips/:id', auth, ctrlTrips.tripsUpdateTrip);  // Edit trip
router.delete('/trips/:id', auth, ctrlTrips.tripsDeleteTrip);  // Delete trip

module.exports = router;
