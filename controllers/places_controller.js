const Place = require('../models/place')

function create (req, res) {
  var newList = new Place({
    name: req.body.name,
    address: req.body.address,
    reference: req.body.reference
  })

  newList.save(function (err, data) {
    if (err) throw err

    res.send('new place created')
  })
}

function list (req, res) {
  // Places.find({}, function (err, places) {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
  res.render('places')
  // })
}

module.exports = {
  create,
  list
}
