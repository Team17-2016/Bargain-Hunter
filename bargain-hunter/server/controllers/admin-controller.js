'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encryption = require('./../utilities/encryption'),
    USERS_CONSTANTS = require('./../utilities/constants').USERS;

function getAdminUsersView(req, res, next) {
    console.log(`---query---${req.query.orderBy}`);
    console.log(`---query---${req.query.orderType}`);
    User.find({}, function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.render('admin-users', {
            isAuthenticated: req.user,
            isAuthorized: true,
            users: data
        });
    });
}

function getAllUsers(req, res, next) {
    let orderBy = req.query.orderBy || 'username',
        orderType = req.query.orderType || 'asc',
        wantedSort = orderType === 'desc' ? '-' + orderBy : orderBy;

    User.find().sort(wantedSort).exec(function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(data);
        res.send(data);
        res.end();
    });
}

module.exports = {
    getAdminUsersView: getAdminUsersView,
    getAllUsers: getAllUsers
};