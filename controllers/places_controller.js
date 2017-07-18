const express = require('express')

function list (req, res) {
  res.render('places')
}

module.exports = {
  list
}
