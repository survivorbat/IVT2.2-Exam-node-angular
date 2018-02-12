const express = require('express');
const routes = express.Router();

const testController = require('../controllers/ctrl_test');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', testController.ping);

module.exports = routes;