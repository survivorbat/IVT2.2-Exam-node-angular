const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt'); 
require('dotenv').config();

router.use(expressJWT({ 
    secret: process.env.SECRET_KEY 
}).unless({ 
    path: [
        { url: '/api/token', methods: ['POST']  },
        { url: /\/films*/, methods: ['GET']  } ,
        { url: '/api/shows', methods: ['GET']  } ,
        { url: '/api/locations', methods: ['GET']  },
        { url: '/api/rooms', methods: ['GET']  } 
    ]
}));

const authenticationrouter = require('./routes/authentication');
const testrouter = require('./routes/test');
const filmrouter = require('./routes/film');

router.use("/api/",authenticationrouter);
router.use("/api/ping",testrouter);
router.use("/api/films",filmrouter);

router.use((error,req,res,next) => {
	res.status(error.status).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found' //To let the caller know his request doesn't have an endpoint
	}).end();
})

module.exports = router;