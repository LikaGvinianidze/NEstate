var Dinamyc = function () {

  /*
    Private Functions
  */

  $.buildSelectInput = function (target) {
    var name = target.id || target.name;
    var styles = 'selectpicker bootstrap-select form-control m-bootstrap-select';
    var $select = $('<select/>', {
      'class': styles,
      'id': `${name}_option`,
      'name': `${name}`
    });

    $(target).parents('div.some').find('div.sel-features').empty();
    $select.appendTo($(target).parents('div.some').find('div.sel-features')).selectpicker('refresh');

    $.buildOPtions($.unitOptions[name], `${name}_option`);
  }

  var render = function (view) {
    var url = '/states/create/render-features';

    $.ajax({
      url: url,
      type: 'GET',
      data: {view: view},
      success: function (response) {
        $('#for_features').html(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  var setChildren = function (villages) {
    var styles = 'bootstrap-select form-control m-bootstrap-select m-select2';
    var $select = $('<select/>', {
      'class': styles,
      'id': 'm_select2_14',
      'name': 'village'
    });

    villages.forEach(function(village){
      $select.append(`<option value="${village.id}">${village.name}</option>`);
    });

    $(`#children`).empty();
    $select.appendTo(`#children`).selectpicker('refresh');
  }

  /*
    Public Functions
  */

  var onAreaFeatureCheck = function () {
    $('#for_features').on('click', '.check', function() {
      if(this.checked) {
        var inputHTML = '<div class="">' +
        `<input type="number" name="${this.name}_area" placeholder="ფართი (მ²)" class="form-control m-input">` +
        '</div>';
        $(this).parents('div.some').find('div.input').html(inputHTML);
      } else {
        $(this).parents('div.some').find('div.input').empty();
      }
    });
  }

  var onSelectFeatureCheck = function () {
    $('#for_features').on('click', '.select', function() {
      if(this.checked) {
        $.buildSelectInput(this);
      } else {
        $(this).parents('div.some').find('div.sel-features').empty();
      }
    });
  }

  var onExchangeCheck = function () {
    $('#exchange').change(function() {
      if(this.checked) {
        $.buildSelectInput(this);
      } else {
        $(this).parents('div.some').find('div.sel-features').empty();
      }
    });
  }

  var onStateTypeChange = function () {
    $('#state_type').change(function () {
      var ref = $('#state_type option:selected').attr('reference');
      var opt = $('#transaction_type option:contains("ქირავდება")');
      if (ref === 'land') {
        render('land');

        opt.hide();
        $('#for_common').hide();
        $('#flatType_div').hide();

        $('#status').empty();
        $.buildOPtions($.unitOptions.status[ref], 'status');

        $('#transaction_type').selectpicker('refresh');
      } else {
        render('common');

        opt.show();
        $('#for_common').show();

        $('#status').empty();

        // Show or hide flat type
        if (ref === 'flat') {
          $.buildOPtions($.unitOptions.flatType, 'flat_type');
          $('#flatType_div').show();
          $('#project_div').show();
          $('#bedrooms').show();
        } else if (ref === 'hotel') {
          $("#m_select2_12").val($("#m_select2_12 option:first").val());
          $("#m_select2_12").selectpicker('refresh');
          $('#project_div').hide();
        } else if (ref === 'comercial') {
          $('#project_div').hide();
          $('#bedrooms').hide();
          $("#bedrooms input").val('');
        } else {
          $('#flatType_div').hide();
          for (let i = 0; i < 3; i++) {
            if ($('#flat_type > option').length !== 0)
              $('#flat_type').find("option:last-child").remove();
              $('#flat_type').selectpicker('refresh');
          }
          $('#project_div').show();
          $('#bedrooms').show();
        }

        if ($.unitOptions.status[ref]) {
          $('#status_div').show();
          $.buildOPtions($.unitOptions.status[ref], 'status');
        } else {
          $('#status').selectpicker('refresh');
          $('#status_div').hide();
        }

        $('#transaction_type').selectpicker('refresh');
      }
    });
  }

  var onTransactionTypeChange = function () {
    $('#transaction_type').unbind('change').change(function () {
      var txt = $('#transaction_type option:selected').text().trim();
      var opt = $('#state_type option[reference="land"]');

      if (txt === 'ქირავდება' || txt === 'ქირავდება დღიურად') {
        opt.hide();
        $('#state_type').selectpicker('refresh');
        return;
      } else {
        opt.show();
        $('#state_type').selectpicker('refresh');
        return;
      }
    });
  }

  var onMunicipalitySelect = function () {
    $('#m_select2_1').unbind('change').change(function () {
      var id = $(this).val();
      var isCity = $('option:selected', this).attr('iscity');

      $.ajax({
        url: `/states/create/get-villages?municipality=${id}`,
        type: 'GET',
        success: function (result) {
          if (result.length > 0) {
            if (isCity) {
              $('#children_div').show();
              $('#street').show();
            } else {
              $('#children_div').show();
              $('#street').hide();
            }
            // Set options to villages/districts select field
            setChildren(result);
          } else {
            if (isCity) {
              $('#street').show();
            } else {
              $('#street').hide();
            }
            // Clear villages/districts select options
            $('#m_select2_14').empty();
            $('#children_div').hide();
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  }

  return {
    init: function () {
      onStateTypeChange();
      onTransactionTypeChange();
      onAreaFeatureCheck();
      onSelectFeatureCheck();
      onExchangeCheck();
      onMunicipalitySelect();
    }
  }

}();

$(document).ready(function () {
  Dinamyc.init();
});