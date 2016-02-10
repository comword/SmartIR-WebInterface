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

}
function modpriv(Username)
{

}
function modpass(Username)
{

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
        cont = cont + '<li class="list-group-item"><div class="btn-group btn-group-xs" role="group" style="float: right;"><button type="button" class="btn btn-default" onclick="deluser(';
        cont = cont + data[k];
        cont = cont + ')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button><button type="button" class="btn btn-default" onclick="modpriv(';
        cont = cont + data[k];
        cont = cont + ')"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>修改权限</button><button type="button" class="btn btn-default" onclick="modpass(';
        cont = cont + data[k];
        cont = cont + ')"><span class="glyphicon" aria-hidden="true">&#57864;</span>修改密码</button></div>';
        cont = cont + data[k];
        cont = cont + '</li>';
      }
      cont = cont + '</ul>';
      dom.html(cont);
    }
  });
}
update_user_list("#Users")
