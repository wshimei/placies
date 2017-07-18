const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

router.get('/', placesController.list)

module.exports = router
