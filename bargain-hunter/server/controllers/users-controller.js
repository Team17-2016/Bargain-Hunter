'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encryption = require('./../utilities/encryption'),
    USERS_CONSTANTS = require('./../utilities/constants').USERS;

function getRegisterView(req, res, next) {
    res.render('register');
}

function register(req, res, next) {
    let requestedUser = req.body;

    if (!(checkIfValidUser(requestedUser))) {
        let error = {
            status: 400,
            message: 'Invalid user'
        };

        next(error);
        return;
    }

    let newUser = new User();
    newUser.username = requestedUser.username;
    newUser.email = requestedUser.email;

    newUser.salt = encryption.generateSalt();
    newUser.passwordHashed = encryption.generateHashedPassword(newUser.salt, req.body.password);

    newUser.save(function (err) {
        if (err) {
            err.status = 400;
            next(err);
            return;
        }

        res.redirect('login');
    });
}

function getLoginView(req, res, next) {
    res.render('login');
}

function getProfileView(req, res, next) {
    User.findOne({ username: req.user.username }, function (err, dbUser) {
        if (err) {
            next(err);
            return;
        }

        if (!dbUser) {
            err.status = 404;
            next(err);
            return;
        }

        let user = {
            username: dbUser.username,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            phone: dbUser.phone,
            email: dbUser.email,
            area: dbUser.area,
            rating: dbUser.rating
        };

        res.render('profile', {
            user: user,
            isAuthenticated: true
        });
    });
}

function getUser(req, res, next) {
    if (!req.query.name) {
        next({ status: 400 });
        return;
    }

    User.findOne({ username: req.query.name }, function (err, dbUser) {
        if (err) {
            next(err);
            return;
        }

        if (!dbUser) {
            res.status(200)
                .json({});
            return;
        }

        let foundUser = {
            username: dbUser.username
        };

        res.status(200)
            .json(foundUser);

    });
}

function checkIfValidUser(user) {
    if (!user) {
        return false;
    }

    if (!user.username || user.username.length < USERS_CONSTANTS.usernameMinLen
        || user.username.length > USERS_CONSTANTS.usernameMaxLen) {
        return false;
    }

    if (!user.password || !user.confirmPassword || user.password.length < USERS_CONSTANTS.passwordMinLen
        || user.password !== user.confirmPassword) {
        return false;
    }

    if (!user.email || !(checkIfValidEmail(user.email))) {
        return false;
    }

    return true;
}

function checkIfValidEmail(email) {
    if (email.length === 0) return false;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    getRegisterView: getRegisterView,
    register: register,
    getLoginView: getLoginView,
    getProfileView: getProfileView,
    getUser: getUser
};