const express = require('express');
const routes = express.Router();

const ticketcontroller = require('../controllers/ctrl_ticket');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', ticketcontroller.getAll);
routes.get('/user', ticketcontroller.getByUser);
routes.get('/:_id', ticketcontroller.getById);
routes.get('/showing/:_id', ticketcontroller.getByShowing);
routes.post('/', ticketcontroller.post);
routes.delete('/:_id', ticketcontroller.delete);

routes.use((req,res,next) => {
    if(req.user.sub.authlevel>0){
        next();
    } else {
        res.status(403).json({message:"UNAUTHORIZED"});
    }
})
routes.patch('/:_id', ticketcontroller.update);

module.exports = routes;