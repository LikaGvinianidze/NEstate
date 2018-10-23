var phoneInput = function () {
    $("#tel_input").on("keypress keyup blur", function (event) {
      var charCode = (event.which) ? event.which : event.keyCode
      if (charCode === 43) {
        var characters = $("#tel_input").val();
        if (characters.length > 0 || characters.includes('+')) return false;
      }
      if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
      return true;
    });
};

$(document).ready(function () {
  phoneInput();
});