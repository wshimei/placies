const Place = require('../models/place')

function create (req, res) {
  var newPlace = new Place({
    name: req.body.name,
    address: req.body.address,
    reference: req.body.reference
  })

  newPlace.save(function (err, data) {
    if (err) res.send(err)
    res.send('new place created')
  })
}

function list (req, res) {
  Place.find({}, function (err, allPlaces) {
    if (err) {
      console.log(err)
      return
    }
    res.render('places', {
      places: allPlaces
    })
  })
}

module.exports = {
  create,
  list
}
