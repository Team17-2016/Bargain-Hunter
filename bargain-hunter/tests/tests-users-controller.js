describe('Users controller tests', function () {
    require('../server/models')
    var mongoose = require('mongoose'),
        db = require('./test-db'),
        controller = require('../server/controllers/users-controller'),
        expect = require('chai').expect;;



    //db.init();

    beforeEach(function (done) {
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


    afterEach(function (done) {
        mongoose.disconnect();
        return done();
    });

    it('Register invalid user should return error', function () {
        var req = {
                body: {}
            },
            error,
            res = {
                redirect: function (path) {}
            },
            next = function (err) {
                error = err
            };

        controller.register(req, res, next);

        expect(error.status).eql(400);
    });
});
