const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //a reference to a user document via user document object id
        ref: 'User' //model name User for the document (line 19)
    }
}, {
    timestamps: true
});

const jobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobLink: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    notes: [noteSchema] //every job document to be able to contain multiple comment docs stored within an array
}, {
    timestamps: true
});

//create a model under schema. this model named Job
// name should be Capital, single word (not s)
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;//export this model