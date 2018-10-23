var Client = function() {

  /*
    Private Functions
  */


  /*
    Public Functions
  */

  var clearInputs = function () {
    $('#clear_btn').on('click', function () {
      $('#search_area :input:text').each(function () {
        $(this).val('');
      })
    });
  }

  return {
    init: function() {
      clearInputs();
    }
  }
}();

$(document).ready(function() {
  Client.init();
});