const {Film} = require('../models/film');
const {Showing} = require('../models/showing');
const {Room} = require('../models/room');
const {Ticket} = require('../models/ticket');

function sortByDate(a,b){
    return new Date(a.date)>new Date(b.date);
}
module.exports = {
    getAll(req, res, next){
        Showing.find().populate('film').populate({path:'room', populate:{path: 'location'}}).exec().then(showings => {
            if(!showings){
                res.status(200).json([]);
                return;
            }
            try {
                showings = showings.map(showing => {
                    showing = showing.toObject();
                    showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                    showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                    showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                    showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                    showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                    showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+showing.room.location._id;
                    showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
                    return showing;
                });
            }
            catch(e){
                
            }
            res.status(200).json(showings.sort((a,b) => sortByDate(a,b)));
        }).catch(err => next(err));
    },
    getById(req, res, next){
        Showing.findOne({_id: req.params._id}).populate('film').populate({path:'room', populate:{path: 'location'}}).exec().then(showing => {
            try {
                showing = showing.toObject();
                showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+showing.room.location._id;
                showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(showing);
        }).catch(err => next(err));
    },
    getByLocation(req, res, next){
        Showing.find().populate('film').populate({path:'room', populate:{path: 'location'}}).exec().then(showings => {
            if(!showings){
                res.status(200).json([]);
                return;
            }
            showings = showings.filter((showing) => showing.room.location._id==req.params._id );
            try {
                showings = showings.map(showing => {
                    showing = showing.toObject();
                    showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+showing._id;
                    showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+showing._id;
                    showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+showing.film._id;
                    showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+showing.room._id;
                    showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+showing.room.location._id;
                    showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+showing.room.location._id;
                    showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+showing.room.location._id;
                    return showing;
                });
            }
            catch (e){

            }
            res.status(200).json(showings.sort((a,b) => sortByDate(a,b)));
        }).catch(err => next(err));
    },
    post(req,res,next){
        if(req.body.specialties) req.body.specialties = req.body.specialties.split(',');
        const newShowing = new Showing(req.body, {});
        newShowing.save().then(newshowing => {
            res.status(201).json({"message":"succes","createdObject":newshowing});
        }).catch(err => next(err));
    },
    update(req, res, next){
        if(req.body.specialties && !Array.isArray(req.body.specialties)) req.body.specialties = req.body.specialties.split(',');
        Showing.findByIdAndUpdate(req.params._id,req.body).then(result => {
            res.status(204).json({});
        }).catch(err => next(err));
    },
    delete(req,res,next){
        Ticket.find({"showing": req.params._id}).remove().catch();
        Showing.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({});
                return;
            }
            res.status(200).json({message:"succes",deletedObject: result});
        }).catch(err => next(err));
    }
}
