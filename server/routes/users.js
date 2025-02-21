const express = require('express');
const cors = require('./cors');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

const userRouter = express.Router();

// Single statement that handles all routings
userRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) // Pre-flight request for CORS
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        } else {
            if (req.body.firstname) user.firstname = req.body.firstname;
            if (req.body.lastname) user.lastname = req.body.lastname;
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ err: err });
                    return;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            });
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.deleteMany({})
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

userRouter.get('/logout', (req, res, next) => {
    if (req.session) { //if session exist
        req.session.destroy();
        res.clearCookie('session-id'); //express method that stored on the client, we saw with postman
        res.redirect('/'); //go back to localhost:3000/
    } else { //user ask to log out, but actually user is not logged in yet
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});

userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {
    if (req.user) {
        const token = authenticate.getToken({_id: req.user._id});
        res.redirect(`http://localhost:3001?token=${token}`); // Redirect to frontend with token
    }
});

userRouter.get('/profile', authenticate.verifyUser, (req, res) => {
    console.log('User profile data:', {
        username: req.user.username,
        profilePicture: req.user.profilePicture
    }); // Debugging line
    res.json({
        username: req.user.username,
        profilePicture: req.user.profilePicture
    });
});

module.exports = userRouter;
