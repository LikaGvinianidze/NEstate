var DinamycSearch = function () {

  /*
    Private Functions
  */

  var setStatuses = function (ref) {
    $('#status_search').html('');
    $('#status_search')[0].sumo.reload();
    $.unitOptions.status[ref].forEach(res => {
      $('#status_search')[0].sumo.add(res.id,res.name);
    });
    $('#status_div').show();
  }

  var renderVillages = function (id) {
    if (id === '') return;
    $.ajax({
      url: `/states/create/get-villages?municipality=${id}`,
      type: 'GET',
      success: function (result) {
        if (result.length > 1) {
          $('#village').html('');
          $('#village')[0].sumo.reload();
          result.forEach(res => {
            $('#village')[0].sumo.add(res.id,res.name);
          });
        } else {
          $('#village').html('');
          $('#village')[0].sumo.reload();
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  var constructDetSearch = function (ref) {
    switch (ref) {
      case 'land':
        $('#conditions_div, #projects_div, #rooms_filter, #floor_div').hide();
        break;
      case 'hotel':
        $('#projects_div').hide();
        $('#conditions_div, #rooms_filter, #floor_div').show();
        break;
      case 'comercial':
        $('#projects_div').hide();
        $('#conditions_div, #rooms_filter, #floor_div').show();
        break;
      case 'house':
        $('#projects_div').hide();
        $('#conditions_div, #rooms_filter, #floor_div').show();
        break;
      case 'flat': 
        $('#conditions_div').show();
        $('#projects_div, #rooms_filter, #floor_div').show();
        break;
      default: return;
    }
  }

  var renderFeatures = function (ref) {
    var url = '/states/create/render-features';

    $.ajax({
      url: url,
      type: 'GET',
      data: {
        view: ref,
        search: true
      },
      success: function (response) {
        $('#features_div').html(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  /*
    Public Functions
  */

  var clearInputs = function () {
    $('.clear-for-state').click(function () {

      $(this).closest('.m-nav__item').find('input[type=checkbox]').each(function () {
        if ($(this).parent('div .active').length === 1) {
          $(this).parent('div .active').toggleClass('active');
        }
        if ($(this).is(':checked')) {
          console.log(1)
          $(this).prop('checked', false);
          
        }
      });

      for (let i = 1; i <= 8; i += 2) {
        $(this).closest('.m-nav__item').find(`#outputArea-${i}`).text('დან');
        $(this).closest('.m-nav__item').find(`#outputArea-${i+1}`).text('მდე');
      }

      $(this).closest('.m-nav__item').find('input[type=number]').val('');

      try {
        $('#cond_sel').selectpicker("deselectAll").selectpicker("refresh");
        $('#proj_sel').selectpicker("deselectAll").selectpicker("refresh");
        $('#exch_sel').selectpicker("deselectAll").selectpicker("refresh");
      } catch (error) {
      }
    });

    $('#clear_btn').click(function () {
      $('.clear-for-state').click();
      $('#m_select2_111').val('').trigger('change');
      $('#m_select2_001').val('').trigger('change');
      $('#m_select2_002').val('').trigger('change');
      $('#status_search')[0].sumo.unSelectAll();
      $('input[name="any_word"]').val('');
    });
  }

  var onMunicipalitySelect = function () {
    $('#m_select2_002').change(function () {
      var id = $(this).val();
      var isCity = $('option:selected', this).attr('iscity');

      renderVillages(id);

      if (isCity) {

      }
    });
  }

  var onTypeChange = function () {
    $('#m_select2_001').unbind('change').change(function () {
      var txt = $('#m_select2_001 option:selected').text().trim();
      var opt = $('#m_select2_111 option[reference="land"]');

      if (txt === 'ქირავდება' || txt === 'ქირავდება დღიურად') {
        opt.hide();
        $('#m_select2_111').selectpicker('refresh');
        return;
      } else {
        opt.show();
        $('#m_select2_111').selectpicker('refresh');
        return;
      }
    });

    $('#m_select2_111').unbind('change').change(function () {
      var ref = $('#m_select2_111 option:selected').attr('reference');

      if (ref !== undefined) {
        // Clear all inputs
        $('#clear_btn').click();
        $(`#m_select2_111 option[reference=${ref}]`).prop('selected', true);
        $('#m_select2_111').selectpicker('refresh');

        if (ref === 'land') {
          // Set statuses
          setStatuses(ref)
          renderFeatures(ref);
          constructDetSearch(ref);
          
          // Hide options
          $('#m_select2_001 option:contains("ქირავდება")').hide();
          $('#m_select2_001').selectpicker('refresh');
        } else {
          constructDetSearch(ref);
          renderFeatures(ref);
          if ($.unitOptions.status[ref]) {
            setStatuses(ref);
          } else {
            $('#status_search').html('');
            $('#status_search')[0].sumo.reload();
            $('#status_div').hide();
          }

          $('#m_select2_001 option:contains("ქირავდება")').show();
          $('#m_select2_001').selectpicker('refresh');
        }
      } else if ($("#status_div").is(":hidden")) {
        $('#status_div').show();
      }
    });
  }

  return {
    init: function () {
      onTypeChange();
      clearInputs();
      onMunicipalitySelect();
    }
  }

}();

$(document).ready(function () {
  DinamycSearch.init();
});