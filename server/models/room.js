const mongoose = require('../config/db')

const Schema = mongoose.Schema
const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A room name is required'],
        minlength: [1, 'Length of the roomname has to be at least 1 character'],
        maxlength: [30, 'Room name can not be longer than 30 characters']
    },
    rows: {
        type: Number,
        required: [true, 'Amount of rows is required'],
        min: [1, 'There has to be at least 1 row'],
        max:[200, 'A maximum of 200 rows is allowed']
    },
    columns: {
        type: Number,
        required:[true, 'Amount of rows columns required'],
        min: [1,'There has to be at least 1 column'],
        max: [200, 'There can not be more than 200 columns']
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'A existing location is required']
    }
})
const Room = mongoose.model('Room', roomSchema)

module.exports = {
    Room
}