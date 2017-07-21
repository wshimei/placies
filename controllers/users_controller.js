const User = require('../models/User')
const Place = require('../models/Place')

// const bcrypt = require('bcrypt')

// getting all places straight from google api
// const request = require('request')
//
// const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
// const qString = `query=hotels in singapore`
// const apiKey = '&key=AIzaSyDD5x1McH5fSk3kUJu3VKpwax7oXiBjF4s'
//
// request(`${apiurl}${qString}${apiKey}`, function (err, response, body) {
//   if (err) res.send(err)
//
//   var data = JSON.parse(body)
//
//   res.render('users/new', {
//     places: data.results
//   })
// })

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
    password: req.body.user.password,
    places: req.body.places
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
    newUser.save()
  })

  for (var i = 0; i < newUser.places.length; i++) {
    Place.findOne({_id: newUser.places[i]}, function (err, foundPlace) {
      if (err) res.send(err)

      foundPlace.users.push(newUser)
      foundPlace.save()
    })
  }
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
