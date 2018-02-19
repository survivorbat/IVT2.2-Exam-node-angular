const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    subtitle: {
        type: String,
        required: false
    },
    directors: {
        type: [String],
        required: true,
        minlength: 1
    },
    writers: {
        type: [String],
        required: false,
        default:[]
    },
    stars: {
        type: [String],
        required: false,
        default: []
    },
    popularity: {
        type: Number,
        min: 1,
        max: 10
    },
    coverPicture: {
        type: String,
        required:false
    },
    year: {
        type: String,
        required: true,
        min: 1800,
        max:2100
    },
    duration: {
        type: String,
        required: true,
        min: 5,
        max: 400
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1000
    },
    genre: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    }
});
const Film = mongoose.model('Film', filmSchema);

module.exports = {
    Film
};