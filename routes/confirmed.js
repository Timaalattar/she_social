const express = require('express')
const router = express.Router()
const confirmedController = require('../controllers/confirmed')

//confirming for an event
router.post('/users/confirmed', confirmedController.confirmed_create_post)

//View list of confirmations
router.get('/user/confirmed/:confirmedid', confirmedController.confirmed_details_get)

//delete detail confrimaton
router.delete('/user/confirmed/:confirmedid', confirmedController.confirmed_delete)

//list all event attendees
router.get('/users/events/:eventid', confirmedController.confirm_search_get)

module.exports = router
