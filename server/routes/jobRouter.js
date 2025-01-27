const express = require('express');
const Job = require('../models/job');
const jobRouter = express.Router(); //create a express router

//single statement that handles all routings
jobRouter.route('/')
.get((req, res, next) => {
    Job.find()
    .then(jobs => res.status(200).json(jobs))
    .catch(err => next(err))
})
.post((req, res, next) => {
    Job.create(req.body)
    .then(job => res.status(201).json(job))
    .catch(err => next(err))
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /jobs');
})
.delete((req, res, next) => {
    Job.deleteMany()
    .then(jobs => res.status(200).json(jobs))
    .catch(err => next(err))
});

jobRouter.route('/:jobId')
.get((req, res, next) => {
    Job.findById(req.params.jobId)
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
})
.post((req, res) => {
    res.statusCode = 403,
    res.end(`POST not supported on /jobs/${req.params.jobId}`)
})
.put((req, res, next) => {
    Job.findByIdAndUpdate(req.params.jobId, {
        $set: req.body
    }, {
        new: true
    })
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
})
.delete((req, res, next) => {
    Job.findByIdAndDelete(req.params.jobId)
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
});

module.exports = jobRouter;
