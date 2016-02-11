$("#studybutton").click(function () {
  strTxtName = $("input[name='IRID_Input']").val();
  $.ajax({
    url: "study_IR.cgi",
    type: 'POST',
    dataType: "html",
    data: {IRID: strTxtName},
    success: function (strValue) {
      window.check_learn_status_timer = setInterval(check_learn_status,1000);
    }
  });
});
function check_learn_status() {
  //clearInterval(window.check_learn_status_timer);
}
function get_IR_recode()
{
  $.ajax({
    url: "get_IR_recode.cgi",
    type: 'GET',
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(strValue,true));
      generate_IR_table(data);
    }
  });
}
function show_IR_detail(IRID)
{
  var table = $('#IRs-_'+IRID);
  table.empty();
  var content = '<div class="panel-body"><button type="button" class="btn btn-default btn-lg" onclick="IR_Send(';
  content = content + IRID;
  content = content + ')"><span class="glyphicon glyphicon-play" aria-hidden="true"></span>发射</button><button type="button" class="btn btn-default btn-lg" onclick="IR_Modify(';
  content = content + IRID;
  content = content + ')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改</button><button type="button" class="btn btn-default btn-lg" onclick="IR_Remove(';
  content = content + IRID;
  content = content + ')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>删除</button></div>';
}
function generate_IR_table(data)
{
  var table = $("#accordion");
  table.empty();
  for(var k in data)
  {
    var content = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="IRs-Heading_';
    content = content + k;
    content = content + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#IRs-_';
    content = content + k;
    content = content + '" aria-expanded="true" aria-controls="IRs-_';
    content = content + k;
    content = content + '">';
    content = content + data[k];
    content = content + '</a></h4></div><div id="IRs-_';
    content = content + k;
    content = content + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="IRs-Heading_';
    content = content + k;
    content = content + '"></div></div>';
    table.append(content);
  }
}
function IR_Send(IRID)
{
  $.ajax({
    url: "go_IR_action.cgi",
    type: 'POST',
    dataType: "html",
    data: {action:"send",m_data:IRID},
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(strValue,true));
    }
  });
}
function IR_Modify(IRID)
{
  $.ajax({
    url: "go_IR_action.cgi",
    type: 'POST',
    dataType: "html",
    data: {action:"modify",m_data:IRID},
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(strValue,true));
    }
  });
}
function IR_Remove(IRID)
{
  $.ajax({
    url: "go_IR_action.cgi",
    type: 'POST',
    dataType: "html",
    data: {action:"remove",m_data:IRID},
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(strValue,true));
    }
  });
}
