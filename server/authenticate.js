//implement passport local strategy
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const Job = require('./models/job.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    // .sign(object, string, 3600s is one hour to expire)
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy( // new JwtStrategy( options, verify) from https://www.npmjs.com/package/passport-jwt
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);

            User.findOne({ _id: jwt_payload._id })
            .then((user) => {
              if (user) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            }).catch((err) => done(err, false));
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', {session: false});

//set up verifyAdmin middleware
exports.verifyAdmin = (req, res, next) => {
    //check if admin previleges
    if(req.user.admin){
        return next() //go to next middleware
    }else{
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
}

exports.verifyJobOwner = (req, res, next) => {
    Job.findById(req.params.jobId)
    .populate('notes.author') // Only expose necessary fields
    .then(job => {
        if (!job) return next(createError(404, 'Job not found'));
        if (!job.user.equals(req.user._id)) {
            return next(createError(403, 'Not the job owner'));
        }
        req.job = job; // Attach job to request for later use
        next();
    })
    .catch(err => next(err));
};