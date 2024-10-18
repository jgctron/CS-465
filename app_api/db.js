const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';  // Default MongoDB host
const dbURI = `mongodb://${host}/travlr`;  // Database URI
const readLine = require('readline');

// Function to establish connection to MongoDB
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI)
    .then(() => console.log(`Mongoose connected to ${dbURI}`))
    .catch((err) => console.error('Mongoose connection error:', err)), 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// For Windows, handle SIGINT (interrupt signal) gracefully
if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  r1.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Handle graceful shutdown
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Event listeners for process termination signals
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make the initial connection to the database
connect();

// Import the Mongoose model (your model file should be created before this)
require('./models/travlr');

module.exports = mongoose;
