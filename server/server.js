const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
//import routers
const jobRouter = require('./routes/jobRouter');
const noteRouter = require('./routes/noteRouter');

//connect to mongodb database
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/nucampsite';
const connect = mongoose.connect(url, {});
connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mount routers BEFORE the catch-all middleware
app.use('/jobs', jobRouter);
app.use('/notes', noteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
// Move catch-all middleware to the end
// This will only run if no other routes match
// app.use('*', (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>This is an Express Server</h1></body></html>');
// });

// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;