const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    showing: {
        type: Schema.Types.ObjectId,
        ref: 'Showing',
        required: true
    },
    row: {
        type: Number,
        required: true,
        min: 1,
        max: 200
    },
    column: {
        type: Number,
        required:true,
        min: 1,
        max: 200
    },
    userid: {
        type: Number,
        required: true
    }
});
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
    Ticket
};