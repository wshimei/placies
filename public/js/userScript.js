$(function () {
  const $newUserForm = $('#newUserForm')

  $newUserForm.on('submit', function (e) {
    e.preventDefault()

    var $formData = $(this).serializeArray()

    var newUser = {
      user: {
        name: $formData[0].value,
        email: $formData[1].value,
        password: $formData[2].value
      },
      places: []
    }

    for (var i = 3; i < $formData.length; i++) {
      newUser.places.push($formData[i].value)
    }

    $.ajax({
      url: '/users',
      type: 'post',
      data: JSON.stringify(newUser),
      dataType: 'json',
      contentType: 'application/json',
      success: function (output) {
        if (!output.errors) {
          const $register = $('#register')
          $newUserForm.addClass('hidden')
          $register.html(`Hi ${newUser.user.name}! Thanks for Joining!`)
        } else {
          var $flash = $('#flash')
          $flash.text(output.message)
        }
      }
    })

    // $.post('/users', newUser).done(function (output) {
    // })
  })
})
