const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
require('dotenv').config()

let testID
let APIKEY

chai.use(chaiHttp)
describe('Location API interface', () => {
	it('should GET /api/locations/ correctly', done => {
        chai.request(server)
            .get('/api/locations')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('should GET /api/locations/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/locations/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should GET /api/locations/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/locations/wololo')
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should POST /api/token correctly', done => {
        chai.request(server)
            .post('/api/token')
            .send({email:process.env.TESTUSER_EMAIL,password:process.env.TESTUSER_PASS})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                APIKEY=res.body.token
                res.body.authlevel.should.equal(1)
                done()
            })
    })
    it('should POST /api/locations correctly', done => {
        chai.request(server)
            .post('/api/locations')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"name":"test","street":"test","city":"test","number":12,"zip":"test","state":"test","country":"Nederland"})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.message.should.equal("succes")
                testID=res.body.createdObject._id
                done()
            })
    })
    it('should POST /api/locations incorrectly', done => {
        chai.request(server)
            .post('/api/locations')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"street":"test","city":"test","number":12,"zip":"test","state":"test","country":"Nederland"})
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should DELETE /api/locations correctly', done => {
		chai.request(server)
			.delete('/api/locations/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
	it('should DELETE /api/locations incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/locations/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(422)
				done()
			})
	})
})