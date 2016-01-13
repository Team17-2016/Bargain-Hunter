var should = require('should');
var request = require('supertest');
describe('Basic routes tests', function () {
    var server;
    var url = 'http://localhost:65442';
    /*beforeEach(function (done) {
        server = require('../app');
        done();
    });*/
    before(function (done) {
        server = require('../app');
        done();
    });
    //can't close the server
    /*afterEach(function (done) {
        //server.close();
        server = null;
        done();
    });*/
    it('responds to /', function testSlash(done) {
        request(url)
            .get('/')
            .expect(200, done);
    });
    it('status 404 on invalid address', function testPath(done) {
        request(url)
            .get('/foo/bar')
            .expect(404, done);
    });
});
