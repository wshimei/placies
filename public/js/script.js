/* global $ */
$(function () {
  const $placeSearch = $('#placeSearch')
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const apiPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400'
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

        var photoRef = `&photoreference=${place.photos[0].photo_reference}`
        var $newImg = $('<img>')
        $newImg.attr({
          src: `${apiPhoto}${photoRef}${apiKey}`,
          alt: place.name
        })
        $searchResult.append($newImg)

        console.log()
      })
    })
  })
})
