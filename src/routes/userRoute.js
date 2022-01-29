const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users' ,userController.registerUser )
router.post('/login' , userController.login)


module.exports = router