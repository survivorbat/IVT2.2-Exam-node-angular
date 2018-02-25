const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
require('dotenv').config();

let testID;
let APIKEY;

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
    it('should POST /api/rooms correctly', done => {
        chai.request(server)
            .post('/api/rooms')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"name":"test","rows":2,"columns":2,"location":"5a92c98a4d2a3e001449dab3"})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.message.should.equal("succes");
                testID=res.body.createdObject._id;
                done();
            });
    });
    it('should POST /api/rooms incorrectly', done => {
        chai.request(server)
            .post('/api/rooms')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"rows":2,"columns":2,"location":"5a92c98a4d2a3e001449dab3"})
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should DELETE /api/rooms correctly', done => {
		chai.request(server)
			.delete('/api/rooms/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should DELETE /api/rooms incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/rooms/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(422);
				done();
			});
	});
});