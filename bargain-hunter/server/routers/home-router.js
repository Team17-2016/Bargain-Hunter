'use strict';

module.exports = function(app, express) {
    let router = express.Router();

    router.get('/', function(req, res) {
        let isAuthenticated = req.user || false;

        res.render('home', { isAuthenticated: isAuthenticated });
    });

    router.get('/Home', function(req, res) {
        res.redirect('/');
    });

    app.use(router);
};