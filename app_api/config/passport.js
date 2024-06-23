// Importing required modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Configuring the local authentication strategy
passport.use(new LocalStrategy({
    usernameField: 'email' // Setting the field for username as 'email'
    },
    (username, password, done) => {
        // Finding the user by email
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                // If there is an error, pass it to the done callback
                return done(err);
            }
            if (!user) {
                // If the user is not found, return false with an appropriate message
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                // If the password is incorrect, return false with an appropriate message
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            // If the user is found and password is correct, return the user object
            return done(null, user);
        });
    }
));
