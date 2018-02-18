const express = require('express');
const routes = express.Router();

const filmcontroller = require('../controllers/ctrl_film');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', filmcontroller.getAll);
routes.get('/:_id', filmcontroller.getById);

routes.use((req,res,next) => {
    if(req.user.sub.authlevel>0){
        next();
    } else {
        res.status(403).json({message:"UNAUTHORIZED"});
    }
})
routes.post('/', filmcontroller.post);
routes.delete('/:_id', filmcontroller.delete);
routes.patch('/:_id', filmcontroller.update);

module.exports = routes;