const {session} = require('../config/neodb');
const { validationResult } = require('express-validator/check');

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:User) RETURN u.firstname as firstname,u.lastname as lastname,u.age as age,u.email as email";
        session.run(query)
            .then(function(result) {
                res.status(200).json(result.records);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({message:"An error occured"});
            });
    },
    getById(req, res, next){

    },
    post(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        const params = {email: req.body.email, password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age};
        const search_query = "MATCH (n:User) WHERE n.email=$email RETURN n";
        session.run(search_query,params).then((result) => {
            if(result.records[0]===undefined){
                createNewUser()
            } else if(result.records[0].length>0){
                return res.status(409).json({ "error": "User with that email already exists"});
            } else {
                createNewUser();
            }
        })
        function createNewUser(){
            const new_query = "CREATE (u:User {email:$email,password:$password, authlevel:0}) RETURN u";
            session.run(new_query,params)
                .then(function(result) {
                    res.status(201).json({result:"succes!"});
                })
                .catch(function(error) {
                    console.log(error);
                    res.status(500).json({message:"An error occured"});
                });
        }
    },
    update(req, res, next){
        
    },
    delete(req,res,next){
        
    }
}
