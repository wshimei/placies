const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please type your name']
  },
  email: {
    type: String,
    required: [true, 'please type your email']
  },
  password: {
    type: String,
    required: [true, 'please type your password']
  },
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }]
})

module.exports = mongoose.model('User', userSchema)
