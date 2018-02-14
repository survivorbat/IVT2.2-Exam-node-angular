const mongoose = require('../config/db');
const { filmSchema } = require('./film');
const { roomSchema } = require('./room');

const Schema = mongoose.Schema;
const showingSchema = new Schema({
    film: {
        type: filmSchema,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    room: {
        type: roomSchema,
        required: true,
    },
    specialties: {
        type: [String]
    },
    price: {
        type: Number,
        default: 5.00
    },
    ticketSold: {
        type: Number,
        default: 0
    }
});

const Showing = mongoose.model('Showing', showingSchema);

module.exports = {
    showingSchema,
    Showing
};