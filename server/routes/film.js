const express = require('express');
const routes = express.Router();

const filmcontroller = require('../controllers/ctrl_film');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', filmcontroller.getAll);
routes.post('/', filmcontroller.post);
routes.get('/:_id', filmcontroller.getById);
routes.delete('/:_id', filmcontroller.delete);
routes.patch('/:_id', filmcontroller.update);

module.exports = routes;