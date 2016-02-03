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
    type: 'POST',
    dataType: "html",
    success: function (strValue) {
      var data = JSON.parse(JSON_stringify(content,true));
    }
  });
}
