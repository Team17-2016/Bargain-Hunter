'use strict';

const PORT = 65442,
    LOGGER_FORMAT = 'combined';

let express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    db = require('./server/config/db'),
    app = express();

db.init();

// TODO remove/edit when project is ready
app.use(logger(LOGGER_FORMAT));

// Setup Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Setup static files access
app.use("/public", express.static(__dirname + '/public/'));

// Setup database models
require('./server/models');

// Setup Jade
require('./server/config/jade-config')(app);

// Setup Authentication
require('./server/config/auth');

// Setup routers
require('./server/routers')(app, express);

// Middleware for last-resort error-handling
app.use(function(err, req, res, next) {
    if (err) {
        res.status(err.status || 500)
            .json({
                message: err.message
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