'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User');

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

module.exports = {
    getRegisterView: getRegisterView,
    register: register,
    getLoginView: getLoginView,
    nonexistent: function () {
        console.log('called');
    }
};