const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
require('dotenv').config();

let testID;
let APIKEY;

chai.use(chaiHttp);
describe('Showing API interface', () => {
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
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should POST /api/token correctly', done => {
        chai.request(server)
            .post('/api/token')
            .send({email:process.env.TESTUSER_EMAIL,password:process.env.TESTUSER_PASS})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                APIKEY=res.body.token;
                res.body.authlevel.should.equal(1);
                done();
            });
    });
    it('should POST /api/showings correctly', done => {
        chai.request(server)
            .post('/api/showings')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"film":"5a844c0b0c98441fbc3e6070","price":5,"date":"2018-01-30T12:12","specialties":"tset,test,test","room":"5a92cc3a62b4f4001435ca50"})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.message.should.equal("succes");
                testID=res.body.createdObject._id;
                done();
            });
    });
    it('should POST /api/showings incorrectly', done => {
        chai.request(server)
            .post('/api/showings')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"film":"5a844c0b0c98441fbc3e6070","date":"2018-01-30T12:12","specialties":"tset,test,test","room":"5a92cc3a62b4f4001435ca50"})
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should DELETE /api/showings correctly', done => {
		chai.request(server)
			.delete('/api/showings/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should DELETE /api/showings incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/showings/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(422);
				done();
			});
	});
});