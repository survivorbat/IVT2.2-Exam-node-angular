const {Film} = require('../models/film');
const {Showing} = require('../models/showing');
const {Room} = require('../models/room');
const {Ticket} = require('../models/ticket');

module.exports = {
    getAll(req, res, next){
        Showing.find((err, showings) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!showings){
                res.status(200).json([]);
                return;
            }
            showings = showings.map(showing => {
                showing = showing.toObject();
                showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                return showing;
            });
            res.status(200).json(showings);
        });
    },
    getById(req, res, next){
        Showing.findOne({_id: req.params._id},(err, showing) => {
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
                showing = showing.toObject();
                showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(showing);
        });
    },
    post(req,res,next){
        Room.findById(req.body.room, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!result){
                res.status(400).json({"errors":"Room does not exist. Please add a room field with an existing room."});
                return;
            }
            req.body.room=result;
            Film.findById(req.body.film, (err, result) => {
                if(err){
                    console.log(err);
                    res.status(500).json({"errors":"An error occured"});
                    return;
                }
                if(!result){
                    res.status(400).json({"errors":"Film does not exist. Please add a film field with an existing film."});
                    return;
                }
                req.body.film=result;
                const newShowing = new Showing(req.body, {});
                newShowing.save((err, newshowing) => {
                    if(err){
                        if(err.name="ValidationError"){
                            res.status(400).json({message: err.message});
                        } else {
                            res.status(500).json({"errors":"An error occured"});
                        }
                        return;
                    }
                    res.status(201).json({"message":"succces!","createdObject":newshowing});
                });
            })
        })
    },
    update(req, res, next){
        Showing.findByIdAndUpdate(req.params._id,req.body,(err) => {
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
        Showing.findByIdAndRemove(req.params._id, (err, result) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!result){
                res.status(404).json({});
                return;
            }
            Ticket.find({"showing._id": result._id}).remove((err, result) => {
                console.log(result);
            })
            res.status(200).json({message:"success",deletedObject: result});
        });
    }
}
