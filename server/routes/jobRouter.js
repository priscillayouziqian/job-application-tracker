const express = require('express');
const Job = require('../models/job');
const authenticate = require('../authenticate');

const jobRouter = express.Router(); //create a express router

//single statement that handles all routings
jobRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Job.find()
    .populate('notes.author')
    .then(jobs => res.status(200).json(jobs))
    .catch(err => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Job.create(req.body)
    .then(job => res.status(201).json(job))
    .catch(err => next(err))
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /jobs');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Job.deleteMany()
    .then(jobs => res.status(200).json(jobs))
    .catch(err => next(err))
});

jobRouter.route('/:jobId')
.get((req, res, next) => {
    Job.findById(req.params.jobId)
    .populate('notes.author')
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403,
    res.end(`POST not supported on /jobs/${req.params.jobId}`)
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Job.findByIdAndUpdate(req.params.jobId, {
        $set: req.body
    }, {
        new: true
    })
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Job.findByIdAndDelete(req.params.jobId)
    .then(job => res.status(200).json(job))
    .catch(err => next(err))
});

jobRouter.route('/:jobId/notes')
.get((req, res, next) => {
    Job.findById(req.params.jobId)
    .populate('notes.author')
    .then(job => {
        if(job){
            res.status(200).json(job.notes)
        }else{
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req, res, next) => {
    Job.findById(req.params.jobId)
    .then(job => {
        if(job){
            req.body.author = req.user._id; //add a new note to save current user's _id to author field in post request
            job.notes.push(req.body);
            job.save()
            .then(job => res.status(200).json(job))
            .catch(err => next(err))
        }else{
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /jobs/${req.params.jobId}/notes`);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Job.findById(req.params.jobId)
    .then(job => {
        if(job){
            for (let i = (job.notes.length-1); i >= 0; i--) {
                job.notes.id(job.notes[i]._id).deleteOne();
            }
            job.save()
            .then(job => res.status(200).json(job))
            .catch(err => next(err))
        }else{
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
});

jobRouter.route('/:jobId/notes/:noteId')
.get((req, res, next) => {
    Job.findById(req.params.jobId)
    .populate('notes.author')
    .then(job => {
        if(job && job.notes.id(req.params.noteId)){
            res.status(200).json(job.notes.id(req.params.noteId))
        }else if(!job){
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Note ${req.params.noteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /jobs/${req.params.jobId}/notes/${req.params.noteId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Job.findById(req.params.jobId)
    .then(job => {
        if(job && job.notes.id(req.params.noteId)){
            if((job.notes.id(req.params.noteId).author._id).equals(req.user._id)){
                if(req.body.note){
                    job.notes.id(req.params.noteId).note = req.body.note;
                }
                job.save()
                .then(job => res.status(200).json(job))
                .catch(err => next(err))
            }else{
                err = new Error('You are not authorized to update this comment')
                err.status = 403;
                return next(err)
            }
        }else if(!job){
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Note ${req.params.noteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Job.findById(req.params.jobId)
    .then(job => {
        if(job && job.notes.id(req.params.noteId)){
            if((job.notes.id(req.params.noteId).author._id).equals(req.user._id)){
                job.notes.id(req.params.noteId).deleteOne();
                job.save()
                .then(job => res.status(200).json(job))
                .catch(err => next(err))
            }else{
                err = new Error('You are not authorized to delete this comment')
                err.status = 403;
                return next(err)
            }     
        }else if(!job){
            err = new Error(`Job ${req.params.jobId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Note ${req.params.noteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
});

module.exports = jobRouter;
