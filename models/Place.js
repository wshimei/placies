const mongoose = require('mongoose')

var placeSchema = new mongoose.Schema({
  name: String,
  address: String,
  reference: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// mongoose.model(<singular form>, model)
const Place = mongoose.model('Place', placeSchema)

module.exports = Place
