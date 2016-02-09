$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
$('a[herf="#Users"]').click(function (e) {
  $.ajax({
    url: "get_user_list.cgi",
    type: 'GET',
    success: function (strValue) {
      var dom = $('#Users');
      dom.empty();
    }
  });
})
$('a[herf="#privilege"]').click(function (e) {
  $.ajax({
    url: "get_user_list.cgi",
    type: 'GET',
    success: function (strValue) {
      var dom = $('#privilege');
      dom.empty();
    }
  });
})
$('a[herf="#rooms"]').click(function (e) {
  $.ajax({
    url: "get_user_list.cgi",
    type: 'GET',
    success: function (strValue) {
      var dom = $('#rooms');
      dom.empty();
    }
  });
})
$('a[herf="#devices"]').click(function (e) {
  $.ajax({
    url: "get_user_list.cgi",
    type: 'GET',
    success: function (strValue) {
      var dom = $('#devices');
      dom.empty();
    }
  });
})
