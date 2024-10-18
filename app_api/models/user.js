const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // Ensures no duplicate emails
    required: true // Email is required
  },
  name: {
    type: String,
    required: true // Name is required
  },
  hash: String,
  salt: String
});

// Method to set the password by generating a salt and hash
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // Hash the password
};

// Method to validate the password with a log for debugging
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  console.log('Validating password, generated hash:', hash);  // Log the generated hash for debugging
  console.log('Stored hash:', this.hash);  // Log the stored hash for comparison
  return this.hash === hash;  // Compare the generated hash with the stored hash
};

// Method to generate a JWT token for the user
userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // Set the token to expire in 7 days

  return jwt.sign({
    _id: this._id, // Include user ID in the token
    email: this.email, // Include user email in the token
    name: this.name, // Include user name in the token
    exp: parseInt(expiry.getTime() / 1000, 10) // Expiry time for the token
  }, 'MySuperSecretJWTKey');  // Hardcoded JWT key
};

// Export the model
mongoose.model('User', userSchema);
