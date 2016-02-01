$("#inputPassword").keydown(function (event) {
  if (event.which == "13") {
    $("#btnLogin").trigger("click");
  }
});
$("#btnLogin").click(function () {
  var strTxtName = encodeURI($("#inputUsername").val());
  var strTxtPass = sha1(encodeURI($("#inputPassword").val()));
  $('[id="alerts"]').empty();
  $.ajax({
    url: "login_action.cgi",
    type: 'POST',
    dataType: "html",
    data: { inputUsername: strTxtName, inputPassword: strTxtPass },
    success: function (strValue) {
      if (strValue == "Wrong username or wrong password.")
      {
        $('[id="alerts"]').append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>登录错误!</strong>您输入的用户名或密码错误。</div>');
        return true;
      }
      window.location.href = strValue;
    }
  });
});
