const request = require('request'); // Import request module for making HTTP calls
const apiOptions = {
    server: 'http://localhost:3000' // Base URL for the API server
}

// Function to render the travel list view
const renderTravelList = (req, res, responseBody) => {
    let message = null; // Message to display in case of errors or empty response
    let pageTitle = process.env.npm_package_description + ' - Travel'; // Page title using package description

    // Check if responseBody is an array
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error'; // Set error message if not an array
        responseBody = []; // Initialize as empty array
    } else {
        if (!responseBody.length) {
            message = "No trips exist in database!"; // Set message if no trips found
        }
    }

    // Render the 'travel' view with the title, trips, and message
    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });
};

// Function to get travel list from API
const travelList = (req, res) => {
    const path = '/api/trips'; // API endpoint path
    const requestOptions = {
        url: `${apiOptions.server}${path}`, // Full URL to the API endpoint
        method: 'GET', // HTTP method
        json: {}, // Request body as JSON
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url); // Log the API call

    // Make the API request
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if (err) {
                console.error(err); // Log errors
            }
            renderTravelList(req, res, body); // Render the travel list view with the response body
        }
    );
};

module.exports = {
    travelList // Export the travelList function
}
