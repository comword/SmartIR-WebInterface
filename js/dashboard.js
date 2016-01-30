$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
function getPage(tag) {
  $.ajax({
    url: "templates/"+tag,
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
  var nav=document.getElementById("nav-#dashboard.html");
  nav.className = '';
  nav=document.getElementById("nav-#IRControl.html");
  nav.className = '';
  nav=document.getElementById("nav-#Usermanager.html");
  nav.className = '';
  obj='nav-#'+tag;
  nav=document.getElementById(obj);
  nav.className = 'active';
  nav=document.getElementById("left-nav-bar");
  if (nav.className = "row row-offcanvas row-offcanvas-right active")
  {
    $('.row-offcanvas').toggleClass('active');
  }
}
