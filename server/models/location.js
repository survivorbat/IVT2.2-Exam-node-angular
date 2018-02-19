const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    street: {
        type: String, 
        required:true,
        minlength:1,
        maxlength: 50
    }, 
    zip: {
        type: String, 
        required:true,
        minlength: 2,
        maxlength: 20
    }, 
    city: {
        type: String, 
        required:true,
        minlength: 2,
        maxlength:50
    }, 
    state: {
        type: String, 
        required:true,
        minlength: 2,
        maxlength: 50
    }, 
    number: {
        type: Number, 
        required:true,
        min:0,
        max:1000
    },
    country: {
        type: String,
        required: true,
        minlength:0,
        maxlength:100
    }
});
const Location = mongoose.model('Location', locationSchema);

module.exports = {
    Location
};