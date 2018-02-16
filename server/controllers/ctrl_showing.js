const {Film} = require('../models/film');
const {Showing} = require('../models/showing');
const {Room} = require('../models/room');
const {Ticket} = require('../models/ticket');

function sortByDate(a,b){
    return new Date(a.date)>new Date(b.date);
}
module.exports = {
    getAll(req, res, next){
        Showing.find().populate({path:'film',path:'room', populate:{path: 'location'}}).exec((err, showings) => {
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
                showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
                return showing;
            });
            res.status(200).json(showings.sort((a,b) => sortByDate(a,b)));
        });
    },
    getById(req, res, next){
        Showing.findOne({_id: req.params._id}).populate({path:'film',path:'room', populate:{path: 'location'}}).exec((err, showing) => {
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
                showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(showing);
        });
    },
    getByLocation(req, res, next){
        Showing.find().populate({path:'film',path:'room', populate:{path: 'location'}}).exec((err, showings) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!showings){
                res.status(200).json([]);
                return;
            }
            showings = showings.filter((showing) => showing.room.location._id==req.params._id );
            showings = showings.map(showing => {
                showing = showing.toObject();
                showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
                return showing;
            });
            res.status(200).json(showings.sort((a,b) => sortByDate(a,b)));
        });
    },
    post(req,res,next){
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
