const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
const crypto = require('crypto'); // Import crypto for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating JWTs

// Define user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true // Email is required and must be unique
    },
    name: {
        type: String,
        required: true // Name is required
    },
    hash: String, // Store the hashed password
    salt: String // Store the salt used for hashing the password
});

// Method to set the password
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // Hash the password with the salt
};

// Method to validate the password
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // Hash the input password with the stored salt
    return this.hash === hash; // Compare the hashed passwords
};

// Method to generate a JWT
userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Set expiry date to 7 days from now
    return jwt.sign({
       _id: this._id, // Include user ID in the token
       email: this.email, // Include email in the token
       name: this.name, // Include name in the token
       exp: parseInt(expiry.getTime() / 1000, 10), // Set the expiry time for the token
    }, process.env.JWT_SECRET); // Sign the token with the secret (do not store the secret in the code)
};

// Create and export the User model based on the schema
module.exports = mongoose.model('users', userSchema);
