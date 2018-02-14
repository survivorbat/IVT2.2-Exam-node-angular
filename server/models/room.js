const mongoose = require('../config/db');
const {locationSchema} = require('./location');

const Schema = mongoose.Schema;
const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required:true
    },
    location: {
        type: locationSchema,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});
const Room = mongoose.model('Room', roomSchema);

module.exports = {
    roomSchema,
    Room
};