const mongoose = require('../config/db').mongoose;

module.exports = {
    ping(req, res, next){
        res.status(200).json({message:"pong"});
    }
}
