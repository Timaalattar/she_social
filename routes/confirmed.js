const express = require('express')
const router = express.Router()
const confirmedController = require('../controllers/confirmed')

//confirming for an event
router.post('/users/events/:eventid', confirmedController.confirmed_create_post)

//View list of confirmations
router.get('/user/:userid/confirmed', confirmedController.confirmed_details_get)

//update confirmation
router.put('/user/:userid/confirmed/:confirmedid', confirmedController.confirmed_update_put)

//delete detail confrimaton
router.delete('/user/:userid/confirmed/:confirmedid', confirmedController.confirmed_delete)

//list all event attendees
router.get('/users/events/:eventid', eventsController.confirm_search_get)