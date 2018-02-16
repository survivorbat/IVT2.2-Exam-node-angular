const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    street: {type: String, required:true}, 
    zip: {type: String, required:true}, 
    city: {type: String, required:true}, 
    state: {type: String, required:true}, 
    number: {type: Number, required:true},
    country: {
        type: String,
        required: true
    }
});
const Location = mongoose.model('Location', locationSchema);

module.exports = {
    Location
};