const {session} = require('../config/neodb')
const { validationResult } = require('express-validator/check')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:User) RETURN u"
        session.run(query)
            .then((result) => {
                res.status(200).json(result.records)
            })
            .catch(next)
    },
    getById(req, res, next){

    },
    post(req,res,next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        }
        const params = {email: req.body.email, password: req.body.password}
        const search_query = "MATCH (u:User) WHERE u.email=$email RETURN u"
        session.run(search_query,params).then((result) => {
            if(result.records[0]===undefined){
                createNewUser()
            } else if(result.records[0].length>0){
                return res.status(409).json({ "error": "User with that email already exists"})
            } else {
                createNewUser()
            }
        })
        function createNewUser(){
            const new_query = "CREATE (u:User {email:$email,password:$password, authlevel:0}) RETURN u"
            session.run(new_query,params)
                .then((result) => {
                    res.status(201).json({result:"succes!"})
                })
                .catch(next)
        }
    },
    update(req, res, next){
        
    },
    delete(req,res,next){
        const params = {id: parseInt(req.params._id)}
        const delete_query = "MATCH (u:User) WHERE ID(u)=$id DELETE u"
        session.run(delete_query,params).then((result) => {
            res.status(204).json();
        }).catch(next)
    }
}
