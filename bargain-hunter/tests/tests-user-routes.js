var request = require('supertest');
describe('User routes tests', function () {
    var server;
    var url = 'http://localhost:65442';

    before(function (done) {
        server = require('../app');
        return done();
    });
    describe('test', function () {
            it('work damit!', function () {
                request(url)
                    .get('/users/login');
            })
        })
        describe('Public part', function () {
            it('Rsepond 200 OK on login page', function (done) {
                request(url)
                    .get('/users/login')
                    .expect(200, done);
            });
            it('Rsepond 200 OK on register page', function (done) {
                request(url)
                    .get('/users/register')
                    .expect(200, done);
            });
        });
    describe('Private part', function () {
        it('Profile page without authentication redirects to login page', function testSlash(done) {
            request(url)
                .get('/users/profile')
                .expect('Location', '/users/login')
                .expect(302, done);
        });
    });
});
