const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Meal API interface', () => {
	it('should GET /api/showings/ correctly', done => {
        chai.request(server)
            .get('/api/showings')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/showings/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/showings/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/showings/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/showings/wololo')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});