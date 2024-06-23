const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Define trip schema
const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true}, // Unique code for the trip, indexed for faster queries
    name: {type: String, required: true, index: true}, // Name of the trip, indexed for faster queries
    length: {type: String, required: true}, // Duration of the trip
    start: {type: Date, required: true}, // Start date of the trip
    resort: {type: String, required: true}, // Resort associated with the trip
    perPerson: {type: String, required: true}, // Cost per person
    image: {type: String, required: true}, // Image URL for the trip
    description: {type: String, required: true} // Description of the trip
});

// Create and export the Trip model based on the schema
module.exports = mongoose.model("trips", tripSchema);
