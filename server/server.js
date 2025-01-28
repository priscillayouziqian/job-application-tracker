const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
//import routers
const jobRouter = require('./routes/jobRouter');

//connect to mongodb database
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/nucampsite';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected correctly to MongoDB server'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Define hostname and port
const hostname = '127.0.0.1';
const port = 3000;

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mount routers BEFORE the catch-all middleware
app.use('/jobs', jobRouter);

// Catch-all route for testing server connection
app.use('*', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log the error
  console.error(err);

  // Send error response
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
  
module.exports = app;