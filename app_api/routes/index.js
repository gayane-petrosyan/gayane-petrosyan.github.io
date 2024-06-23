// Importing required modules
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

// Configuring JWT authentication middleware
const auth = jwt({
    secret: process.env.JWT_SECRET, // Secret key for JWT
    userProperty: 'payload', // Property to attach the payload to the request
    algorithms: ["HS256"], // Algorithm used for signing the token
});

// Importing controllers
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Defining routes

// Route for user login
router
    .route('/login')
    .post(authController.login);

// Route for user registration
router
    .route('/register')
    .post(authController.register);

// Route to get user information
router
    .route('/user')
    .get(tripsController.getUser);

// Routes for trips
router
    .route('/trips')
    .get(tripsController.getAllTrips) // Get all trips
    .post(auth, tripsController.tripsAddTrip); // Add a new trip (requires authentication)

// Routes for a specific trip identified by tripCode
router
    .route('/trip/:tripCode')
    .get(tripsController.getTripByCode) // Get a trip by its code
    .put(auth, tripsController.tripsUpdateTrip) // Update a trip by its code (requires authentication)
    .delete(auth, tripsController.tripsDeleteTrip); // Delete a trip by its code (requires authentication)

// Route to find a trip by its code
router.route("/trips/:tripCode").get(tripsController.tripsFindCode);

// Exporting the router
module.exports = router;
