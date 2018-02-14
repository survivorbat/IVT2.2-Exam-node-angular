const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Meal API interface', () => {
	it('should GET /api/locations/ correctly', done => {
        chai.request(server)
            .get('/api/locations')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/locations/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/locations/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/locations/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/locations/wololo')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});