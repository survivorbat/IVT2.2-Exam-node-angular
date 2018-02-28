const {Location} = require('../models/location')
const {Room} = require('../models/room')
const {Ticket} = require('../models/ticket')
const {Showing} = require('../models/showing')

module.exports = {
    getAll(req, res, next){
        Location.find().then(locations => {
            if(!locations){
                res.status(200).json([])
                return
            }
            locations = locations.map(location => {
                location = location.toObject()
                location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+location._id
                location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+location._id
                return location
            })
            res.status(200).json(locations)
        }).catch(err => next(err))
    },
    getById(req, res, next){
        Location.findOne({_id: req.params._id}).then(location => {
            if(!location){
                res.status(404).json({})
                return
            }
            location = location.toObject()
            location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+location._id
            location.showings_url = req.protocol+"://"+req.get('host')+"/api/showings/location/"+location._id
            res.status(200).json(location)
        }).catch(err => next(err))
    },
    post(req,res,next){
        const newLocation = new Location(req.body, {})
        newLocation.save().then(result => {
            res.status(201).json({"message":"succes","createdObject": result})
        }).catch(err => next(err))
    },
    update(req, res, next){
        Location.findByIdAndUpdate(req.params._id,req.body).then((result) => {
            res.status(204).json({})
        }).catch(err => next(err))
    },
    delete(req,res,next){
        Ticket.find({"showing.room.location": req.params._id}).remove().exec().catch()
        Showing.find({"room.location": req.params._id}).remove().exec().catch()
        Room.find({"location": req.params._id}).remove().exec().catch()
        Location.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({})
                return
            }
            res.status(200).json({message:"success",deletedObject: result})
        }).catch(err => next(err))
    }
}
