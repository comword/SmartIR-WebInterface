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
