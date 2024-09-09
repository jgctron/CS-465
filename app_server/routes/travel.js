const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

router.get('/travel', travelController.getTravelPage);

module.exports = router;
