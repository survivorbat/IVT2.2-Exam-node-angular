const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
require('dotenv').config();

let testID;
let APIKEY;


chai.use(chaiHttp);
describe('Ticket API interface', () => {
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
	it('should GET /api/tickets/ correctly', done => {
        chai.request(server)
            .get('/api/tickets')
            .set('Authorization', 'Bearer '+APIKEY)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('should GET /api/tickets/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/tickets/5a840365909c6a1430edb871')
            .set('Authorization', 'Bearer '+APIKEY)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should GET /api/tickets/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/tickets/wololo')
            .set('Authorization', 'Bearer '+APIKEY)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should POST /api/tickets correctly', done => {
        chai.request(server)
            .post('/api/tickets')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"column":1,"row":0,"showing":{"specialties":["popcorn"," 3D"],"_id":"5a8af2414e514f2098c9193e","price":5,"room":{"_id":"5a8aed796c7da61a1432f8b4","location":{"_id":"5a8ae4fac9de641f0c598a41","country":"Nederland","name":"Pathé","state":"Noord-Brabant","zip":"2098DB","street":"chasseplein","number":5,"city":"Breda","__v":0,"url":"http://avancinema.herokuapp.com/api/locations/5a8ae4fac9de641f0c598a41","rooms_url":"http://avancinema.herokuapp.com/api/rooms/location/5a8ae4fac9de641f0c598a41","showings_url":"http://avancinema.herokuapp.com/api/showings/location/5a8ae4fac9de641f0c598a41"},"columns":7,"rows":6,"name":"Zaal 1","__v":0,"url":"http://avancinema.herokuapp.com/api/rooms/5a8aed796c7da61a1432f8b4"},"film":{"directors":["Mark Zuckerberg"],"writers":["Facebook"],"stars":["Maarten van der Heijden"],"_id":"5a844c0b0c98441fbc3e6070","subtitle":"Beats Angular!!!!!","popularity":7,"coverPicture":"https://raw.githubusercontent.com/rexxars/react-hexagon/HEAD/logo/react-hexagon.png","description":"eact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.\n\nJSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.","title":"ReactJS","duration":"190","year":"2016","__v":0,"genre":"Penguins","url":"http://avancinema.herokuapp.com/api/films/5a844c0b0c98441fbc3e6070"},"date":"2018-05-08T19:00:00.000Z","__v":0,"url":"http://avancinema.herokuapp.com/api/showings/5a8af2414e514f2098c9193e","tickets_url":"http://avancinema.herokuapp.com/api/tickets/showing/5a8af2414e514f2098c9193e"}})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.message.should.equal("succes");
                testID=res.body.createdObject._id;
                done();
            });
    });
    it('should POST /api/tickets incorrectly', done => {
        chai.request(server)
            .post('/api/tickets')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"row":0,"showing":{"specialties":["popcorn"," 3D"],"_id":"5a8af2414e514f2098c9193e","price":5,"room":{"_id":"5a8aed796c7da61a1432f8b4","location":{"_id":"5a8ae4fac9de641f0c598a41","country":"Nederland","name":"Pathé","state":"Noord-Brabant","zip":"2098DB","street":"chasseplein","number":5,"city":"Breda","__v":0,"url":"http://avancinema.herokuapp.com/api/locations/5a8ae4fac9de641f0c598a41","rooms_url":"http://avancinema.herokuapp.com/api/rooms/location/5a8ae4fac9de641f0c598a41","showings_url":"http://avancinema.herokuapp.com/api/showings/location/5a8ae4fac9de641f0c598a41"},"columns":7,"rows":6,"name":"Zaal 1","__v":0,"url":"http://avancinema.herokuapp.com/api/rooms/5a8aed796c7da61a1432f8b4"},"film":{"directors":["Mark Zuckerberg"],"writers":["Facebook"],"stars":["Maarten van der Heijden"],"_id":"5a844c0b0c98441fbc3e6070","subtitle":"Beats Angular!!!!!","popularity":7,"coverPicture":"https://raw.githubusercontent.com/rexxars/react-hexagon/HEAD/logo/react-hexagon.png","description":"eact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.\n\nJSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.","title":"ReactJS","duration":"190","year":"2016","__v":0,"genre":"Penguins","url":"http://avancinema.herokuapp.com/api/films/5a844c0b0c98441fbc3e6070"},"date":"2018-05-08T19:00:00.000Z","__v":0,"url":"http://avancinema.herokuapp.com/api/showings/5a8af2414e514f2098c9193e","tickets_url":"http://avancinema.herokuapp.com/api/tickets/showing/5a8af2414e514f2098c9193e"}})
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should DELETE /api/tickets correctly', done => {
		chai.request(server)
			.delete('/api/tickets/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should DELETE /api/tickets incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/tickets/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(422);
				done();
			});
	});
});