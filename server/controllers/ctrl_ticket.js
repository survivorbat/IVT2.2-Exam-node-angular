const db = require('../config/db');
const mongoose = db.mongoose;
const Ticket = db.Ticket;

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
            }
            catch(e){
                res.status(404).json({});
                return;
            }
            res.status(200).json(ticket);
        });
    },
    post(req,res,next){
        const newTicket = new Ticket(req.body, {});
        newTicket.save((err) => {
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
