var request = require('supertest');
describe('loading express', function () {
    var server;
    /*beforeEach(function (done) {
        server = require('../app');
        done();
    });*/
    before(function (done) {
        server = require('../app');
        done();
    });
    /*afterEach(function (done) {
        //server.close();
        server = null;
        done();
    });*/
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
        done();
    });
    it('404 on invalid address', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
        done();
    });
});
