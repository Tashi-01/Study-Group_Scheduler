const express = require('express')

// controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const route = express.Router()

// login route
route.post('/login', loginUser)

// signup route
route.post('/signup', signupUser)

module.exports = route