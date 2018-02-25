const {Room} = require('../models/room');
const {Showing} = require('../models/showing');
const {Ticket} = require('../models/ticket');

module.exports = {
    getAll(req, res, next){
        Room.find().populate('location').exec().then(rooms => {
            if(!rooms){
                res.status(200).json([]);
                return;
            }
            try {
                rooms = rooms.map(room => {
                    room = room.toObject();
                    room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                    room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                    room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+room.location._id;
                    room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+room.location._id;
                    return room;
                });
            }
            catch (e){
                
            }
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
            try {
                rooms = rooms.map(room => {
                    room = room.toObject();
                    room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+room._id;
                    room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+room.location._id;
                    room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+room.location._id;
                    room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+room.location._id;
                    return room;
                });
            }
            catch (e){

            }
            res.status(200).json(rooms);
        }).catch(err => next(err));
    },
    post(req,res,next){
        const newRoom = new Room(req.body, {});
        newRoom.save().then(result => {
            res.status(201).json({"message":"succes","createdObject":result});
        }).catch(err => next(err));
    },
    update(req, res, next){
        Room.findByIdAndUpdate(req.params._id,req.body).then(result => {
            res.status(204).json({});
        }).catch(err => next(err));
    },
    delete(req,res,next){
        Ticket.find({"showing.room": req.params._id}).remove().catch();
        Showing.find({"room": req.params._id}).remove().catch();
        Room.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({});
                return;
            }
            res.status(200).json({message:"success",deletedObject: result});
        }).catch(err => next(err));
    }
}
