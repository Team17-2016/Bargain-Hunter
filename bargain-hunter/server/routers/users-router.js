'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        passport = require('passport'),
        controller = require('./../controllers/users-controller');

    router
        .get('/register', controller.getRegisterView)
        .post('/register', controller.register)
        .post('/login', controller.login)
        .get('/profile', passport.authenticate('bearer', { session: false }), controller.nonexistent);

    app.use('/users', router);
};