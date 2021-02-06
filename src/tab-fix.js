// NOTE: THIS SCRIPT REQUIRES JQUERY IN ORDER TO USE THE READY FUNCTION THAT FIRES AT A MORE APPROPRIATE TIME THAN VANILLA JS

// function to get cookies (source: https://www.w3schools.com/js/js_cookies.asp)
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(function(){

  // read cookie
  let activeTab = getCookie("activeResourceTab");
  // get url params
  let urlParams = window.location.search;
  
  if (activeTab) {
    $(activeTab).click();
  }

  // set cookie when tabs clicked
  var tabs = ["#w-tabs-0-data-w-tab-0", "#w-tabs-0-data-w-tab-1", "#w-tabs-0-data-w-tab-3", "#w-tabs-0-data-w-tab-2", "#w-tabs-0-data-w-tab-4"]
  tabs.forEach(tab => {
    if ($(tab).length) {
      $(tab).click(function() {
        document.cookie = `activeResourceTab=${encodeURIComponent(tab)}`;
      });
    }
  });
});