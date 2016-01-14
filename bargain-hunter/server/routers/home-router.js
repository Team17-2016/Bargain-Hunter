'use strict';

module.exports = function(app, express) {
    let router = express.Router();

    router.get('/', function(req, res) {
        let isAuthenticated = req.user || false,
            isAuthorized = isAuthenticated && req.user.isAdmin || false;

        res.render('home', { isAuthenticated: isAuthenticated, isAuthorized: isAuthorized });
    });

    router.get('/Home', function(req, res) {
        res.redirect('/');
    });

    app.use(router);
};