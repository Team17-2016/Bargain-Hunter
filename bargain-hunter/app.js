function makeServer() {
    'use strict';

    const PORT = 65442,
        LOGGER_FORMAT = 'combined';

    let express = require('express'),
        bodyParser = require('body-parser'),
        logger = require('morgan'),
        passport = require('passport'),
        expressSession = require('express-session'),
        db = require('./server/config/db'),
        app = express();

    db.init();

    // TODO remove/edit when project is ready
    app.use(logger(LOGGER_FORMAT));

    app.use(expressSession({
        secret: 'coffeeadg1ikl9!tree7whatever39',
        resave: false,
        saveUninitialized: false
    }));

    // Setup Body-Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Setup static files access
    app.use("/public", express.static(__dirname + '/public/'));

    // Setup database models
    require('./server/models');

    // Setup Jade
    require('./server/config/jade-config')(app);

    require('./server/config/passport-config')();

    // Setup routers
    require('./server/routers')(app, express);

    // Middleware for last-resort error-handling
    app.use(function (err, req, res, next) {
        if (err) {
            let isAuthorized = (req.user && req.user.isAdmin) || false;
            res.render('error-page', {
                isAuthenticated: req.user,
                isAuthorized: isAuthorized,
                err: {
                    status: err.status || 400,
                    message: err.message || 'Something went wrong and we will blame you :)'
                }
            });
        }
    });

    // Start server event listener
    app.listen(PORT, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(`Server running at localhost:${PORT}`);
    });

    return app;
}

makeServer();

module.exports = makeServer;
