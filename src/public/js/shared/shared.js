$(document).ready(function() {
  $(function() {
      $('a[href="/' + location.pathname.split('/')[1] + '"]').parent('li').addClass('m-menu__item  m-menu__item--active');
  });
});