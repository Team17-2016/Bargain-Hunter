'use strict';

module.exports = function(app, express) {
    let router = express.Router();

    router.get('/', function(req, res) {
        console.log('Called Home route');
        res.render('home');
    });

    router.get('/Home', function(req, res) {
        res.redirect('/');
    });

    router.get('/Deals', function(req, res) {
        res.render('deals');
    });

    router.get('/Login', function(req, res) {
        res.render('login');
    });

    router.get('/Register', function(req, res) {
        res.render('register');
    });

    app.use(router);
};