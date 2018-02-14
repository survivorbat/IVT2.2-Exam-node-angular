const {Ticket} = require('../models/ticket');
const {Showing} = require('../models/showing');

module.exports = {
    getAll(req, res, next){
        Ticket.find((err, tickets) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            tickets = tickets.map(ticket => {
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
                return ticket;
            });
            res.status(200).json(tickets);
        });
    },
    getById(req, res, next){
        Ticket.findOne({_id: req.params._id},(err, ticket) => {
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
                ticket = ticket.toObject();
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id;
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id;
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id;
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id;
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id;
            }
            catch(e){
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
            res.status(200).json({message:"success",deletedObject: result});
        });
    }
}
