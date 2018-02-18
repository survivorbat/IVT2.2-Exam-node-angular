const express = require('express');
const routes = express.Router();

const locationcontroller = require('../controllers/ctrl_location');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', locationcontroller.getAll);
routes.get('/:_id', locationcontroller.getById);

routes.use((req,res,next) => {
    if(req.user.sub.authlevel>0){
        next();
    } else {
        res.status(403).json({message:"UNAUTHORIZED"});
    }
})
routes.post('/', locationcontroller.post);
routes.delete('/:_id', locationcontroller.delete);
routes.patch('/:_id', locationcontroller.update);

module.exports = routes;