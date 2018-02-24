const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('Meal API interface', () => {
	it('should GET /api/films/ correctly', done => {
        chai.request(server)
            .get('/api/films')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/films/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/films/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/films/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/films/wololo')
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
});