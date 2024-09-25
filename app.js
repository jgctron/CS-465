// Import necessary packages
const express = require('express');
const path = require('path');
const hbs = require('hbs');  // Handlebars view engine
const db = require('./app_server/db');  // MongoDB connection (make sure db.js is set up)
const Trip = require('./app_server/models/travlr'); // Import the Trip model

const app = express();

// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the routes/index.js file
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// Route to display all trips
app.get('/trips', (req, res, next) => {
    Trip.find({}, (err, trips) => {
        if (err) {
            return next(err);
        }
        res.render('trips', { trips });  // 'trips' is the Handlebars view
    });
});

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
