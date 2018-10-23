var ContactSetting = function() {

  /*
    Private Functions
  */

  $.data = {
    source: [],
    contact_status: {},
    constact_type: {}
  }

  var inputs = {
    common: {
      firstname: {
        type: 'text',
        info:''
      },
      lastname: {
        type: 'text',
        info: ''
      },
      birth_date: {
        type: 'text',
        info: 'დაბადების თარიღი'
      },
      contact_person: {
        type: 'text',
        info: 'საკონტაქტო პირი'
      },
      phone: {
        type: 'text',
        info: 'საკონტაქტო ნომერი'
      },
      email: {
        type: 'email',
        info: 'ელ-ფოსტა'
      },
      comment: {
        type: 'textarea',
        info: 'კომენტარი'
      },
      source: {
        type: 'select',
        info: 'წყარო'
      },
      user: {
        type: 'select',
        info: 'აირჩიეთ მომხმარებელი'
      }
    },
    legal: {
      org_name: {
        type: 'text',
        info: 'ორგანიზაციის დასახელება'
      }
    },
    physical: {
      
    }
  }

  var createSelect = function (info) {

  }

  var createTextArea = function (info) {

  }

  var buildInputsView = function(inputs) {
    var view = '';
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        if (inputs[key].type === 'select') {
          createSelect(inputs[key].info);
        } else if (inputs[key].type === 'textarea') {
          createTextArea(inputs[key].info);
        } else {
          view += '<div class="form-group m-form__group row">' +
          `<label class="col-lg-2 col-form-label">${inputs[key].info}</label>` +
          '<div class="col-lg-5">' +
          `<input type="${inputs[key].type}" name="${key}" autocomlete="off" class="form-control m-input">` +
          '</div> </div>';
        }
      }
    }

    return view;
  }

  /*
    Public Functions
  */

  var onTypeChange = function () {
    $('#contact_type').on('change', function () {
      var value = $('#contact_type option:selected').attr('reference');
      var properInputs = {};
      var inputsView = '';

      if (!value) {
        return;
      }

      switch (value) {
        case 'physical_person': properInputs = {
          ...inputs.common,
          firstname: {
            type: 'text',
            info: 'კლიენტის სახელი'
          },
          lastname: {
            type: 'text',
            info: 'კლიენტის გვარი'
          },
          ...inputs.physical
        }; delete properInputs.contact_person; break;
        case 'legal_person': properInputs = {
          org_name: {
            ...inputs.legal.org_name
          },
          ...inputs.common,
          firstname: {
            type: 'text',
            info: 'დირექტორის სახელი'
          },
          lastname: {
            type: 'text',
            info: 'დირექტორის გვარი'
          }
        }; delete properInputs.birth_date; break;
        default: break;
      }

      inputsView = buildInputsView(properInputs);

      $('#contact_inputs').html(inputsView);
    });
  }

  return {
    init: function() {
      onTypeChange();
    }
  }
}();

$(document).ready(function() {
  ContactSetting.init();
});
