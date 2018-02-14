const mongoose = require('../config/db');

const Schema = mongoose.Schema;
const filmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false,
        default: ""
    },
    directors: {
        type: [String],
        required: true,
        default: []
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
        required: false,
        default: 0
    },
    coverPicture: {
        type: String,
        required:false,
        default: ""
    },
    year: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: String
});
const Film = mongoose.model('Film', filmSchema);

module.exports = {
    filmSchema,
    Film
};