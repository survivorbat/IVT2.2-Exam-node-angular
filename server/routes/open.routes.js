const express = require('express');
const routes = express.Router();
const { check } = require('express-validator/check');

const authenticationController = require('../controllers/ctrl_authentication');
const locationcontroller = require('../controllers/ctrl_location');
const filmcontroller = require('../controllers/ctrl_film');
const roomcontroller = require('../controllers/ctrl_room');
const showingcontroller = require('../controllers/ctrl_showing');
const usercontroller = require('../controllers/ctrl_user');
const ticketcontroller = require('../controllers/ctrl_ticket');

routes.post('/token',[
    check('email').isEmail().withMessage('Please provide a valid email').trim().normalizeEmail(), 
    check('password').isLength({ min: 1 }).withMessage("Please provide a password").trim()
    ], authenticationController.checkAuthentication);

routes.get('/locations/', locationcontroller.getAll);
routes.get('/locations/:_id', locationcontroller.getById);

routes.get('/rooms/', roomcontroller.getAll);
routes.get('/rooms/:_id', roomcontroller.getById);
routes.get('/rooms/location/:_id', roomcontroller.getByLocation);

routes.get('/showings/', showingcontroller.getAll);
routes.get('/showings/:_id', showingcontroller.getById);
routes.get('/showings/location/:_id', showingcontroller.getByLocation);

routes.get('/tickets/', ticketcontroller.getAll);
routes.get('/tickets/user', ticketcontroller.getByUser);
routes.get('/tickets/:_id', ticketcontroller.getById);
routes.get('/tickets/showing/:_id', ticketcontroller.getByShowing);
routes.post('/tickets/', ticketcontroller.post);
routes.delete('/tickets/:_id', ticketcontroller.delete);

routes.post('/users/', [
    check('email').isEmail().withMessage('Provide a valid email').trim().normalizeEmail(),
    check('firstname').isLength({min: 1}).withMessage('Provide a valid firstname').trim(),
    check('lastname').isLength({min: 1}).withMessage('Provide a valid lastname').trim(),
    check('age').isNumeric().withMessage('Provide a valid age').trim(),
    check('password').isLength({min: 3}).withMessage('Please provide a password that is at least 3 charactes long').trim()
    ] ,usercontroller.post);

routes.get('/films/', filmcontroller.getAll);
routes.get('/films/:_id', filmcontroller.getById);


module.exports = routes;