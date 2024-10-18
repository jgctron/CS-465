const mongoose = require('mongoose');

// Check if the model is already compiled to avoid OverwriteModelError
const Trip = mongoose.models.Trip || mongoose.model('Trip', new mongoose.Schema({
  name: { type: String, required: true },
  resort: { type: String, required: true },
  length: { type: Number, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
}));

module.exports = Trip;
