const express = require('express');
const routes = express.Router();

const roomcontroller = require('../controllers/ctrl_room');

//Use the function in the controller if the user uses a post for /login.
routes.get('/', roomcontroller.getAll);
routes.get('/:_id', roomcontroller.getById);
routes.get('/location/:_id', roomcontroller.getByLocation);

routes.use((req,res,next) => {
    if(req.user.sub<1){
        res.status(403).json({message:"UNAUTHORIZED"});
    } else {
        next();
    }
})
routes.post('/', roomcontroller.post);
routes.delete('/:_id', roomcontroller.delete);
routes.patch('/:_id', roomcontroller.update);

module.exports = routes;