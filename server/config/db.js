const mongoose = require('mongoose');
const config = require('../config/config'); 
require('dotenv').config();

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

const timeout = 1000;


const tryConnect = () => {
    mongoose.connect(process.env.DB_HOST || config.DB_HOST, options, (error) => {
        if(error){
            console.log("Error connecting to ",process.env.DB_HOST || config.DB_HOST, error);
            setTimeout(() => {
                this.tryConnect();
            },timeout);
        } else {
            console.log("Succesfully connected to ",process.env.DB_HOST || config.DB_HOST);
        }
    });
}

module.exports = {
    tryConnect,
    mongoose
}