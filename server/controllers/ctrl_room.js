const {Room} = require('../models/room');
const {Location} = require('../models/location');
const {Showing} = require('../models/showing');

module.exports = {
    getAll(req, res, next){
        Room.find((err, rooms) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!rooms){
                res.status(200).json([]);
                return;
            }
            rooms = rooms.map(room => {
                room = room.toObject();
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                return room;
            });
            res.status(200).json(rooms);
        });
    },
    getById(req, res, next){
        Room.findOne({_id: req.params._id},(err, room) => {
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
                room = room.toObject();
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(room);
        });
    },
    getByLocation(req, res, next){
        Room.find({"location._id":req.params._id},(err, rooms) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            rooms = rooms.map(room => {
                room = room.toObject();
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                return room;
            });
            res.status(200).json(rooms);
        });
    },
    post(req,res,next){
        Location.findOne({_id: req.body.location}, (err, location) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!location){
                res.status(400).json({"errors":"Location does not exist"});
                return;
            }
            req.body.location = location.toObject();
            const newRoom = new Room(req.body, {});
            newRoom.save((err, result) => {
                if(err){
                    if(err.name="ValidationError"){
                        res.status(400).json({message: err.message});
                    } else {
                        res.status(500).json({"errors":"An error occured"});
                    }
                    return;
                }
                res.status(201).json({"message":"succces!","createdObject":result});
            });
        });
    },
    update(req, res, next){
        Room.findByIdAndUpdate(req.params._id,req.body,(err) => {
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
        Room.findByIdAndRemove(req.params._id, (err, result) => {
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
            Showing.find({"room._id": result._id}).remove((err, result) => {
                console.log(result);
            })
            res.status(200).json({message:"success",deletedObject: result});
        });
    }
}
