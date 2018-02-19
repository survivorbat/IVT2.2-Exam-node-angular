const {Ticket} = require('../models/ticket');
const {Showing} = require('../models/showing');

module.exports = {
    getAll(req, res, next){
        Ticket.find().populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec((err, tickets) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!tickets){
                res.status(200).json([]);
                return;
            }
            tickets = tickets.map(ticket => {
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id;
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
                return ticket; 
            });
            res.status(200).json(tickets);
        });
    },
    getByShowing(req, res, next){
        Ticket.find().populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec((err, tickets) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!tickets){
                res.status(200).json([]);
                return;
            }
            tickets = tickets.filter((ticket) => ticket.showing._id==req.params._id );
            tickets = tickets.map(ticket => {
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id;
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
                return ticket;
            });
            res.status(200).json(tickets);
        });
    },
    getByUser(req, res, next){
        Ticket.find({userid: req.user.sub.userid}).populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec((err, tickets) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!tickets){
                res.status(200).json([]);
                return;
            }
            tickets = tickets.map(ticket => {
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id;
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
                return ticket;
            });
            res.status(200).json(tickets);
        });
    },
    getById(req, res, next){
        Ticket.findById(req.params._id).populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec((err, ticket) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!ticket){
                res.status(404).json({});
                return;
            }
            try {
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id;
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
            }
            catch(e){
                console.log(e);
                res.status(404).json({});
                return;
            }
            res.status(200).json(ticket);
        });
    },
    post(req,res,next){
        req.body.userid=req.user.sub.userid;
        const newTicket = new Ticket(req.body, {});
        newTicket.save((err, result) => {
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
    },
    update(req, res, next){
        Ticket.findByIdAndUpdate(req.params._id,req.body,(err) => {
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
        Ticket.findByIdAndRemove(req.params._id, (err, result) => {
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
            res.status(200).json({message:"success",deletedObject: result});
        });
    }
}
