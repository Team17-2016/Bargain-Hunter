'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encryption = require('./../utilities/encryption'),
    USERS_CONSTANTS = require('./../utilities/constants').USERS;

function getAdminUsersView(req, res, next) {
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
        wantedSort = orderType === 'desc' ? '-' + orderBy : orderBy,
        page = req.query.page || 1,
        pageSize = req.query.pageSize || 10;

    pageSize *= 1;
    page *= 1;

    User.find()
        .select('_id username email isAdmin')
        .sort(wantedSort)
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .exec(function (err, data) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(data);
            res.send(data);
            res.end();
    });
}

function getAdminUserEditView(req, res, next) {
    let wantedId = req.params.id;

    User.findById(wantedId, function (err, dbUser) {
        if (err) {
            next(err);
            return;
        }

        res.render('user-edit', {
            isAuthenticated: req.user,
            isAuthorized: true,
            user: dbUser
        });
    });
}

function promote(req, res, next) {
    let wantedId = req.params.id;

    User.update({ _id: wantedId }, { isAdmin: true }, function (err, dbUser) {
        if (err) {
            next(err);
            return;
        }

        res.end();
    })
}

function deleteUser(req, res, next) {
    let wantedId = req.params.id;

    User.findByIdAndRemove(wantedId, function (err) {
        if (err) {
            next(err);
            return;
        }

        res.end();
    });
}

module.exports = {
    getAdminUsersView: getAdminUsersView,
    getAllUsers: getAllUsers,
    getAdminUserEditView: getAdminUserEditView,
    promote: promote,
    deleteUser: deleteUser
};