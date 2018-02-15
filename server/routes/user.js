const express = require('express');
const routes = express.Router();

const usercontroller = require('../controllers/ctrl_user');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', usercontroller.getAll);
routes.post('/', usercontroller.post);
routes.get('/:_id', usercontroller.getById);
routes.delete('/:_id', usercontroller.delete);
routes.patch('/:_id', usercontroller.update);

module.exports = routes;