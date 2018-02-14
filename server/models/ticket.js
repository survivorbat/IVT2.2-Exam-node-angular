const mongoose = require('../config/db');
const { showingSchema } = require('./showing');

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    showing: {
        type: showingSchema,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required:true
    }
});
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
    Ticket,
    ticketSchema
};