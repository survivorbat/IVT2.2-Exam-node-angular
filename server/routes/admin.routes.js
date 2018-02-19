const express = require('express');
const routes = express.Router();
const { check } = require('express-validator/check');

const usercontroller = require('../controllers/ctrl_user');
const filmcontroller = require('../controllers/ctrl_film');
const ticketcontroller = require('../controllers/ctrl_ticket');
const showingcontroller = require('../controllers/ctrl_showing');
const locationcontroller = require('../controllers/ctrl_location');
const roomcontroller = require('../controllers/ctrl_room');

routes.use((req,res,next) => {
    if(req.user.sub.authlevel>0){
        next();
    } else {
        res.status(403).json({message:"UNAUTHORIZED"});
    }
})
routes.post('/films/', filmcontroller.post);
routes.delete('/films/:_id', filmcontroller.delete);
routes.patch('/films/:_id', filmcontroller.update);

routes.get('/users/', usercontroller.getAll);
routes.get('/users/:_id', usercontroller.getById);
routes.delete('/users/:_id', usercontroller.delete);
routes.patch('/users/:_id', usercontroller.update);
routes.patch('/users/:_id', ticketcontroller.update);

routes.post('/showings/', showingcontroller.post);
routes.delete('/showings/:_id', showingcontroller.delete);
routes.patch('/showings/:_id', showingcontroller.update);

routes.post('/locations/', locationcontroller.post);
routes.delete('/locations/:_id', locationcontroller.delete);
routes.patch('/locations/:_id', locationcontroller.update);

routes.post('/rooms/', roomcontroller.post);
routes.delete('/rooms/:_id', roomcontroller.delete);
routes.patch('/rooms/:_id', roomcontroller.update);

module.exports = routes;