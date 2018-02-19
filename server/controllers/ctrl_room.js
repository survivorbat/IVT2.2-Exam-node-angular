const {Room} = require('../models/room');
const {Showing} = require('../models/showing');

module.exports = {
    getAll(req, res, next){
        Room.find().populate('location').exec().then(rooms => {
            if(!rooms){
                res.status(200).json([]);
                return;
            }
            rooms = rooms.map(room => {
                room = room.toObject();
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+room.location._id;
                room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+room.location._id;
                return room;
            });
            res.status(200).json(rooms);
        }).catch(err => next(err));
    }, 
    getById(req, res, next){
        Room.findOne({_id: req.params._id}).populate('location').exec().then(room => {
            try {
                room = room.toObject();
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+room.location._id;
                room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+room.location._id;
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(room);
        }).catch(err => next(err));
    },
    getByLocation(req, res, next){
        Room.find().populate('location').exec().then(rooms => {
            rooms = rooms.filter((room) => room.location._id==req.params._id );
            rooms = rooms.map(room => {
                room = room.toObject();
                room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+room.location._id;
                room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+room.location._id;
                return room;
            });
            res.status(200).json(rooms);
        }).catch(err => next(err));
    },
    post(req,res,next){
        const newRoom = new Room(req.body, {});
        newRoom.save().then(result => {
            if(err){
                if(err.name="ValidationError"){
                    res.status(400).json({message: err.message});
                } else {
                    res.status(500).json({"errors":"An error occured"});
                }
                return;
            }
            res.status(201).json({"message":"succces!","createdObject":result});
        }).catch(err => next(err));
    },
    update(req, res, next){
        Room.findByIdAndUpdate(req.params._id,req.body).then(result => {
            res.status(204).json({});
        }).catch(err => next(err));
    },
    delete(req,res,next){
        Room.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({});
                return;
            }
            Showing.find({"room._id": result._id}).remove((err, result) => {
                console.log(result);
            })
            res.status(200).json({message:"success",deletedObject: result});
        }).catch(err => next(err));
    }
}
