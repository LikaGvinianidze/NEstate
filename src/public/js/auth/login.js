//== Class Definition
var SnippetLogin = function () {

  var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="m-alert m-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
    <span></span>\
  </div>');

    form.find('.alert').remove();
    alert.prependTo(form);
    // alert.animateClass('fadeIn animated');
    alert.find('span').html(msg);
  }

  //== Private Functions

  var handleFormSwitch = function () {
    $('#m_signup_login').click(function (e) {
      e.preventDefault();
      top.location.href = '/login';
    });
  }

  var handleSignInFormSubmit = function () {
    $('#m_login_signin_submit').click(function (e) {
      e.preventDefault();
      var btn = $(this);
      var form = $('#login_form')

      form.validate({
        rules: {
          email: {
            required: true,
            email: true
          },
          password: {
            required: true
          }
        }
      });

      if (!form.valid()) {
        return;
      }

      btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', false);

      $.ajax({
        type: 'POST',
        url: '/auth/login',
        async: false,
        cache: false,
        data: form.serialize(),
        success: function (response, status, xhr, $form) {
          location.href = '/states';
        },
        error: function (error, status, xhr, $form) {
          console.log(error);
          btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
          showErrorMsg(form, 'danger', 'არასწორი ელ-ფოსტა ან პაროლი. გთხოვთ სცადოთ თავიდან');
        }
      });

    });
  }

  var displayMessage = function (isSuccess, message) {
    if (isSuccess) {
      $('.m-login__desc').hide()
      $('#info').removeClass('alert alert-danger alert-danger');
      $('#info').addClass('alert alert-info alert-info');
      $('#message_1').html(message);
    } else {
      $('#info').removeClass('alert alert-info alert-info');
      $('#info').addClass('alert alert-danger alert-danger');
      $('#message_1').text(message);
    }
  }

  var handleForgetPasswordFormSubmit = function () {
    $('#m_login_forget_password_submit').click(function (e) {
      e.preventDefault();

      var btn = $(this);
      var form = $(this).closest('form');
      var data = $('#recover_form');
      form.validate({
        rules: {
          email: {
            required: true,
            email: true
          }
        }
      });

      if (!form.valid()) {
        return;
      }

      // btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

      form.ajaxSubmit({
        type: 'POST',
        url: '/recover-password',
        async: false,
        cache: false,
        data: data.serialize(),
        success: function (response) {
          btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false); // remove 
          form.clearForm(); // clear form
          form.validate().resetForm(); // reset validation states
          // display message
          displayMessage(true, 'ახალი პაროლი გაგზავნილია თქვენს ელ-ფოსტაზე');
        },
        error: function (error) {
          console.log(error);
          // display message
          displayMessage(false, error.responseJSON.message);
        }
      });
    });

    $('#m_login_forget_password_cancel').on('click', function (e) {
      e.preventDefault();
      window.location.href = '/login';
    })
  }

  //== Public Functions
  return {
    // public functions
    init: function () {
      handleFormSwitch();
      handleSignInFormSubmit();
      handleForgetPasswordFormSubmit();
    }
  };
}();

//== Class Initialization
jQuery(document).ready(function () {
  SnippetLogin.init();
});

// password check

$('#confirm_password').on('keyup', function () {
  if ($('#password').val() == $('#confirm_password').val()) {
    $('#message').html('').css('color', 'green');
  } else
    $('#message').html('Passwords do not match').css('color', 'red');
});