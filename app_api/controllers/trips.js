// Importing required modules
const { model } = require("mongoose");
const mongoose = require("mongoose");
const Trip = mongoose.model("trips");
const User = mongoose.model('users');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Function to get a user by their email from the request
const getUser = (req, res, callback) => {
    console.log('in #getUser');
    
    // Check if the auth object and email are present in the request
    if (req.auth && req.auth.email) {
        User
            .findOne({ email: req.auth.email }) // Find user by email
            .exec((err, user) => {
                if (!user) { 
                    // If user is not found, return 404 status
                    return res  
                        .status(404)
                        .json({"message": "Email not found"});
                } else if (err) {
                    // If there's an error, return 404 status with the error
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                // If user is found, call the callback function
                callback(req, 
                    res.json({"message": "User found"}), 
                    console.log('callback'),
                    console.log(req.auth)
                );
            });
    } else {
        // If email is not present in the request, return 404 status
        return res
            .status(404)
            .json({"message": "User was not found"});
        console.log(req.payload);
    }
};

// Function to get all trips
const getAllTrips = async (req, res) => {
    Trip
        .find({}) // Find all trips
        .exec((err, trips) => {
            if (!trips) {
                // If no trips are found, return 404 status
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                // If there's an error, return 404 status with the error
                return res
                    .status(404)
                    .json(err);
            } else {
                // If trips are found, return 200 status with the trips
                return res 
                    .status(200)
                    .json(trips);
            }
        });
};

// Function to get a trip by its code
const getTripByCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode }) // Find trip by code
        .exec((err, trip) => {
            if (!trip) {
                // If trip is not found, return 404 status
                return res  
                    .status(404)
                    .json({"message": "That trip was not found"});
            } else if (err) {
                // If there's an error, return 404 status with the error
                return res  
                    .status(404)
                    .json(err);
            } else {
                // If trip is found, return 200 status with the trip
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// Function to add a new trip
const tripsAddTrip = async (req, res) => {
    // Get the user first
    getUser(req, res, 
        (req, res) => {
            // Create a new trip
            Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            (err, trip) => {
                if (err) {
                    // If there's an error, return 400 status with the error
                    return res
                        .status(400) // bad request, invalid content
                        .json(err);
                } else {
                    // Return the created trip
                    return res
                        .status(201) // Created
                        .json(trip);
                }
            });
        }
    );
};

// Function to delete a trip by its code
const tripsDeleteTrip = async (req, res) => {
    // Get the user first
    getUser(req, res,
        (req, res) => {
            console.log("inside trips.js on server #tripsDeleteTrip");
            // Find and delete the trip by its code
            Trip.findOneAndDelete({ 'code': req.params.tripCode })
            .then(trip => {
                if (!trip) {
                    // If trip is not found, return 404 status
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                // Return the deleted trip
                return res
                    .status(204) // No Content
                    .json(trip);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    // If there's an ObjectId error, return 404 status
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                // If there's a server error, return 500 status
                return res
                    .status(500) // server error
                    .json(err);
            })
            console.log("return from delete trip");
        }
    );
};

// Function to update a trip by its code
const tripsUpdateTrip = async (req, res) => {
    // Get the user first
    getUser(req, res,
        (req, res) => {
            // Find and update the trip by its code
            Trip  
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        // If trip is not found, return 404 status
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    // Return the updated trip
                    return res
                        .status(200) // OK
                        .json(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        // If there's an ObjectId error, return 404 status
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    // If there's a server error, return 500 status
                    return res
                        .status(500) // server error
                        .json(err);
                })
                console.log("completed updateTrip");
        }
    );
};

// Function to find a trip by its code
const tripsFindCode = async (req, res) => {
    Trip.find({ code: req.params.tripCode }).exec((err, trip) => {
        if (!trip) {
            // If trip is not found, return 404 status
            return res.status(404).json({ message: "trip not found" });
        } else if (err) {
            // If there's an error, return 404 status with the error
            return res.status(404).json(err);
        } else {
            // If trip is found, return 200 status with the trip
            return res.status(200).json(trip);
        }
    });
};

// Exporting the functions
module.exports = {
    getAllTrips,
    getTripByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    tripsFindCode,
    getUser
};
