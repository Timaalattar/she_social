const express = require('express')
const router = express.Router()
const confirmedController = require('../controllers/confirmed')

//confirming for an event
router.post('/events/:eventId/confirmed', confirmedController.confirmed_create_post)

//View list of events you confirmed to
router.get('/users/:userId/confirmed', confirmedController.confirmed_details_get)

//delete detail confrimaton
router.delete('/users/confirmed/:confirmedId', confirmedController.confirmed_delete)

//list all event attendees
router.get('/events/:eventId/confirmed', confirmedController.confirm_search_get)

module.exports = router
