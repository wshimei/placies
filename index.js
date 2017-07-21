// all the modules we install and need to require
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const hbars = require('express-handlebars')
const bodyParser = require('body-parser')

// express itself
const app = express()

const url = process.env.URI || 'mongodb://localhost:27017/placies'
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
// listens to json submission
app.use(bodyParser.json())
// listens to data submission -form
app.use(bodyParser.urlencoded({extended: true}))

// setup all files that the project needs to require
const placesRoute = require('./routes/placeRoute')
const usersRoute = require('./routes/userRoute')

app.get('/', function (req, res) {
  res.render('home')
})

// setup the routes
app.use('/places', placesRoute)
app.use('/users', usersRoute)

// opening the port
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log(`express is running on port ${port}`)
})
