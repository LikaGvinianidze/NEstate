var Organization = function () {
/*
  Private Functions
*/

  var isValid = function (form) {
    form.validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        director: {
          required: true,
          minlength: 2
        },
        identity_number: {
          required: true,
          number: true
        },
        phone: {
          minlength: 9,
          maxlength: 9
        }
      }
    });

    // return true
    return form.valid() ? true : false;
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
    $('#add_org_btn').click(function (e) {
      e.preventDefault();
      var form = $('#add_org_form');

      if (!isValid(form, true)) {
        return;
      }

      $.ajax({
        type: 'POST',
        url: '/organizations/create',
        async: false,
        cache: false,
        data: form.serialize(),
        success: function (response, status, xhr, $form) {
          location.href = '/organizations';
        },
        error: function (error, status, xhr, $form) {
          console.log(error)
          showMessage(error.responseJSON);
        }
      });
    })
  }

  var update = function () {
    $('#update_org_btn').click(function (e) {
      e.preventDefault();
      var form = $('#update_org_form');

      if (!isValid(form, false)) {
        return;
      }

      $.ajax({
        type: 'PUT',
        url: location.pathname,
        async: false,
        cache: false,
        data: form.serialize(),
        success: function (response, status, xhr, $form) {
          location.href = '/organizations';
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
    $("#tel_input").on("keypress keyup blur", function (event) {
      var charCode = (event.which) ? event.which : event.keyCode
      if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
      return true;
    });
  }

  return {
    init: function () {
      create();
      update();
      remove();
      telInput();
    }
  }
}()

jQuery(document).ready(function () {
  Organization.init();
});