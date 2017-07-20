$(function () {
  const $newUserForm = $('#newUserForm')

  $newUserForm.on('submit', function (e) {
    e.preventDefault()
    $newUserForm.addClass('hidden')

    var $formData = $(this).serializeArray()

    var newUser = {
      user: {
        name: $formData[0].value,
        email: $formData[1].value,
        password: $formData[2].value
      },
      place: $formData[3].value
    }

    $.ajax({
      url: '/users',
      type: 'post',
      data: JSON.stringify(newUser),
      dataType: 'json',
      contentType: 'application/json',
      success: function (output) {

      }
    })

    const $userList = $('#userList')
    const $register = $('#register')
    $register.html(`Hi ${newUser.user.name}! Thanks for Joining!`)
    $userList.append($register)

    // $.post('/users', newUser).done(function (output) {
    // })
  })
})
