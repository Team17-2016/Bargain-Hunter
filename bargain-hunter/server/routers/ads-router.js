'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        controller = require('./../controllers/ads-controller'),
        auth = require('./../config/auth'),
        connectEnsureLogin = require('connect-ensure-login');

    router.get('/', controller.getAllAdsByFilter)
        .get('/create', controller.createAdvertisement)
        .post('/', connectEnsureLogin.ensureLoggedIn('/users/login'), controller.postAdvertisement)
        .get('/:id',controller.getAdvertisementById)
        .post('/comment/:id',controller.commentAdvertisement)
        .delete('/:id', connectEnsureLogin.ensureLoggedIn('users/login'), controller.removeAdvertisement);

    app.use('/ads', router);
};