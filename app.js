var express = require('express');
var path = require('path');
var hbs = require('hbs');  // Handlebars view engine

var app = express();

// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the routes/index.js file
var indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// Start the server on port 3000
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;
