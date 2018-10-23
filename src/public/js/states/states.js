var State = function () {

  /*
    Private Functions
  */

  var isValid = function (form) {
    form.validate({
      rules: {
        transaction_type: {
          required: true
        },
        state_type: {
          required: true
        },
        area: {
          required: true,
          number: true
        },
        area_unit: {
          required: true,
          number: true
        },
        price_type: {
          required: true,
          number: true
        },
        price: {
          required: true,
          number: true
        },
        currency: {
          required: true,
          number: true
        },
        municipality: {
          required: true,
          number: true
        }
      }
    });

    return true
    return form.valid() ? true : false;
  }

  function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var data = {};
    var exceptions = ['hotWater','parking','store','heating']
    $.map(unindexed_array, function(n, i) {
      if (exceptions.includes(n['name'])) return;
      data[n['name']] = n['value'];
    });

    data.features = {};

    $('.feature').each(function(){
      if (this.checked === true) {
        if (this.name === 'restrooms_quantity') {
          data.restrooms_quantity = $(this).val();
          return;
        }
        data.features[`${this.name}`] = true;
        delete data[this.name];
      }
    });
    var heating = $('#heating_option option:selected').val();
    var hotWater = $('#hotWater_option option:selected').val();
    var parking = $('#parking_option option:selected').val();
    var store = $('#store_option option:selected').val();

    if (heating) data.features[`${heating}`] = true;
    if (hotWater) data.features[`${hotWater}`] = true;
    if (parking) data.features[`${parking}`] = true;
    if (store) data.features[`${store}`] = true;

    return data;
  }

  /*
    Public Functions
  */

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

  var create = function () {
    $('#add_state_btn').click(function (e) {
      e.preventDefault();
      var form = $('#add_state_form');

      if (!isValid(form)) {
        return;
      }

      var data = getFormData(form);

      $.ajax({
        type: 'POST',
        url: '/states/create',
        async: false,
        cache: false,
        data: data,
        success: function (response, status, xhr, $form) {
          location.href = '/states';
        },
        error: function (error, status, xhr, $form) {
          console.log(error)
          showMessage(error.responseJSON);
        }
      });
    })
  }

  var update = function () {
    $('#update_state_btn').click(function (e) {
      e.preventDefault();
      var form = $('#update_state_form');

      if (!isValid(form)) {
        return;
      }

      var data = getFormData(form);

      $.ajax({
        type: 'PUT',
        url: location.pathname,
        async: false,
        cache: false,
        data: data,
        success: function (response, status, xhr, $form) {
          console.log(response)
          return;
          location.href = '/states';
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
        url: '/states/' + $(this).attr('uid'),
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

  return {
    init: function () {
      create();
      update();
      remove();
    }
  }
}()

jQuery(document).ready(function () {
  State.init();
});