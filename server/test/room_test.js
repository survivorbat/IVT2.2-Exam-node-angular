const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Room API interface', () => {
	it('should GET /api/rooms/ correctly', done => {
        chai.request(server)
            .get('/api/rooms')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/rooms/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/rooms/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/rooms/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/rooms/wololo')
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
});