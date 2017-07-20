const User = require('../models/user')
const Place = require('../models/place')
// const bcrypt = require('bcrypt')

function list (req, res) {
  User.find({}, function (err, foundUser) {
    if (err) res.send(err)
    // res.send(foundUser)

    res.render('users/index', {
      users: foundUser
    })
  })
}

function create (req, res) {
  // var hash = bcrypt.hashSync(req.body.user.password, 10)
  //
  // res.send({
  //   reqbody: req.body,
  //   hash: hash
  // })

  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  newUser.save(function (err, newUser) {
    if (err) res.send(err)

    res.format({
      html: function () {
        res.send('<p>Hey</p>')
      },
      json: function () {
        res.send('response for ajax')
      }
    })
    newUser.places.push(req.body.place)
    newUser.save()
  })

  Place.findOne({_id: req.body.place}, function (err, foundPlace) {
    if (err) res.send(err)

    foundPlace.users.push(newUser)
    foundPlace.save()
  })
}

function newUser (req, res) {
  User.find({}, function (err, foundUser) {
    if (err) res.send(err)
    // res.send(foundUser)
    Place.find({}, function (err, foundPlaces) {
      if (err) res.send(err)
      res.render('users/new', {
        users: foundUser,
        places: foundPlaces
      })
    })
  })
}

function show (req, res) {
  User.findOne({_id: req.params.id})
      .populate('places')
      .exec(function (err, foundUser) {
        if (err) res.send(err)
        res.render('users/show', {user: foundUser})
      })
}

module.exports = {
  list,
  create,
  newUser,
  show
}
