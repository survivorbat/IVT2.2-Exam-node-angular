const express = require('express'); //The express object from node modules
const router = express.Router(); //The router that we're going to need
const config = require('./config/config'); 
const expressJWT = require('express-jwt'); 
require('dotenv').config();

router.use(expressJWT({ //For each route use the expressJWT module
    secret: process.env.SECRET_KEY //With the secret key
}).unless({ //HOWEVER DON'T USE IT FOR:
    path: [
        { url: '/api/token', methods: ['POST']  } //The login route, otherwise you can be 'locked out' so to say. Like when you need a key for your house but the key is inside
    ]
}));

//Now that that's done let's set up all our routes
const authenticationrouter = require('./routes/authentication');
router.use("/api/",authenticationrouter);

//Catch any errors and display their details
router.use((error,req,res,next) => {
	res.status(500).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

/* Catch any undefined routes with a 404 status*/
router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found' //To let the caller know his request doesn't have an endpoint
	}).end();
})

module.exports = router; //Export this router to the server