$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href")
  if (target == "#Users")
  {
    if($(target).is(':empty'))
      update_user_list(target);
  }
})
function deluser(Username)
{
  $.ajax({
    url: "get_user_list.cgi",
    type: 'POST',
    dataType: "html",
    data: {m_username:"None"},
    success: function (strValue) {

    }
  });
}
function modpriv(Username)
{

}
function modpass1(Username)
{
  window.oripass = $("input[name=\'password_"+Username+"\']").val();
  $("input[name='password_"+Username+"']").val("");
  $("input[name='password_"+Username+"']").attr("placeholder","请输入新密码")
  $("button[id='tmppassb1_"+Username+"']").attr("onclick","modpass2('"+Username+"')");
}
function modpass2(Username)
{
  window.newpass = $("input[name=\'password_"+Username+"\']").val();
  $("input[name='password_"+Username+"']").val("");
  $("input[name='password_"+Username+"']").attr("placeholder","请再次输入新密码")
  $("button[id='tmppassb1_"+Username+"']").attr("onclick","modpass3('"+Username+"')");
  $("button[id='tmppassb1_"+Username+"']").html("完成")
}
function modpass3(Username)
{
  window.repass = $("input[name=\'password_"+Username+"\']").val();
  $("#Sysmanager_alerts").empty();
  if(window.repass != window.newpass)
  {
    $("div[id='Sysmanager_alerts']").append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>输入错误!</strong>您两次输入的密码不匹配。</div>');
    canceldeluser(Username);
  }
  var strTxtPass = sha1(encodeURI(window.newpass));
  $.ajax({
    url: "modify_password.cgi",
    type: 'POST',
    timeout: 30000,
    dataType: "html",
    data: {username:Username,oripass:window.oripass,newpass:strTxtPass},
    error: function(xhr, ajaxOptions, thrownError){
      if(xhr.responseText = "Unauthorized")
      {
        window.location.href = 'login.html';
        return true;
      }
      if(xhr.responseText = "Original password wrong")
      {
        $("div[id='Sysmanager_alerts']").append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>错误!</strong>您输入的原密码不正确。</div>');
        canceldeluser(Username);
        return true;
      }
      if(xhr.responseText = "Privilage Error")
      {
        $("div[id='Sysmanager_alerts']").append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>错误!</strong>您的权限不足。</div>');
        canceldeluser(Username);
        return true;
      }
    },
    success: function(content){
      if(content = "Success.")
      {
        $("div[id='Sysmanager_alerts']").append('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>成功!</strong>密码修改成功。</div>');
        return true;
      }
      if(content = "Relogin.")
      {
        window.location.href = 'login.html';
        return true;
      }
    }
  });
}
function predeluser(Username)
{
  var dom = $("#delButton_"+Username);
  dom.wrap("<span style='display:none;'> </span>");
  var twap = $("#privButton_"+Username);
  cont = '<button type="button" class="btn btn-danger" id="tmpdelb1_'+Username+'" onclick="deluser(\''+Username+'\')">确定</button><button type="button" class="btn btn-primary" id="tmpdelb2_'+Username+'" onclick="canceldeluser(\''+Username+'\')">取消</button>'
  twap.before(cont);
}
function canceldeluser(Username)
{
  $("#delButton_"+Username).unwrap();
  $("#tmpdelb1_"+Username).remove();
  $("#tmpdelb2_"+Username).remove();
}
function cancelmodpriv(Username)
{
  $("#privButton_"+Username).unwrap();
  $("#tmpprivb1_"+Username).remove();
  $("#tmpprivb2_"+Username).remove();
}
function premodpriv(Username)
{
  var twap = $("#privButton_"+Username);
  cont = '<button type="button" class="btn btn-danger" id="tmpprivb1_'+Username+'" onclick="modpriv(\''+Username+'\')">确定</button><button type="button" class="btn btn-primary" id="tmpprivb2_'+Username+'" onclick="cancelmodpriv(\''+Username+'\')">取消</button>'
  twap.before(cont);
  twap.wrap("<span style='display:none;'> </span>");
}
function premodpass(Username)
{
  var twap = $("#passButton_"+Username);
  cont = '<button type="button" class="btn btn-danger" id="tmppassb1_'+Username+'" onclick="modpass1(\''+Username+'\')">下一步</button><button type="button" class="btn btn-primary" id="tmppassb2_'+Username+'" onclick="cancelmodpass(\''+Username+'\')">取消</button>'
  twap.before(cont);
  twap.wrap("<span style='display:none;'> </span>");
  var dom = $("#spanlist_"+Username);
  dom.after('<input type="password" name="password_'+Username+'" class="form-control" placeholder="请输入原密码" id="tmppassi1_'+Username+'"/>');
}
function cancelmodpass(Username)
{
  $("#passButton_"+Username).unwrap();
  $("#tmppassb1_"+Username).remove();
  $("#tmppassb2_"+Username).remove();
  $("#tmppassi1_"+Username).remove();
}
function update_user_list(target) {
  $.ajax({
    url: "get_user_list.cgi",
    type: 'GET',
    dataType: "html",
    data: {start:"None",num:100},
    success: function (strValue) {
      var data = JSON.parse(strValue);
      var dom = $(target);
      cont = '<ul class="list-group">'
      for(var k in data)
      {
        cont = cont + '<li class="list-group-item" style="padding: 15px 15px;">'+data[k]+'<div style="float: right;" class="col-lg-6"><div style="float: right; margin-top:-7px;" class="input-group input-group-sm"><span class="input-group-btn" id="spanlist_'+data[k]+'" style="width: 0%;"><button type="button" class="btn btn-default" onclick="predeluser(\'';
        cont = cont + data[k];
        cont = cont + '\')" id="delButton_'
        cont = cont + data[k];
        cont = cont + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button><button type="button" class="btn btn-default" onclick="premodpriv(\'';
        cont = cont + data[k];
        cont = cont + '\')" id="privButton_'
        cont = cont + data[k];
        cont = cont + '"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>修改权限</button><button type="button" class="btn btn-default" onclick="premodpass(\'';
        cont = cont + data[k];
        cont = cont + '\')" id="passButton_'
        cont = cont + data[k];
        cont = cont + '"><span class="glyphicon" aria-hidden="true">&#57864;</span>修改密码</button></div></div>';
        cont = cont + '</li>';
      }
      cont = cont + '</ul>';
      dom.html(cont);
    }
  });
}
update_user_list("#Users")
