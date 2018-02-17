const express = require('express');
const routes = express.Router();
const { check } = require('express-validator/check');

const usercontroller = require('../controllers/ctrl_user');

routes.post('/', [
    check('email').isEmail().withMessage('Provide a valid email').trim().normalizeEmail(),
    check('firstname').isLength({min: 1}).withMessage('Provide a valid firstname').trim(),
    check('lastname').isLength({min: 1}).withMessage('Provide a valid lastname').trim(),
    check('age').isNumeric().withMessage('Provide a valid age').trim(),
    check('password').isLength({min: 3}).withMessage('Please provide a password that is at least 3 charactes long').trim()
    ] ,usercontroller.post);

routes.use((req,res,next) => {
    if(req.user.sub.authlevel<1){
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