const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User'); // Ensure User model is defined

// Registration logic using async/await
const register = async (req, res) => {
  // Ensure all required fields are provided
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password); // Assuming setPassword hashes the password

    // Save the user using async/await
    await user.save();

    // Generate JWT token after successful save
    const token = user.generateJwt(); // Assuming generateJwt returns a valid token
    res.status(201).json({ "token": token }); // Return token with 201 Created status

  } catch (err) {
    res.status(400).json(err); // Return error if something goes wrong
  }
};

// Login logic
const login = async (req, res) => {
  // Ensure email and password are provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    
    // Check if user exists and if password is valid
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the user is found and the password is correct, generate a JWT
    const token = user.generateJwt(); // Assuming generateJwt returns a valid token
    res.status(200).json({ "token": token }); // Return token with 200 OK status
  } catch (err) {
    // Handle any potential errors
    res.status(500).json(err);
  }
};

module.exports = { register, login }; // Ensure both functions are exported
