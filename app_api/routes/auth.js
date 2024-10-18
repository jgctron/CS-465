const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/authentication');

// Authentication routes
router.post('/auth/register', ctrlAuth.register); // Ensure this matches your request
router.post('/auth/login', ctrlAuth.login); // Ensure this matches your request

module.exports = router;
