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
const Film = mongoose.model('Film', filmSchema);

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    street: {type: String, required:true}, 
    zip: {type: String, required:true}, 
    city: {type: String, required:true}, 
    state: {type: String, required:true}, 
    number: {type: Number, required:true}, 
});
const Location = mongoose.model('Location', locationSchema);

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required:true
    },
    location: {
        type: locationSchema,
        required: true
    }
});
const Room = mongoose.model('Room', roomSchema);

const showingSchema = new Schema({
    film: {
        type: filmSchema,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    room: {
        type: roomSchema,
        required: true,
    },
    specialties: {
        type: [String]
    },
    price: {
        type: Number,
        default: 5.00
    },
    ticketSold: {
        type: Number,
        default: 0
    }
});

const Showing = mongoose.model('Showing', showingSchema);

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
    mongoose,
    Film,
    Location,
    Room,
    Ticket,
    Showing
}