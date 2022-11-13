const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events')

//Creating a new event
router.post('/users/:userid/events', eventsController.event_create_post)

//View event details
router.get('/events/:eventId', eventsController.event_details_get)

//update event
router.put('/events/:userId', eventsController.event_update_put)

//delete event
router.delete('/events/:eventId', eventsController.event_delete)

//search for events
router.get('/events/:category', eventsController.event_search_get)
