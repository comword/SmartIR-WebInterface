$("#studybutton").click(function () {
  $.ajax({
    url: "study_IR.cgi",
    type: 'POST',
    dataType: "html",
    data: {m_room: strTxtName},
    success: function (strValue) {

    }
  });
});
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
function get_IR_detail(IRID)
{
  $.ajax({
    url: "get_IR_detail.cgi",
    type: 'GET',
    dataType: "html",
    data: {m_IRID: IRID},
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(strValue,true));
      var table = $('#IRs-_'+data["IRID"]);
      table.empty();
      var content = '<div class="panel-body">';
      

    }
  });
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
