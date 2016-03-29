'use strict';

let mongoose = require('mongoose');

function init() {
    mongoose.connect('mongodb://hadmin:hadmin@ds055895.mlab.com:55895/bargain-hunter');
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