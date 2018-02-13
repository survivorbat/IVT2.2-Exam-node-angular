const db = require('../config/db');
const mongoose = db.mongoose;
const Film = db.Film;

module.exports = {
    getAll(req, res, next){
        Film.find((err, films) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            films = films.map(film => {
                film = film.toObject();
                film.url = "https://bioscoopapp.herokuapp.com/api/films/"+film._id;
                return film;
            });
            res.status(200).json(films);
        });
    },
    getById(req, res, next){
        Film.findOne({_id: req.params._id},(err, film) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            film = film.toObject();
            film.url = "https://bioscoopapp.herokuapp.com/api/films/"+film._id;
            res.status(200).json(film);
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
