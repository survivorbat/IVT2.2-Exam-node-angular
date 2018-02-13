const express = require('express');
const routes = express.Router();

const filmcontroller = require('../controllers/ctrl_film');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', filmcontroller.getAll);
routes.get('/:_id', filmcontroller.getById);
routes.post('/', filmcontroller.post);

module.exports = routes;