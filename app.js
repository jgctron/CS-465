// Import necessary packages
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const path = require('path');
const hbs = require('hbs');  // Handlebars view engine
const cors = require('cors');  // Import CORS package
const db = require('./app_server/db');  // MongoDB connection (make sure db.js is set up)
const Trip = require('./app_server/models/travlr'); // Import the Trip model

// Import Passport and the User model
const passport = require('passport');
require('./app_api/models/user');  // Ensure the User schema is registered
require('./app_api/config/passport');  // Passport configuration

const app = express();

// Use the CORS middleware
app.use(cors());  // This enables CORS for all routes
// app.use(cors({ origin: 'http://localhost:4200' }));  // Only allow requests from your Angular app

// Initialize Passport middleware
app.use(passport.initialize());

// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies (needed for POST/PUT requests)
app.use(express.json());  // Add this to handle JSON payloads

// Logging middleware to see the request URLs
app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
});

// Use the routes defined in the routes/index.js file
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// Route to display all trips (rendered through Handlebars)
app.get('/trips', (req, res, next) => {
    Trip.find({}, (err, trips) => {
        if (err) {
            return next(err);
        }
        res.render('trips', { trips });  // 'trips' is the Handlebars view
    });
});

// API route for trips (this is the new part)
const tripsApiRouter = require('./app_server/routes/tripsApi');  // Import the API routes for trips
app.use('/api', tripsApiRouter);  // All the routes will be under /api/trips (GET, POST, PUT, DELETE)

// Add authentication API routes
const apiRouter = require('./app_api/routes/index');  // Import your authentication API routes
app.use('/api', apiRouter);  // Apply authentication routes

// Middleware for error handling (optional)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// Start the server on port 3000
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;

