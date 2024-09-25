const Trip = require('../models/trips');

module.exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();  // Fetch trips from the database
    console.log("Trips fetched from the database: ", trips); // Add this line
    res.render('travel', { trips });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).send('Server Error');
  }
};
