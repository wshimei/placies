const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/', usersController.list)
router.post('/', usersController.create)
router.get('/new', usersController.newUser)

module.exports = router
