const mongoose = require('mongoose')

var placeSchema = new mongoose.Schema({
  name: String,
  address: String,
  reference: String
})

// mongoose.model(<singular form>, model)
const Place = mongoose.model('Place', placeSchema)

module.exports = Place
