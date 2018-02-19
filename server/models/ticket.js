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
        required: true
    },
    column: {
        type: Number,
        required:true
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