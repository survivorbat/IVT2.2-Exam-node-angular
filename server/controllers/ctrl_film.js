const {Film} = require('../models/film');
const {Showing} = require('../models/showing');

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
                film.url = req.protocol+"://"+req.get('host')+"/api/films/"+film._id;
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
            film.url = req.protocol+"://"+req.get('host')+"/api/films/"+film._id;
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
                    res.status(400).json({message: err.message});
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
                    res.status(400).json({message: err.message});
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            res.status(204).json({});
        });
    },
    delete(req,res,next){
        Film.findByIdAndRemove(req.params._id, (err, result) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            Showing.find({"film": result._id}).remove((err, result) => {
                console.log(result);
            })
            res.status(200).json({message:"succes",deletedObject: result});
        });
    }
}
