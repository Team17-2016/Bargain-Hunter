var request = require('supertest');
describe('User routes tests', function () {
    var server;
    before(function (done) {
        server = require('../app');
        done();
    });
    describe('Public part', function () {
        it('Rsepond 200 OK on login page', function testSlash(done) {
            request(server)
                .get('/login')
                .expect(200, done);
            done();
        });
        it('Rsepond 200 OK on register page', function testPath(done) {
            request(server)
                .get('/register')
                .expect(200, done);
            done();
        });
    });
    describe('Private part', function (){
        it('Profile page without authentication redirects to login page', function testSlash(done) {
            request(server)
                .get('/profile')
                .expect(302, done);
            done();
        });
    });
});
