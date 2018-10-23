var Index = function () {

  /*
    Private Functions
  */

  var setTransactionTypes = function (types) {
    $.buildOPtions(types, 'm_select2_001');
  }

  var setStateTypes = function (types) {
    $.buildOPtions(types, 'm_select2_111');

    $('#m_select2_111 option').each(function () {
      switch ($(this).text()) {
        case 'ბინა': $(this).attr('reference', 'flat'); break;
        case 'სასტუმრო': $(this).attr('reference', 'hotel'); break;
        case 'კომერციული ფართი': $(this).attr('reference', 'comercial'); break;
        case 'მიწის ნაკვეთი': $(this).attr('reference', 'land'); break;
        case 'კერძო სახლი': $(this).attr('reference', 'house'); break;
        default: return;
      }
    });
  }

  var setAreaTypes = function (types) {
    var options = [];
    types.forEach(function (type) {

      switch (type.name) {
        case 'm2': options.push(`<option value="${type.id}" data-symbol="მ²" data-placeholder="0" selected>მ²</option>`); break;
        case 'ha': options.push(`<option value="${type.id}" data-symbol="ჰა" data-placeholder="0">ჰექტარი</option>`); break;
        case '1/100': options.push(`<option value="${type.id}" data-symbol="1/100" data-placeholder="0">1/100</option>`); break;
        default: return;
      }
    });
    $('#m_select2_444').html(options).selectpicker('refresh');
  }

  var setMunicipalities = function (municipalities) {
    $.buildOPtions(municipalities, 'm_select2_002');
  }
  /*
    Public Functions
  */

  var getMainFields = function () {
    $.ajax({
      url: `/states/create/get-fields`,
      type: 'GET',
      success: function (result) {
        var {
          transactionTypes,
          stateTypes,
          areaTypes,
          municipalities
        } = result;

        setTransactionTypes(transactionTypes);
        setStateTypes(stateTypes);
        setAreaTypes(areaTypes);
        setMunicipalities(municipalities);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  var clearInputs = function () {
    $('#state_clear_btn').unbind('click').click(function () {
      $('#search_area :input:text').each(function () {
        $(this).val('');
      });
      $('#m_select2_111').val('').trigger('change');
      $('#m_select2_001').val('').trigger('change');
      $('#m_select2_002').val('').trigger('change');
      $('#village')[0].sumo.unSelectAll();
    });
  }

  var checkAll = function () {
    $('#check_all').change(function () {
      if(this.checked) {
        $('.links').prop('checked', true);
      } else {
        $('.links').removeAttr('checked');
      }
    });
  }

  return {
    init: function () {
      getMainFields();
      clearInputs();
      checkAll();
    }
  }

}();

$(document).ready(function () {
  Index.init();
});
