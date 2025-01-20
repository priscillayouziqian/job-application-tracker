const express = require('express');
const noteRouter = express.Router(); //create a express router

//single statement that handles all routings
noteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}) // no ; here, because ; stands for end of statement
.get((req, res) => {
    res.end('Will send all the notes to you');
})
.post((req, res) => {
    res.end(`Will add the note: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notes');
})
.delete((req, res) => {
    res.end('Deleting all notes');
});

noteRouter.route('/:noteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`will send details of the note with id: ${req.params.noteId}`)
})
.post((req, res) => {
    res.statusCode = 403,
    res.end('POST not supported!')
})
.put((req, res) => {
    res.end(`will update details of the note id: ${req.params.noteId}`)
})
.delete((req, res) => {
    res.end(`deleting note id: ${req.params.noteId}`);
});

module.exports = noteRouter;
