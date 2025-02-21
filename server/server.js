require('dotenv').config();
const express = require('express');
const logger = require('morgan');
// const createError = require('http-errors');
const path = require('path');
const passport = require('passport');
const config = require('./config');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
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
app.use(cors());

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

// Read certificate files
const options = {
  key: fs.readFileSync('./bin/key.pem'),   
  cert: fs.readFileSync('./bin/cert.pem')   
};

const secureServer = https.createServer(options, app);

// Start HTTPS server
const securePort = process.env.SECURE_PORT || 3443;
secureServer.listen(securePort, () => {
    console.log(`Secure server listening on port ${securePort}`);
});

// Redirect HTTP to HTTPS
app.all('*', (req, res, next) => {
  if (req.secure) {
      return next();
  } else {
      res.redirect(301, `https://${req.hostname}:${securePort}${req.url}`);
  }
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;