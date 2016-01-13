'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        controller = require('./../controllers/admin-controller'),
        auth = require('./../config/auth');

    router
        .get('/users', controller.getAdminUsersView)
        .get('/users/all', controller.getAllUsers);

    app.use('/admin', auth.isAdmin, router);
};