const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Define the local strategy for Passport
passport.use(new LocalStrategy({
  usernameField: 'email'  // Using email instead of username for authentication
},
(username, password, done) => {
  // Find the user by email
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));
