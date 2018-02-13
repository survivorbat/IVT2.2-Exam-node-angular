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
        { url: '/api/rooms', methods: ['GET']  },
        { url: '/api/tickets', methods: ['GET']  } 
    ]
}));

const authenticationrouter = require('./routes/authentication');
const filmrouter = require('./routes/film');
const showingrouter = require('./routes/showing');
const locationrouter = require('./routes/location');
const roomrouter = require('./routes/room');
const ticketrouter = require('./routes/ticket');

router.use("/api/",authenticationrouter);
router.use("/api/films",filmrouter);
router.use("/api/showings",showingrouter);
router.use("/api/locations",locationrouter);
router.use("/api/rooms",roomrouter);
router.use("/api/tickets",ticketrouter);

router.use((error,req,res,next) => {
	res.status(error.status || 500).send({
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