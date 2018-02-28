const mongoose = require('../config/db')

const Schema = mongoose.Schema
const showingSchema = new Schema({
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film',
        required: [true, 'An existing film is required']
    },
    date: {
        type: Date,
        required: [true, 'A date is required'],
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'An existing room is required'],
    },
    specialties: {
        type: [String],
        default: []
    },
    price: {
        required: [true, 'A price is required'],
        type: Number,
        min: [1.00, 'Price has to be higher than 1 euro'],
        max: [100.00, 'Price can not be higher than 100 euros']
    }
})

const Showing = mongoose.model('Showing', showingSchema)

module.exports = {
    Showing
}