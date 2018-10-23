var Card = function () {

  /*
    Private Functions
  */
  var setColorsToPriceSwitcher = function () {
    $('.monthly-label1').css('color', '#000');
    $('.yearly-label1').css('color', '#000');
  }

  var changeColor = function () {
    $(".yearly-label1").click(function () {
      $(this).css('color', '#fff');
      $(this).parent('p').find('.monthly-label1').css('color', '#000');
    });

    $(".monthly-label1").click(function () {
      $(this).css('color', '#fff');
      $(this).parent('p').find('.yearly-label1').css('color', '#000');
    });
  }

  var getCourse = function () {
    var url = 'http://currency.any.ge/api.php?ids=42';

    var get = $.ajax({
      url: url,
      method: 'GET',
      async: false,
      success: function (response) {
        const result = JSON.parse(response);
        dollarCourse = result[0].cur_value;
      },
      error: function (error) {
        console.log(error, 'err');
      }
    });

    var result = JSON.parse(get.responseText)
    var course = Math.floor10(result[0].cur_value, -2)

    return course;
  }

  var show = function (tot, sq, cur) {
    var currency = cur === 'lari' ? '₾' : '$';
    $('#total_value').text(`${tot + ' ' + currency}`);
    $('#square_value').text(`${sq + ' ' + currency}`);
  }

  var convert = function (total, square, cur) {
    var course = getCourse();
    var dec = cur === 'dollar' ? 'dev' : '';

    var totalConverted = dec === 'dev'
      ? Math.floor10(total / course, -2)
      : Math.floor10(total * course, -2);

    var squareConverted = dec === 'dev'
      ? Math.floor10(square / course, -2)
      : Math.floor10(square * course, -2);

    show(totalConverted, squareConverted, cur)
  }

  var changePrice = function () {
    $('input').on('click', function () {
      var currency = this.value;
      var baseTotalVal = $('#total_value').attr('basevalue');
      var baseSquareVal = $('#square_value').attr('basevalue');
      var baseCur = $('#square_value').attr('basecur');

      if (currency === baseCur) {
        show(baseTotalVal, baseSquareVal, baseCur);
        return;
      }

      convert(baseTotalVal, baseSquareVal, currency);
    });
  }

  /*
    Public Functions
  */

  var onChangeCurrency = function () {
    changeColor();
    changePrice();
  }

  return {
    init: function () {
      onChangeCurrency();
      setColorsToPriceSwitcher();
    }
  }

}();

$(document).ready(function () {
  Card.init();
});