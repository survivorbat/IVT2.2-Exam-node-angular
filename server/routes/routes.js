const express = require('express')
const routes = express.Router()

const filmcontroller = require('../controllers/ctrl_film')
const ticketcontroller = require('../controllers/ctrl_ticket')
const showingcontroller = require('../controllers/ctrl_showing')
const locationcontroller = require('../controllers/ctrl_location')
const roomcontroller = require('../controllers/ctrl_room')

routes.post('/films/', filmcontroller.post)
routes.delete('/films/:_id', filmcontroller.delete)
routes.patch('/films/:_id', filmcontroller.update)

routes.post('/showings/', showingcontroller.post)
routes.delete('/showings/:_id', showingcontroller.delete)
routes.patch('/showings/:_id', showingcontroller.update)

routes.post('/locations/', locationcontroller.post)
routes.delete('/locations/:_id', locationcontroller.delete)
routes.patch('/locations/:_id', locationcontroller.update)

routes.post('/rooms/', roomcontroller.post)
routes.delete('/rooms/:_id', roomcontroller.delete)
routes.patch('/rooms/:_id', roomcontroller.update)

routes.get('/locations/', locationcontroller.getAll)
routes.get('/locations/:_id', locationcontroller.getById)

routes.get('/rooms/', roomcontroller.getAll)
routes.get('/rooms/:_id', roomcontroller.getById)
routes.get('/rooms/location/:_id', roomcontroller.getByLocation)

routes.get('/showings/', showingcontroller.getAll)
routes.get('/showings/:_id', showingcontroller.getById)
routes.get('/showings/location/:_id', showingcontroller.getByLocation)

routes.get('/tickets/', ticketcontroller.getAll)
routes.get('/tickets/user/:_id', ticketcontroller.getByUser)
routes.get('/tickets/:_id', ticketcontroller.getById)
routes.get('/tickets/showing/:_id', ticketcontroller.getByShowing)
routes.post('/tickets/', ticketcontroller.post)
routes.delete('/tickets/:_id', ticketcontroller.delete)

routes.get('/films/', filmcontroller.getAll)
routes.get('/films/:_id', filmcontroller.getById)

module.exports = routes