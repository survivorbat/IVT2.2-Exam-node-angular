const {Location} = require('../models/location');
const {Room} = require('../models/room');

module.exports = {
    getAll(req, res, next){
        Location.find((err, locations) => {
            if(err){
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!locations){
                res.status(200).json([]);
                return;
            }
            locations = locations.map(location => {
                location = location.toObject();
                location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+location._id;
                return location;
            });
            res.status(200).json(locations);
        });
    },
    getById(req, res, next){
        Location.findOne({_id: req.params._id},(err, location) => {
            if(err){
                if(err.name="CastError"){
                    res.status(400).json({"errors":"Invalid ID value"});
                    return;
                }
                console.log(err);
                res.status(500).json({"errors":"An error occured"});
                return;
            }
            if(!location){
                res.status(404).json({});
                return;
            }
            location = location.toObject();
            location.url = req.protocol+"://"+req.get('host')+"/api/locations/"+location._id;
            res.status(200).json(location);
        });
    },
    post(req,res,next){
        const newLocation = new Location(req.body, {});
        newLocation.save((err, result) => {
            if(err){
                if(err.name="ValidationError"){
                    res.status(400).json({message: err.message});
                } else {
                    res.status(500).json({"errors":"An error occured"});
                }
                return;
            }
            res.status(201).json({"message":"succes","createdObject": result});
        });
    },
    update(req, res, next){
        Location.findByIdAndUpdate(req.params._id,req.body,(err) => {
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
        Location.findByIdAndRemove(req.params._id, (err, result) => {
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
            Room.find({"location._id": result._id}).remove((err, result) => {
                console.log(result);
            })
            res.status(200).json({message:"success",deletedObject: result});
        });
    }
}
