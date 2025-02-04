const express = require('express');
const Job = require('../models/job');
const createError = require('http-errors');
const authenticate = require('../authenticate');

const jobRouter = express.Router(); //create a express router

//single statement that handles all routings
jobRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Job.find({ user: req.user._id }) // Automatically filters by owner
    .populate('notes.author')
    .then(jobs => res.status(200).json(jobs))
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req, res, next) => {
    // Auto-attach owner during creation
    req.body.user = req.user._id;
    Job.create(req.body)
    .then(job => res.status(201).json(job))
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /jobs');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Job.deleteMany({ user: req.user._id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

jobRouter.route('/:jobId')
.all(authenticate.verifyUser, authenticate.verifyJobOwner) // Applies to ALL methods
.get((req, res) => {
    res.json(req.job); // Already populated from middleware
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403,
    res.end(`POST not supported on /jobs/${req.params.jobId}`)
})
.put((req, res, next) => {
    Object.assign(req.job, req.body)
    req.job.save() // Use existing job from middleware
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
})
.delete((req, res, next) => {
    req.job.deleteOne() // Use existing job from middleware
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

jobRouter.route('/:jobId/notes')
.get(authenticate.verifyUser, authenticate.verifyJobOwner,(req, res) => {
    res.json(req.job.notes) // Use job from verifyJobOwner middleware
})
.post(authenticate.verifyUser, authenticate.verifyJobOwner, (req, res, next) => {
    const newNote = {
        note: req.body.note,
        author: req.user._id // Track who created the note
    };
    
    req.job.notes.push(newNote);
    req.job.save()
    .then(job => res.status(201).json(job.notes.slice(-1)[0]))
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyJobOwner, (req, res, next) => {
    req.job.notes = []; // Simplified clear operation
    req.job.save()
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
});

jobRouter.route('/:jobId/notes/:noteId')
.all(authenticate.verifyUser, authenticate.verifyJobOwner)
.get((req, res, next) => { 
    const note = req.job.notes.id(req.params.noteId);
    note ? res.json(note) : next(createError(404, 'Note not found'));
})
.put((req, res, next) => {
    const note = req.job.notes.id(req.params.noteId);
    if (!note) return next(createError(404, 'Note not found'));
    
    note.note = req.body.note;
    req.job.save()
    .then(() => res.json(note))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    req.job.notes.pull(req.params.noteId);
    req.job.save()
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = jobRouter;
