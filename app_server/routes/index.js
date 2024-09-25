const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel'); // Make sure this exists

// Index route
router.get('/', function(req, res) {
  res.render('index');
});

// Travel route (this should handle your trips)
router.get('/travel', travelController.getTrips);

// Add the trips route
router.get('/trips', travelController.getTrips);  // Using the same travelController for trips

// Rooms route
router.get('/rooms', function(req, res) {
  res.render('rooms');
});

// Meals route
router.get('/meals', function(req, res) {
  res.render('meals');
});

// News route
router.get('/news', function(req, res) {
  res.render('news');
});

// About route
router.get('/about', function(req, res) {
  res.render('about');
});

// Contact route
router.get('/contact', function(req, res) {
  res.render('contact');
});

module.exports = router;
