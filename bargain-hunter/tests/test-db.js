'use strict';

let mongoose = require('mongoose');

var collectionName='bargainHunterTest';

function init() {
    mongoose.connect('localhost:27017/bargainHunterTest');
    let db = mongoose.connection;

    /*db.on('error', function (error) {
     console.log(error);
     });*/

    db.once('open', function () {
        console.log('Db connection has been established.');
    });

    return db;
}

module.exports = {
    init: init,
    collectionName:collectionName
};
