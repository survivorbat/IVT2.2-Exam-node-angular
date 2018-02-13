const db = require('../config/db');
const mongoose = db.mongoose;
const Film = db.Film;

module.exports = {
    getAll(req, res, next){
        Film.find((err, films) => {
            if(err){
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            res.status(200).json(films);
        });
    },
    post(req,res,next){
        const newFilm = new Film(req.body, {});
        newFilm.save((err) => {
            if(err){
                if(err.name="ValidationError"){
                    res.status(400).json(err);
                } else {
                    res.status(500).json({"errors":"An error occured"});
                }
                return;
            }
            res.status(201).json({"message":"succes"});
        });
    }
}
