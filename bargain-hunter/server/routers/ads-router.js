'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        controller = require('./../controllers/ads-controller'),
        auth = require('./../config/auth'),
        connectEnsureLogin = require('connect-ensure-login');

    router.post('/', connectEnsureLogin.ensureLoggedIn('/users/login'), function() {});

    app.use('/ads', router);
};