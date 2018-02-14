const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Meal API interface', () => {
	it('should GET /api/tickets/ correctly', done => {
        chai.request(server)
            .get('/api/tickets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/tickets/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/tickets/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/tickets/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/tickets/wololo')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});