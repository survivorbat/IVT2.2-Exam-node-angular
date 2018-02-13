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
            try {
            film = film.toObject();
            film.url = "https://bioscoopapp.herokuapp.com/api/films/"+film._id;
            }
            catch(e){
                res.status(404).json({});
                return;
            }
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
    },
    update(req, res, next){
        Film.findByIdAndUpdate(req.params._id,req.body,(err) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                } else if(err.name="ValidationError"){
                    res.status(400).json(err);
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            res.status(204).json({});
        });
    },
    delete(req,res,next){
        Film.findByIdAndRemove(req.params._id, (err) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            res.status(204).json({});
        });
    }
}
