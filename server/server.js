require('dotenv').config();
const express = require('express');
const logger = require('morgan');
// const createError = require('http-errors');
const path = require('path');
const passport = require('passport');
const config = require('./config');
//import routers
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/users');
// Error handling
const { errorHandler, notFoundHandler } = require('./errorHandler');

//connect to mongodb database
const mongoose = require('mongoose');
const url = config.mongoUrl; 
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected correctly to MongoDB server'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();

// // Define hostname and port
// const hostname = '127.0.0.1';
// const port = 3000;

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());

// Mount routers BEFORE the catch-all middleware
app.use('/users', userRouter);
app.use('/jobs', jobRouter);

// Simple home route
app.get('/', (req, res) => {
  res.json({ message: 'Job Tracker API' });
});

// Error handlers (come after routes)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
  
module.exports = app;