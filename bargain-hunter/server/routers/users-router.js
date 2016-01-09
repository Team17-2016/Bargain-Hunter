'use strict';

module.exports = function(app, express) {
    let router = express.Router(),
        passport = require('passport'),
        controller = require('./../controllers/users-controller');

    // GET api/users/profile is private. Expects Header with key Authorization and value -> Bearer [token received after login]
    router.post('/register', controller.register)
        .post('/login', controller.login)
        .get('/profile', passport.authenticate('bearer', { session: false }), controller.nonexistent);

    app.use('/api/users', router);
};