const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const locationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A location name is required'],
        minlength: [3, 'Name has to be at least 3 characters long'],
        maxlength: [20, 'Name can not be longer than 20 characters'],
        unique: true
    },
    street: {
        type: String, 
        required:[true, 'A streetname is required'],
        minlength:[1, 'Street has to be at least 1 character long'],
        maxlength: [50, 'Street has to be at maximum 50 characters long']
    }, 
    zip: {
        type: String, 
        required:[true, 'Zip is required'],
        minlength: [2, 'Zip has to be at least 2 characters long'],
        maxlength: [20, 'Zip must be shorter than 20']
    }, 
    city: {
        type: String, 
        required:[true, 'A city is required'],
        minlength: [2, 'The city lenght has to be at least 2 characters'],
        maxlength: [50, 'City length has to be shorter than 50 characters']
    }, 
    state: {
        type: String, 
        required:[true, 'State is required'],
        minlength: [2, 'The state lenght has to be at least 2 characters'],
        maxlength: [50, 'State length has to be shorter than 50 characters']
    }, 
    number: {
        type: Number, 
        required:[true, 'Number is required'],
        min:[0, 'House number can not be lower than 0'],
        max:[1000, 'House number can not be higher than 1000']
    },
    country: {
        type: String,
        required: [true, 'Country name is required'],
        maxlength:[100, 'Country name can not be longer than 100 characters']
    }
});
const Location = mongoose.model('Location', locationSchema);

module.exports = {
    Location
};