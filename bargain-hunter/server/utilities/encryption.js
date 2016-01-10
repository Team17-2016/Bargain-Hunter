'use strict';

let crypto = require('crypto');

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, password) {
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(password).digest('hex');
}

module.exports = {
    generateSalt: generateSalt,
    generateHashedPassword: generateHashedPassword
};