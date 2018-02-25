const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength:1,
        maxlength: 15
    },
    rows: {
        type: Number,
        required: true,
        min: 1,
        max:200
    },
    columns: {
        type: Number,
        required:true,
        min:0,
        max:200
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});
const Room = mongoose.model('Room', roomSchema);

module.exports = {
    Room
};