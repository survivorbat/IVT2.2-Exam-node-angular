const express = require('express');
const routes = express.Router();

const usercontroller = require('../controllers/ctrl_user');

//Use the function in the controller if the user uses a post for /login.
routes.post('/', usercontroller.post);
routes.use((req,res,next) => {
    if(req.user.sub<1){
        res.status(403).json({message:"UNAUTHORIZED"});
    } else {
        next();
    }
})

routes.get('/', usercontroller.getAll);
routes.get('/:_id', usercontroller.getById);
routes.delete('/:_id', usercontroller.delete);
routes.patch('/:_id', usercontroller.update);

module.exports = routes;