const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    googleId: String,
    profilePicture: String
    // jobs: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Job'
    // }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);