require('dotenv').config(); // Load environment variables from .env file

var createError = require('http-errors'); // For handling HTTP errors
var express = require('express'); // Express framework for building web applications
var path = require('path'); // Utility for handling and transforming file paths
var cookieParser = require('cookie-parser'); // Middleware to parse cookies
var logger = require('morgan'); // HTTP request logger middleware
const hbs = require('hbs'); // Handlebars view engine for Express
const passport = require('passport'); // Authentication middleware
var users = require('./app_server/database/models/user'); // User model

require('./app_server/database/db'); // Database connection

require('./app_api/config/passport'); // Passport configuration

// Import route modules
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var aboutRouter = require('./app_server/routes/about');
var roomsRouter = require('./app_server/routes/rooms');
var contactRouter = require('./app_server/routes/contact');
var mealsRouter = require('./app_server/routes/meals');
var newsRouter = require('./app_server/routes/news');
var apiRouter = require('./app_api/routes/index');

var app = express(); // Initialize Express app

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views')); // Set views directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials')); // Register handlebars partials
app.set('view engine', 'hbs'); // Set view engine to Handlebars

// Middleware setup
app.use(logger('dev')); // Use morgan to log requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(passport.initialize()); // Initialize Passport for authentication

// Allow CORS for API requests
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter);
app.use('/rooms', roomsRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch unauthorized errors and create 401 response
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"message": err.name + ": " + err.message});
  }
});

// General error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // Export the app module
