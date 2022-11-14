const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//Creating a new user)
router.post('/users', usersController.user_create_post)

//User Login 
router.post('/users/login', usersController.user_login_post)

//View user details
router.get('/users/:userId', usersController.user_details_get)

//update user
router.put('/users/:userId', usersController.user_update_put)

//delete user route
router.delete('/users/:userId', usersController.user_delete)

module.exports = router