const express = require('express');
const routes = express.Router();

const ticketcontroller = require('../controllers/ctrl_ticket');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', ticketcontroller.getAll);
routes.post('/', ticketcontroller.post);
routes.get('/:_id', ticketcontroller.getById);
routes.delete('/:_id', ticketcontroller.delete);
routes.patch('/:_id', ticketcontroller.update);

module.exports = routes;