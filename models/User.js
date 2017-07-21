const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', function (next) {
  var user = this

   // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // hash the password
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // Override the cleartext password with the hashed one
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
