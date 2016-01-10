'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    randomToken = require('rand-token');

const TOKEN_SIZE = 70;

function getRegisterView(req, res, next) {
    res.render('register');
}

function register(req, res, next) {
    // TODO validation
    // TODO do not keep passwords in db!

    let requestedUser = req.body,
        newUser = new User(requestedUser);

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

function login(req, res, next) {
    let user = req.body;

    User.findOne({ username: user.username }, function (err, data) {
        if (err) {
            next(err);
            return;
        }

        if (!user || user.password !== data.password) {
            next('Invalid username or password');
            return;
        }

        let token = randomToken.generate(TOKEN_SIZE);
        data.token = token;

        data.save(function (err) {
            if (err) {
                next(err);
            } else {
                res.status(200)
                    .json({
                        username: data.username,
                        token: token
                    });
            }
        });
    });
}

module.exports = {
    getRegisterView: getRegisterView,
    register: register,
    getLoginView: getLoginView,
    login: login,
    nonexistent: function () {
        console.log('called');
    }
};