'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        passport = require('passport'),
        controller = require('./../controllers/users-controller'),
        auth = require('./../config/auth'),
        connectEnsureLogin = require('connect-ensure-login');

    router
        .get('/register', controller.getRegisterView)
        .post('/register', controller.register)
        .get('/login', controller.getLoginView)
        .post('/login', auth.login)
        .post('/logout', auth.logout)
        .get('/profile', connectEnsureLogin.ensureLoggedIn(), controller.nonexistent);

    app.use('/users', router);
};