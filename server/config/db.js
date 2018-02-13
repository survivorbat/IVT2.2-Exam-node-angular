const mongoose = require('mongoose');
require('dotenv').config();

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
};
const timeout = 1000;


mongoose.connect(process.env.DB_HOST, options, (error) => {
    if(error){
        console.log("Error connecting to ",process.env.DB_HOST, error);
    } else {
        console.log("Succesfully connected to ",process.env.DB_HOST);
    }
});

const Schema = mongoose.Schema;
const schema = new Schema({
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
    reviews: {
        type: [Object],
        required: false,
        default: []
    },
    popularity: {
        type: Number,
        required: false,
        default: 0
    },
    media: {
        type: [String],
        required: false,
        default: []
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
    genre: String
});
const Film = mongoose.model('Film', schema);

module.exports = {
    mongoose,
    Film
}