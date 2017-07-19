$(function () {
  const $placeSearch = $('#placeSearch')
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const apiPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
  const apiKey = '&key=AIzaSyDD5x1McH5fSk3kUJu3VKpwax7oXiBjF4s'
  const $spinner = $('#spinner')

  $placeSearch.on('submit', function (e) {
    e.preventDefault()
    $spinner.fadeIn()

    var keywordObj = $(this).serializeArray()
    var qString = `query=${keywordObj[0].value}`
    var finalUrl = `https://crossorigin.me/${apiurl}${qString}${apiKey}`

    $.get(finalUrl).done(function (data) {
      $spinner.fadeOut()

      var $searchResult = $('#search-result')

      if ($searchResult.find('li').length) {
        $searchResult.html('')
      }

      var resultJSON = data.results
      resultJSON.forEach(function (place) {
        var $newLi = $('<li>')
        $newLi.html(place.name)
        $searchResult.append($newLi)

        var photoRef = ''
        if (!place.photos) {
          photoRef = ''
        } else {
          photoRef = place.photos[0].photo_reference
        }

        var $newImg = $('<img>')
        $newImg.attr({
          src: `${apiPhoto}${photoRef}${apiKey}`,
          alt: place.name
        })
        $searchResult.append($newImg)

        var $newP = $('<p>')
        var $newBtn = $(`<button data-name="${place.name}" data-address="${place.formatted_address}" data-reference="${photoRef}">Add to List</button>`)

        $newP.append($newBtn)
        $searchResult.append($newP)

        $newBtn.on('click', function (e) {
          e.preventDefault()
          var $addedList = $('#added-list')

          var newPlace = {
            name: $(this).data('name'),
            address: $(this).data('address'),
            reference: $(this).data('reference')
          }

          $.post('/places', newPlace).done(function (data) {
            console.log(data)
            $newLi.html(newPlace.name)
            $addedList.append($newLi)
          })
        })
      })
    })
  })
})
