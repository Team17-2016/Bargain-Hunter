'use strict';

let passport = require('passport'),
    Strategy = require('passport-http-bearer').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.

module.exports = passport.use(new Strategy(function (token, cb) {
    console.log(`---------token------${token}`);
    User.findOne({ token: token }, function (err, user) {
        if (err) {
            return cb(err);
        }

        if (!user) {
            return cb(null, false);
        }

        return cb(null, user);
    })
}));