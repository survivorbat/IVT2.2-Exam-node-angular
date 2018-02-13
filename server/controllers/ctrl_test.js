const db = require('../config/db')
const mongoose = db.mongoose;

module.exports = {
    ping(req, res, next){
        res.status(200).json({message:"pong"});
    }
}
