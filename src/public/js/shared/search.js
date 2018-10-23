var Search = function () {

  /*
    Private Functions
  */

  /*
    Public Functions
  */

  var onSearch = function () {
    $(document).on('click', '#search_btn', function () {
      var data = $('#search_term').val();

      if (data !== '') {
        $.ajax({
          url: location.pathname + '/search',
          method: 'GET',
          data: { name: data },
          success: function (response) {
            $('#demo').html(response);
          },
          error: function (error) {
            console.log(error, 'err')
          }
        });
      }
    });
  };

  var onClickEnter = function () {
    $('#search_term').keypress(function(e){
      if(e.which == 13){  //Enter key pressed
        $('#search_btn').click(); //Trigger search button click event
      }
    });
  };

  var paginate = function () {
    $(document).on('click', 'a', function () {
      const url = $(this).attr('to');
      if (!url) {
        return;
      }
      $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
          $('#demo').html(response);
        },
        error: function (error) {
          console.log(error);
        }
      })
    })
  };

  return {
    init: function () {
      onSearch();
      onClickEnter();
      paginate();
    }
  };
}();

$(document).ready(function () {
  Search.init();
});