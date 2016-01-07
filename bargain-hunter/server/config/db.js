'use strict';

let mongoose = require('mongoose');

function init() {
    mongoose.connect('localhost:27017/bargainHunter');
    let db = mongoose.connection;

    /*db.on('error', function (error) {
     console.log(error);
     });*/

    db.once('open', function () {
        console.log('Db connection has been established.');
    });
}

module.exports = {
    init: init
};