const auth = require('../auth/authentication'); //Get the authentication object
require('dotenv').config();

module.exports = {
    checkAuthentication(req, res, next){
        const password = req.body.password;
        //Looking in the database to verify that studentnumber and password.
        if (password===process.env.ADMIN_PASSWORD){
            //Generate token and reply to user with that token.
            const token = auth.encryptAuthToken();
            res.status(201).json({"token": token});
        } else {
            //Invalid login details reply to user with an error.
            res.status(401).json({ "error": "Invalid credentials" })
        }
    }
}
