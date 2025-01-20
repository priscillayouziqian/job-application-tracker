const express = require('express');
const jobRouter = express.Router(); //create a express router

//single statement that handles all routings
jobRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}) // no ; here, because ; stands for end of statement
.get((req, res) => {
    res.end('Will send all the jobs to you');
})
.post((req, res) => {
    res.end(`Will add the job: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /jobs');
})
.delete((req, res) => {
    res.end('Deleting all jobs');
});

jobRouter.route('/:jobId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`will send details of the job with id: ${req.params.jobId}`)
})
.post((req, res) => {
    res.statusCode = 403,
    res.end('POST not supported!')
})
.put((req, res) => {
    res.end(`will update details of the job id: ${req.params.jobId}`)
})
.delete((req, res) => {
    res.end(`deleting job id: ${req.params.jobId}`);
});

module.exports = jobRouter;
