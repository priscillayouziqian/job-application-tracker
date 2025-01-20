const express = require('express');
const morgan = require('morgan');
//import routers
const jobRouter = require('./routes/jobRouter');
const noteRouter = require('./routes/noteRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Mount routers BEFORE the catch-all middleware
app.use('/jobs', jobRouter);
app.use('/notes', noteRouter);

// Move catch-all middleware to the end
// This will only run if no other routes match
app.use('*', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
