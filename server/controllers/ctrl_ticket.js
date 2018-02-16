const {Ticket} = require('../models/ticket');
const {Showing} = require('../models/showing');

module.exports = {
    getAll(req, res, next){
        Ticket.find().populate('showing').populate('showing.room').exec((err, tickets) => {
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
                // ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                // ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                // ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                // ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
                return ticket; 
            });
            res.status(200).json(tickets);
        });
    },
    getByShowing(req, res, next){
        Ticket.find({"showing": req.params._id}).populate('showing').exec((err, tickets) => {
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
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id;
                return ticket;
            });
            res.status(200).json(tickets);
        });
    },
    getById(req, res, next){
        Ticket.findById(req.params._id).populate('showing').exec((err, ticket) => {
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
        Showing.findById(req.body.showing, (err, showing) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!showing){
                res.status(400).json({"errors":"Showing does not exist. Please add a showing field with an existing showing."});
                return;
            }
            req.body.showing = showing;
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
        })
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
