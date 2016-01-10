'use strict';

let passport = require('passport');

function login(req, res, next) {
    let auth = passport.authenticate('local', function(err, user) {
        if (err){
            return next(err);
        }

        if (!user) {
            // TODO redirect to login but add there message to the user
            let error = {
                status: 400,
                message: 'Invalid username or password.'
            };

            next(error);
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err)
            }

            res.redirect('../home');
        })
    });

    auth(req, res, next);
}

function logout(req, res, next) {
    req.logout();
    res.redirect('../home');
}

function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    }
    else {
        next();
    }
}

module.exports = {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated
};