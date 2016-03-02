$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
$(function(){
function renew_jwt(){
  $.ajax({
    url: "renew_jwt.cgi",
    type: 'GET',
    timeout: 30000,
    error: function(xhr, ajaxOptions, thrownError){
      if(xhr.responseText = "Unauthorized")
      window.location.href = 'login.html';
      return true;
    },
    success: function(content){
    }
  });
}
setInterval(renew_jwt,1200000);
});
function getPage(tag) {
  var nav=document.getElementById("nav-#dashboard.html");
  nav.className = '';
  nav=document.getElementById("nav-#IRControl.html");
  nav.className = '';
  nav=document.getElementById("nav-#Sysmanager.html");
  nav.className = '';
  obj='nav-#'+tag;
  nav=document.getElementById(obj);
  nav.className = 'active';
  nav=document.getElementById("left-nav-bar");
  if (nav.className = "row row-offcanvas row-offcanvas-right active")
  {
    $('.row-offcanvas').toggleClass('active');
  }
  $.ajax({
    url: "templates/"+tag,
    type: 'GET',
    timeout: 30000,
    error: function(xhr, ajaxOptions, thrownError){
      if(xhr.responseText = "Unauthorized")
      window.location.href = 'login.html';
      return true;
    },
    success: function(content){
      $('[id="Mycanvas"]').empty();
      $('[id="Mycanvas"]').append(content);
    }
  });
}
function JSON_stringify(s, emit_unicode)
{
  var json = JSON.stringify(s);
  return emit_unicode ? json : json.replace(/[\u007f-\uffff]/g,
    function(c) {
      return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
    }
  );
}
function check_logined()
{
  $.ajax({
    url: "/get_user_info.cgi",
    type: 'GET',
    timeout: 30000,
    error: function(xhr, ajaxOptions, thrownError){
      if(xhr.responseText = "Unauthorized")
      window.location.href = 'login.html';
      return true;
    },
    success: function(content){
      $('[id="logineduser"]').empty();
      var data = JSON.parse(JSON_stringify(content,true));
//      if (data = "JWTError")
//        location.reload();
      menu = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
      menu = menu + data["User"]
      menu = menu + '<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="logout.cgi">退出登录</a></li></ul></li>'
      $('[id="logineduser"]').append(menu);
    }
  });
}
function get_operation_log()
{
  $.ajax({
    url: "/get_operation_log.cgi",
    type: 'GET',
    timeout: 30000,
    error: function(xhr, ajaxOptions, thrownError){
      if(xhr.responseText = "Unauthorized")
      window.location.href = 'login.html';
      return true;
    },
    success: function(content){
      
    }
  });
}
