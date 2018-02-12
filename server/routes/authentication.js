const express = require('express');
const routes = express.Router();

const authenticationController = require('../controllers/ctrl_authentication');

//Use the function in the controller if the user uses a post for /login.
routes.post('/token', authenticationController.checkAuthentication);

module.exports = routes;