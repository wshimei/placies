/* global $ */
$(function () {
  const $placeSearch = $('#placeSearch')
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const apiKey = '&key=AIzaSyB5C7u0uu4AcwuXbsOboP-CZA-pgPdMIDs'

  $placeSearch.on('submit', function (e) {
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var qString = `query=${keywordObj[0].value}`
    var finalUrl = `https://crossorigin.me/${apiurl}${qString}${apiKey}`

    $.get(finalUrl).done(function (data) {
      var resultJSON = data.results
      var $searchResult = $('#search-result')
      resultJSON.forEach(function (place) {
        var $newLi = $('<li>')
        $newLi.html(place.name)
        $searchResult.append($newLi)
      })
    })
  })
})
