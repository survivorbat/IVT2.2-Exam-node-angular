const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const validator = require('express-validator');
const cors = require('cors');
/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.use(validator())

app.use(router);

app.listen(process.env.PORT || 5000, () => { 
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT); 
	} else {
		console.log('Server gestart op poort 5000'); 
	}
});

module.exports = app;