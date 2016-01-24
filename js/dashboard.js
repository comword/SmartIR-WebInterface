$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
function getPage(tag) {
  $.ajax({
    url: "templetes/"+tag,
    type: 'GET',
    timeout: 30000,
    error: function(){
      return true;
    },
    success: function(content){
      $('[id="Mycanvas"]').empty();
      $('[id="Mycanvas"]').append(content);
    }
  });
}
