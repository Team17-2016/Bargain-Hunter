describe('Users controller tests', function () {
    require('../server/models')
        //TODO: mock mongoose
    var mongoose = require('mongoose'),
        db = require('./test-db'),
        controller = require('../server/controllers/users-controller'),
        expect = require('chai').expect;

    // mocks
    var error = {
            ststus: undefined
        },
        res = {
            redirect: function (path) {}
        },
        next = function (err) {
            error = err;
        };

    var accounts = {
        valid: {
            password: 'password',
            email: 'email1@email.email',
            username: 'username1',
            confirmPassword: 'password'
        },
        noPass: {
            username: 'username2',
            email: 'email2@email.email',
            confirmPassword: 'password'
        },
        noUser: {
            password: 'password',
            email: 'email3@email.email',
            confirmPassword: 'password'
        },
        noEmail: {
            password: 'password',
            username: 'username3',
            confirmPassword: 'password'
        },
        invalidEmail: {
            password: 'password',
            email: '666',
            username: 'username4',
            confirmPassword: 'password'
        },
        shortPassword: {
            password: 'p',
            email: 'email4@email.com',
            username: 'username5',
            confirmPassword: 'p'
        },
        shortUserName: {
            password: 'password',
            email: 'email5@email.com',
            username: 'u',
            confirmPassword: 'password'
        },
        longPassword: {
            password: 'passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword',
            email: 'email6@email.com',
            username: 'username6',
            confirmPassword: 'p'
        },
        longUserName: {
            password: 'password',
            email: 'email7@email.com',
            username: 'usernameusernameusernameusernameusernameusernameusernameusernameusernameusername',
            confirmPassword: 'password'
        }
    };

    //db.init();

    beforeEach(function () {
        error = {
            ststus: undefined
        }

        //done();
    });

    before(function (done) {
        function clearDB() {
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function () {});
            }
            return done();
        }

        if (mongoose.connection.readyState === 0) {
            db.init();
        } else {
            return clearDB();
        }

    });


    after(function (done) {
        mongoose.disconnect();
        return done();
    });

    describe('Register', function () {
        it('Register valid user should crate user successfuly', function () {
            var req = {
                body: accounts.valid
            };


            controller.register(req, res, next);

            User = mongoose.model('User');
            expect(error.status).eql(undefined);
            expect(!!User.findOne({
                username: req.body.name
            }, function (err, dbUser) {
                return dbUser;
            })).eql(true);
        });

        it('Register user with empty request body should return error', function () {
            var req = {
                body: null
            };

            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user without password should return error', function () {
            var req = {
                body: accounts.noPass
            };

            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user without username should return error', function () {
            var req = {
                body: accounts.noUser
            };

            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        // Is email mandatory?
        it('Register user without email should return error', function () {
            var req = {
                body: accounts.noEmail
            };

            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user invalid email should return error', function () {
            var req = {
                body: accounts.invalidEmail
            };


            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user with short password should return error', function () {
            var req = {
                body: accounts.shortPassword
            };


            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user with short username should return error', function () {
            var req = {
                body: accounts.shortUserName
            };


            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user with long password should return error', function () {
            var req = {
                body: accounts.longPassword
            };


            controller.register(req, res, next);

            expect(error.status).eql(400);
        });

        it('Register user with long username should return error', function () {
            var req = {
                body: accounts.longUserName
            };


            controller.register(req, res, next);

            expect(error.status).eql(400);
        });
    });

    describe('Edit profile', function () {

    })
});
