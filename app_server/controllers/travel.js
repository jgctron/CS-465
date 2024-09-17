const fs = require('fs');
const path = require('path');

// Controller function to read trip data from trips.json
module.exports.getTrips = (req, res) => {
  const tripsFilePath = path.join(__dirname, '../../data/trips.json');
  
  // Read the trips.json file
  fs.readFile(tripsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading trips.json:', err);
      return res.status(500).send('Server Error');
    }
    
    const tripsData = JSON.parse(data);  // Parse JSON data from file
    res.render('travel', { trips: tripsData.trips });  // Render the view with trips data
  });
};
