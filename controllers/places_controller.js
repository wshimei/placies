const Place = require('../models/Place')

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
    res.render('places/index', {
      places: allPlaces
    })
  })
}

function show (req, res) {
  Place.findOne({_id: req.params.id})
        .populate('users')
        .exec(function (err, foundPlace) {
          if (err) res.send(err)
          res.render('places/show', {place: foundPlace})
        })
}

module.exports = {
  create,
  list,
  show
}
