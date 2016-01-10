'use strict';

let mongoose = require('mongoose'),
    encryption = require('./../utilities/encryption');

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index : {
            unique: true
        }
    },
    passwordHashed: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
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

let User = mongoose.model('User', schema);
module.exports = User;