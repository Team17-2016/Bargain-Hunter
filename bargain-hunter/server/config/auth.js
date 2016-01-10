'use strict';

let passport = require('passport');

function login(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.send({success: false})
        }

        req.logIn(user, function(err) {
            if (err) return next(err);
            res.send({success: true, user: user});
        })
    });

    auth(req, res, next);
}

function logout(req, res, next) {
    req.logout();
    res.end();
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