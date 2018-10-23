var Search = function () {

  /*
    Private Functions
  */

  var hasValues = function (object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] !== undefined && !object[key].length) {
          delete object[key];
        }
      }
    }

    if (Object.keys(object).length > 0) {
      return object
    } else {
      return false;
    }    
  }

  var setAssignmentForLand = function () {
    var status = null;
    var text = null;

    $('#searched tr td').each(function () {
      if (!$(this).attr('isfor')) return;

      status = $(this).attr('isfor');
    });

    $.unitOptions.status.land.forEach(function (item) {
      if (!item.id === status) return;
      text = item.name
    });

    $(`#searched tr td[isfor=${status}]`).text(text);
  }

  var search = function (data, searchLand) {
    $.ajax({
      url: location.pathname + '/search',
      method: 'GET',
      data: {data: data, land: searchLand},
      success: function (response) {
        if (searchLand) {
          $('#dinamyc_th').text('დანიშნულება');
        } else {
          $('#dinamyc_th').text('სართულები/ოთახები');
        }
        $('#searched').html(response);
        setAssignmentForLand();
      },
      error: function (error) {
        console.log(error, 'err');
      }
    });
  }

  var getCheckedValues = function (id) {
    var values = []

    if (id === 'rooms' || id === 'bedrooms') {
      $(`#${id}`).find('input[type="checkbox"]').each(function () {
        if ($(this).parent('div').hasClass('active')) {
          values.push($(this).val());
        }
      });
    } else {
      $(`#${id}`).find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked') && this.name !== 'restrooms_quantity') {
          values.push($(this).val());
        }
      });
    }

    return values;
  }

  var getSelectedValues = function (id) {
    var values = [];
    $(`#${id} option:selected`).each(function () {
      values.push($(this).val());
    });

    return values;
  }

  var getCheckedCurrency = function (data) {
    if (data.price_from || data.price_to) {
      return [$('input[name=currency]:checked').val()];
    } else if (data.pricefrom_per_m || data.priceto_per_m) {
      return [$('input[name=cur_square_price]:checked').val()];
    } else {
      return [
        $('input[name=currency]:checked').val(),
        $('input[name=cur_square_price]:checked').val()
      ];
    }
  }

  var getValues = function () {
    var data = {};
    var searchLand = $('#m_select2_111 option:selected').attr('reference') === 'land' ? true : null
    data.state_type = $('#m_select2_111').val();
    data.transaction_type = $('#m_select2_001').val();
    data.municipality = $('#m_select2_002').val();
    data.village = getSelectedValues('village');
    data.area_from = $('input[name=area_from]').val();
    data.area_to = $('input[name=area_to]').val();
    data.status = getSelectedValues('status_search');
    data.price_from = $('input[name=price_from]').val();
    data.price_to = $('input[name=price_to]').val();
    data.floor_from = $('input[name=floor_from]').val();
    data.floor_to = $('input[name=floor_to]').val();
    data.pricefrom_per_m = $('input[name=pricefrom_per_m]').val();
    data.priceto_per_m = $('input[name=priceto_per_m]').val();
    data.currency = getCheckedCurrency(data);
    data.restrooms_quantity = $.map($('#restrooms input.restroom'), function(item) {
      if (item.checked) return item.value;
    });
    data.features = getCheckedValues('features_div');
    data.rooms_quantity = getCheckedValues('rooms');
    data.bedrooms_quantity = getCheckedValues('bedrooms');
    data.flat_type = getCheckedValues('floor_div');
    data.condition = getSelectedValues('cond_sel');
    data.project = getSelectedValues('proj_sel');
    data.exchange = getSelectedValues('exch_sel');
    data.any_name = $('input[name=any_word]').val();

    if(hasValues(data)) {
      // return
      search(data, searchLand);
    } else {
      return;
    }
  }

  /*
    Public Functions
  */

  var onSearchBtnClick = function () {
    $('.search-for-state').unbind('click').click(function() {
      $('#search_for_state').click();
    });

    $('#search_for_state').unbind('click').click(function () {
      getValues()
    });
  }

  return {
    init: function () {
      onSearchBtnClick();
    }
  }

}();

$(document).ready(function () {
  Search.init();
});