var User = function () {

  /*
    Private Functions
  */

  var isValid = function (form, isRequired) {
    form.validate({
      rules: {
        firstname: {
          required: true,
          minlength: 2
        },
        lastname: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: isRequired,
          minlength: 4,
          maxlength: 12
        },
        phone: {
          minlength: 9,
          maxlength: 13
        },
        role: {
          required: true
        },
        organization: {
          number: true
        }
      }
    });

    // return true
    return form.valid() ? true : false;
  }

  var addAdmin = function (form) {
    var roles = {}
    var role = $('#user_role').find(':selected').val();

    $("#user_role option").each(function() {
      roles[$(this).val()] = $(this).text();
    });

    if (roles[`${role}`].toLowerCase() === 'admin') {
      form = form.serialize();
      var updatedForm = form.split('&');
      updatedForm.splice(-1,1);
      form = updatedForm.join('&');
      return form;
    }
  }
 

  var showMessage = function (errors) {
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        $.notify(
          errors[key],
          {
            position: 'top right',
            autoHideDelay: 10000,
          },
        );
      }
    }
  }

  /*
    Public Functions
  */

  var create = function () {
    $('#add_user_btn').click(function (e) {
      e.preventDefault();
      var form = $('#add_user_form');
      var adminAddForm = addAdmin(form)
      if (!isValid(form, true)) {
        return;
      } else if (adminAddForm) {
        form = adminAddForm
      } else {
        form = form.serialize();
      }

      $.ajax({
        type: 'POST',
        url: '/users/create',
        async: false,
        cache: false,
        data: form,
        success: function (response, status, xhr, $form) {
          location.href = '/users';
        },
        error: function (error, status, xhr, $form) {
          console.log(error)
          showMessage(error.responseJSON);
        }
      });
    })
  }

  var update = function () {
    $('#update_user_btn').click(function (e) {
      e.preventDefault();
      var form = $('#update_user_form');
      var adminAddForm = addAdmin(form)

      if (!isValid(form, false)) {
        return;
      } else if (adminAddForm) {
        form = adminAddForm
      } else {
        form = form.serialize();
      }

      $.ajax({
        type: 'PUT',
        url: location.pathname,
        async: false,
        cache: false,
        data: form,
        success: function (response, status, xhr, $form) {
          location.href = '/users';
        },
        error: function (error, status, xhr, $form) {
          console.log(error);
          showMessage(error.responseJSON);
        }
      });
    })
  }

  var remove = function () {
    $('#demo').on('click', '.del', function () {
      $.ajax({
        url: '/users/' + $(this).attr('uid'),
        type: 'DELETE',
        success: function (result) {
          // $(`#${id}`).remove();
          location.reload();
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  }

  var telInput = function () {
    $("#tel_input").on("keypress keyup blur",function (event) {    
      var charCode = (event.which) ? event.which : event.keyCode
        if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
        return true;
    });
  }

  var getRoleName = function () {
    var roleName = $('#user_role').find(':selected').text();
    if (roleName.toLowerCase() === 'admin') {
      $('#user_org').hide();
    }

    $('#user_role').on('change', function() {
      var role = $('option:selected', this).text();
      if (role.toLowerCase() === 'admin') {
        $('#user_org').hide();
      } else {
        $('#user_org').show();
      }
    });
  }

  return {
    init: function () {
      create();
      update();
      remove();
      telInput();
      getRoleName();
    }
  }
}()

jQuery(document).ready(function () {
  User.init();
});