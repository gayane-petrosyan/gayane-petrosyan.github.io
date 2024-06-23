// Importing required modules
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Registration function
const register = (req, res) => {
    // Check if all required fields are provided
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400) // Bad Request
            .json({"message": "All fields required"});
    }

    // Create a new user instance
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    // Set the hashed password
    user.setPassword(req.body.password);

    // Save the user to the database
    user.save((err) => {
        if (err) {
            // Send error response if there's an error
            res
                .status(400) // Bad Request
                .json(err);
        } else {
            // Generate JWT token upon successful registration
            const token = user.generateJwt();
            res
                .status(200) // OK
                .json({token}); // Return the token
        }
    });
};

// Login function
const login = (req, res) => {
    // Check if all required fields are provided
    if (!req.body.email || !req.body.password) {
        return res
            .status(400) // Bad Request
            .json({"message": "All fields required"});
    }

    // Authenticate user using passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Send error response if there's an error
            return res
                .status(404) // Not Found
                .json(err);
        }
        if (user) {
            // Generate JWT token upon successful login
            const token = user.generateJwt();
            res
                .status(200) // OK
                .json({token}); // Return the token
        } else {
            // Send unauthorized response if authentication fails
            res
                .status(401) // Unauthorized
                .json(info);
        }
    })(req, res);
};

// Exporting the register and login functions
module.exports = {
    register,
    login
};
