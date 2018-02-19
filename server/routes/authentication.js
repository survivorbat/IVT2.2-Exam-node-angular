const express = require('express');
const routes = express.Router();
const { check } = require('express-validator/check');

const authenticationController = require('../controllers/ctrl_authentication');

//Use the function in the controller if the user uses a post for /login.
routes.post('/token',[
    check('email').isEmail().withMessage('Please provide a valid email').trim().normalizeEmail(), 
    check('password').isLength({ min: 1 }).withMessage("Please provide a password").trim()
    ], authenticationController.checkAuthentication);

module.exports = routes;