const Places = require('../models/place')

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
  list
}
