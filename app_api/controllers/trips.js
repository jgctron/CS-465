// Import the trip model (adjust the path according to your model structure)
const Trip = require('../models/trip');

// Controller to handle adding a trip
const tripsAddTrip = (req, res) => {
  // Example logic to add a trip
  const newTrip = new Trip({
    name: req.body.name,
    resort: req.body.resort,
    length: req.body.length,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  newTrip.save((err, trip) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(201).json(trip);  // Return the newly added trip
  });
};

// Controller to handle updating a trip
const tripsUpdateTrip = (req, res) => {
  // Example logic to update a trip based on ID
  Trip.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, trip) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);  // Return the updated trip
  });
};

// Controller to handle deleting a trip
const tripsDeleteTrip = (req, res) => {
  // Example logic to delete a trip based on ID
  Trip.findByIdAndRemove(req.params.id, (err, trip) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(204).json(null);  // No content to return after deletion
  });
};

module.exports = {
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
