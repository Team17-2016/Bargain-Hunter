'use strict';

const PORT = 65442,
    LOGGER_FORMAT = 'combined';

let express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    db = require('./server/config/db'),
    app = express();

db.init();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// TODO remove/edit when project is ready
app.use(logger(LOGGER_FORMAT));

require('./server/models');
require('./server/config/auth');
require('./server/routers')(app);

// next should stay, otherwise not working
app.use(function(err, req, res, next) {
    if (err) {
        res.status(err.status || 500)
            .json({
                message: err.message
            });
    }
});

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Server running at localhost:${PORT}`);
});