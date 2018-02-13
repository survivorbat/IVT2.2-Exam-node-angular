const express = require('express');
const routes = express.Router();

const locationcontroller = require('../controllers/ctrl_location');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', locationcontroller.getAll);
routes.post('/', locationcontroller.post);
routes.get('/:_id', locationcontroller.getById);
routes.delete('/:_id', locationcontroller.delete);
routes.patch('/:_id', locationcontroller.update);

module.exports = routes;