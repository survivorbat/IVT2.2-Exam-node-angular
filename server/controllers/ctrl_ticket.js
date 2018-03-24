const {Ticket} = require('../models/ticket')
const {Showing} = require('../models/showing')

module.exports = {
    getAll(req, res, next){
        Ticket.find().populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec().then(tickets => {
            if(!tickets){
                res.status(200).json([])
                return
            }
            tickets = tickets.map(ticket => {
                try {
                    ticket = ticket.toObject()
                    ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id
                    ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id
                    ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id
                    ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id
                    ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id
                    ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id
                    ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id
                    ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id
                }
                finally {
                    return ticket
                } 
            })
            res.status(200).json(tickets)
        }).catch(err => next(err))
    },
    getByShowing(req, res, next){
        Ticket.find().populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec().then(tickets => {
            if(!tickets){
                res.status(200).json([])
                return
            }
            tickets = tickets.filter((ticket) => ticket.showing._id==req.params._id)
                tickets = tickets.map(ticket => {
                    try {
                        ticket = ticket.toObject()
                        ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id
                        ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id
                        ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id
                        ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id
                        ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id
                        ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id
                        ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id
                        ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id
                    }
                    finally {
                        return ticket
                    } 
                })
            res.status(200).json(tickets)
        }).catch(err => next(err))
    },
    getByUser(req, res, next){
        Ticket.find({username: req.params._id}).populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec().then(tickets => {
            if(!tickets){
                res.status(200).json([])
                return
            }
            tickets = tickets.map(ticket => {
                try {
                    ticket = ticket.toObject()
                    ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id
                    ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id
                    ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id
                    ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id
                    ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id
                    ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id
                    ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id
                    ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id
                }
                finally {
                    return ticket
                } 
            })
            res.status(200).json(tickets)
        }).catch(err => next(err))
    },
    getById(req, res, next){
        Ticket.findById(req.params._id).populate({path:'showing', populate: {path:'room', populate:{path: 'location'}}}).populate({path:'showing', populate: {path:'film'}}).exec().then(ticket => {
            if(!ticket){
                res.status(404).json({})
                return
            }
            try {
                ticket = ticket.toObject()
                ticket.url = req.protocol+"://"+req.get('host')+"/api/tickets/"+ticket._id
                ticket.showing.url = req.protocol+"://"+req.get('host')+"/api/showings/"+ticket.showing._id
                ticket.showing.tickets_url = req.protocol+"://"+req.get('host')+"/api/tickets/showing/"+ticket.showing._id
                ticket.showing.film.url = req.protocol+"://"+req.get('host')+"/api/films/"+ticket.showing.film._id
                ticket.showing.room.url = req.protocol+"://"+req.get('host')+"/api/rooms/"+ticket.showing.room._id
                ticket.showing.room.location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+ticket.showing.room.location._id
                ticket.showing.room.location.rooms_url = req.protocol+"://"+req.get('host')+"/api/rooms/location/"+ticket.showing.room.location._id
                ticket.showing.room.location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+ticket.showing.room.location._id
            }
            catch(e){
                res.status(404).json({})
                return
            }
            res.status(200).json(ticket)
        }).catch(err => next(err))
    },
    post(req,res,next){
        const newTicket = new Ticket(req.body, {})
        Ticket.find({row: req.body.row, column: req.body.column, showing: req.body.showing})
        .then(tickettesresult => {
            if(tickettesresult.length===0){
                newTicket.save().then(result => {
                    res.status(201).json({"message":"succes","createdObject":result})
                }).catch(err => next(err))
            } else {
                res.status(409).json({"message":"This seat has already been taken"})
            }
        })
        
    },
    update(req, res, next){
        Ticket.findByIdAndUpdate(req.params._id,req.body).then(result => {
            res.status(204).json({})
        }).catch(err => next(err))
    },
    delete(req,res,next){
        Ticket.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({})
                return
            }
            res.status(200).json({message:"succes",deletedObject: result})
        }).catch(err => next(err))
    }
}
