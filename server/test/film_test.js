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
});