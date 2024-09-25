const mongoose = require('mongoose');
const Trip = require('./travlr');
const tripsData = require('../../data/trips.json');

mongoose.connect('mongodb://127.0.0.1/travlr', { useNewUrlParser: true, useUnifiedTopology: true });

const seedTrips = async () => {
  try {
    // Remove any existing records
    await Trip.deleteMany({});
    
    // Add the new records
    const trips = await Trip.insertMany(tripsData.trips);
    console.log(`${trips.length} trips added to the database.`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database: ', error);
    mongoose.connection.close();
  }
};

seedTrips();
