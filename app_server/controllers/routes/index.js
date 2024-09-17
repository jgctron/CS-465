const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

// Index route
router.get('/', function(req, res) {
  res.render('index');
});

// Travel route
router.get('/travel', travelController.getTrips);

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
