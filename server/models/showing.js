const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const showingSchema = new Schema({
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    specialties: {
        type: [String]
    },
    price: {
        type: Number,
        default: 5.00
    }
});

const Showing = mongoose.model('Showing', showingSchema);

module.exports = {
    showingSchema,
    Showing
};