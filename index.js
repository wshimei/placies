// all the modules we install and need to require
const mongoose = require('mongoose')
const express = require('express')
const hbars = require('express-handlebars')

// express itself
const app = express()

const url = 'mongodb://localhost:27017/placies'
mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)
app.use(express.static('public'))

app.engine('handlebars', hbars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setup all files that the project needs to require
const placesRoute = require('./routes/placeRoute')

// setup the routes
app.use('/places', placesRoute)

// opening the port
const port = 5000
app.listen(port, function () {
  console.log(`express is running on port ${port}`)
})
