const mongoose = require('../config/db')

const Schema = mongoose.Schema
const ticketSchema = new Schema({
    showing: {
        type: Schema.Types.ObjectId,
        ref: 'Showing',
        required: [true, 'An existing showing is required']
    },
    row: {
        type: Number,
        required: [true, 'A row number is required'],
        max: [200, 'Row number can not be higher than 200']
    },
    column: {
        type: Number,
        required:true,
        max: [200, 'Column number can not be higher than 200']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    }
})
const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = {
    Ticket
}