const express = require('express'); //Express framework
const app = express(); //App to interact with express
const logger = require('morgan'); //Logger
const bodyParser = require('body-parser'); //Body parser
const router = require('./router'); //Our main router 

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
//Parsing application/vnd.api+json as JSON.
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended:true}));



/* The router file, we seperate this from the main server to keep our stuff organised */
app.use(router);

/* Start server on a pre-defined port or 5000  */
app.listen(process.env.PORT || 5000, () => { //Sends nodes
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT); //In case we're not testing locally
	} else {
		console.log('Server gestart op poort 5000'); //If we are testing locally
	}
});

/* Export for testing */
module.exports = app;