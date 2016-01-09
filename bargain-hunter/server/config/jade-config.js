'use strict';

module.exports = function(app) {
    app.set('view engine', 'jade');
    app.set('views', './server/views');

    console.log('Jade config called');
};