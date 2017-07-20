const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

router.get('/', placesController.list)
router.post('/', placesController.create)
router.get('/:id', placesController.show)

module.exports = router
