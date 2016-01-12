'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        controller = require('./../controllers/ads-controller'),
        auth = require('./../config/auth'),
        connectEnsureLogin = require('connect-ensure-login');

    router.get('/', controller.getAllAdsByFilter)
        .get('/create', function(req,res) {
            console.log(req.user);
            let isAuthenticated = req.user || false;

            res.render('post-advertisement', {isAuthenticated:isAuthenticated });
        })
        .get('/:id',controller.getAdvertisementById)
        .delete('/:id', connectEnsureLogin.ensureLoggedIn('users/login'), controller.removeAdvertisement)
        .post('/', connectEnsureLogin.ensureLoggedIn('/users/login'), controller.postAdvertisement);


    app.use('/ads', router);
};