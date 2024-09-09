const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars'); // Import the engine from express-handlebars
const app = express();

// Set Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs' })); // Using the `engine` method for v8
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const travelRoutes = require('./app_server/routes/travel');

// Serve the routes
app.use('/', travelRoutes);

// Serve the HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
