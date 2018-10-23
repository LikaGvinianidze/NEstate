$(document).ready(function () {
  $('.selectpicker').selectpicker({
    selectedTextFormat: 'count',
    countSelectedText: '{0} არჩეულია'

  });

  $('.search_test').SumoSelect({
    search: true,
    searchText: 'ძებნა..',
    captionFormat: '{0} არჩეულია',
    captionFormatAllSelected: 'ყველა არჩეულია'
  });

  $('#rateCodes').SumoSelect({
    search: true,
    searchText: 'აირჩიეთ',
    captionFormat: '{0} არჩეულია',
    captionFormatAllSelected: 'ყველა არჩეულია'
  });

  // $('.state-sit').SumoSelect({
  //   search: true,
  //   searchText: 'აირჩიეთ',
  //   captionFormat: '{0} არჩეულია',
  //   placeholder: 'მდგომარეობა',
  //   captionFormatAllSelected: 'ყველა არჩეულია'
  // });
  // $('.project').SumoSelect({
  //   search: true,
  //   searchText: 'აირჩიეთ',
  //   captionFormat: '{0} არჩეულია',
  //   placeholder: 'პროექტი',
  //   captionFormatAllSelected: 'ყველა არჩეულია'
  // });
  // $('.exchange').SumoSelect({
  //   search: true,
  //   searchText: 'აირჩიეთ',
  //   captionFormat: '{0} არჩეულია',
  //   placeholder: 'გაცვლა',
  //   captionFormatAllSelected: 'ყველა არჩეულია'
  // });

  $('#status_search').SumoSelect({
    search: true,
    searchText: 'აირჩიეთ',
    captionFormat: '{0} არჩეულია',
    captionFormatAllSelected: 'ყველა არჩეულია'
  });

  $('#village').SumoSelect({
    search: true,
    searchText: 'აირჩიეთ',
    captionFormat: '{0} არჩეულია',
    captionFormatAllSelected: 'ყველა არჩეულია'
  });

  $('.number').click(function () {
    $(this).toggleClass("active");
    $(this).find('input[type=checkbox]').prop('checked', $(this).is(':checked'));
  });

  $('.fieldset-1 input').click(function () {
    $(this).toggleClass("checked");
    // $(`.fieldset-2 input[value="${$(this).val()}"]`).attr('checked', true)
  });

  $('.fieldset-2 input').click(function () {
    $(this).toggleClass("checked");
    // $(`.fieldset-1 input[value="${$(this).val()}"]`).attr('checked', true)
  });

  $('.monthly-label').css('color', '#fff');
  $('.monthly-label1').css('color', '#fff');
  $('.yearly-label').css('color', '#000');
  $(".yearly-label").click(function () {
    $(this).css('color', '#fff');
    $(this).parent('p').find('.monthly-label').css('color', '#000');
  });

  $(".monthly-label").click(function () {
    $(this).css('color', '#fff');
    $(this).parent('p').find('.yearly-label').css('color', '#000');
  });

  $('#features_div').on('click', '.select-all', function () {
    $(this).closest('.check-all').find('input[type=checkbox]').prop('checked', $(this).is(':checked'));
  });

  $("#testArea-1").change(function () {
    var val = $(this).val();
    $("#outputArea-1").html(val);

  });

  $("#testArea-2").change(function () {
    var val = $(this).val();
    $("#outputArea-2").html(val);

  });

  $("#testArea-3").change(function () {
    var val = $(this).val();
    $("#outputArea-3").html(val);

  });

  $("#testArea-4").change(function () {
    var val = $(this).val();
    $("#outputArea-4").html(val);

  });

  $("#testArea-5").change(function () {
    var val = $(this).val();
    $("#outputArea-5").html(val);

  });
  $("#testArea-6").change(function () {
    var val = $(this).val();
    $("#outputArea-6").html(val);

  });

  $("#testArea-7").change(function () {
    var val = $(this).val();
    $("#outputArea-7").html(val);

  });

  $("#testArea-8").change(function () {
    var val = $(this).val();
    $("#outputArea-8").html(val);

  });

  $('.dropdown-currency-wrapper').on('click', function (e) {
    e.stopPropagation();
  });

  $('#m_modal_4 .owl-carousel').owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true,
    margin: 20,
    responsiveClass: true,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      568: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  })



});

// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();