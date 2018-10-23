var Edit = function () {

  /*
    Private Functions
  */

  /*
    Public Functions
  */

  var setRefs = function () {
    $("#edit_state_type > option").each(function() {
      switch (this.text) {
        case 'ბინა': $(this).attr('reference', 'flat'); break;
        case 'კერძო სახლი': $(this).attr('reference', 'house'); break;
        case 'სასტუმრო': $(this).attr('reference', 'hotel'); break;
        case 'კომერციული ფართი': $(this).attr('reference', 'comercial'); break;
        case 'მიწის ნაკვეთი': $(this).attr('reference', 'land'); break;
      }
    });
  }

  var onExchangeChange = function () {
    $('#edit_exchange').change(function () {
      if(!this.checked) {
        $('#exchange_div').hide();
        $("#exch_select").val($("#exch_select option:first").val()).selectpicker('refresh');
      } else {
        $('#exchange_div').show();
      }
    });
  }

  var onAreaFeatureCheck = function () {
    $('.check').on('click', function() {
      if(this.checked) {
        $(this).parents('div.some').find('div.input').show();
        var inputHTML = '<div>' +
        `<input type="number" name="${this.name}_area" placeholder="ფართი (მ²)" class="form-control m-input">` +
        '</div>';
        $(this).parents('div.some').find('div.input').html(inputHTML);
      } else {
        $(this).parents('div.some').find('div.input').empty();
      }
    });
  }

  var onSelectFeatureCheck = function () {
    $('.select').on('click', function() {
      $(this).parents('div.some').find('div.sel-features').show();
      if(this.checked) {
        $.buildSelectInput(this);
      } else {
        $(this).parents('div.some').find('div.sel-features').empty();
      }
    });
  }

  var onStateTypeChage = function () {
    $('#edit_state_type').change(function () {
      var ref = $('#edit_state_type option:selected').attr('reference');

      /*
        Show/Hide some detail info fields
      */

      switch (ref) {
        case 'hotel': 
          $('#project_div').hide();
          $("#proj_select").val($("#proj_select option:first").val()).selectpicker('refresh');
          break;
        case 'comercial':
          $('#bedrooms').hide();
          $('#project_div').hide();
          $("#proj_select").val($("#proj_select option:first").val()).selectpicker('refresh');
          $('#bedrooms input').val('');
        case 'land': break;
        default:
          $('#project_div').show();
          $('#bedrooms').show();

        
      }

      /*
        Show/Hide flat type div
      */

      $('#edit_flat_type').empty();
      if (ref === 'flat' || ref === 'hotel' || ref === 'comercial') {
      $('#edit_flatType_div').show();
      $.buildOPtions($.unitOptions.flatType, 'edit_flat_type');
      } else {
        $('#edit_flatType_div').hide();
      }

      $('#edit_status').empty();
      if ($.unitOptions.status[ref]) {
        $('#edit_status_div').show();
        $.buildOPtions($.unitOptions.status[ref], 'edit_status');
      } else {
        $('#edit_status').selectpicker('refresh');
        $('#edit_status_div').hide();
      }
    });
  }

  return {
    init: function () {
      setRefs();
      onStateTypeChage();
      onExchangeChange();
      onSelectFeatureCheck();
      onAreaFeatureCheck();
    }
  }

}();

$(document).ready(function () {
  Edit.init();
});