const auth = require('../auth/authentication'); //Get the authentication object
const {session} = require('../config/neodb');
require('dotenv').config();

module.exports = {
    checkAuthentication(req, res, next){
        if(req.body.email===undefined || req.body.password===undefined) return res.status(400).json({"message":"No email and/or password found"});
        const query = "MATCH (u:User) WHERE u.email=$email AND u.password = $password RETURN u LIMIT 1";
        const params = {"email": req.body.email, "password": req.body.password};
        session.run(query, params)
            .then(function(result) {
                if(!result.records[0]) return res.status(401).json({ "error": "Invalid credentials"});
                if(result.records[0].length===1){
                    const token = auth.encryptAuthToken();
                    return res.status(201).json({"token": token});
                } else {
                    return res.status(401).json({ "error": "Invalid credentials"});
                }
            })
            .catch(function(error) {
                res.status(500).json({message:"An error occured"});
                return;
            });
    }
}
