'use strict';

let mongoose = require('mongoose'),
    encryption = require('./../utilities/encryption'),
    USERS_CONSTANTS = require('./../utilities/constants').USERS;

// TODO length does not work
let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index : {
            unique: true
        },
        minlength: USERS_CONSTANTS.usernameMinLen,
        maxlength: USERS_CONSTANTS.usernameMaxLen
    },
    passwordHashed: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    votesCount: {
        type: Number,
        default: 0
    },
    votesSum: {
        type: Number,
        default: 0
    },
    area: {
        type: String
    },
    firstName: {
        type: String,
        minlength: USERS_CONSTANTS.realNameMinLen,
        maxlength: USERS_CONSTANTS.realNameMaxLen
    },
    lastName: {
        type: String,
        minlength: USERS_CONSTANTS.realNameMinLen,
        maxlength: USERS_CONSTANTS.realNameMaxLen
    }
});

schema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.passwordHashed) {
            return true;
        }
        else {
            return false;
        }
    }
});

schema.virtual('rating').get(function () {
    if (this.votesSum !== 0 && this.votesCount !== 0) {
        return this.votesSum / this.votesCount;
    }

    return 0;
});

let User = mongoose.model('User', schema);
module.exports = User;