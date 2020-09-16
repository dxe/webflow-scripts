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

var emailForm = document.getElementById("email-form");

if (emailForm) {

	emailForm.addEventListener("submit", function(event){

		event.preventDefault();

		$("#signup-submit").attr("disabled", true);
      	$('#signup-submit').val("Please wait...")

		var chapterCookie = encodeURI(getCookie("chapterName"));
		
		if (chapterCookie == "") chapterCookie = "none";

		var body = new URLSearchParams(Array.from(new FormData(emailForm))).toString() + `&subscriber-chapter=${chapterCookie}`

		fetch('https://ec2.dxe.io/webflow-scripts/subscribe-proxy.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;'
			},
			body: body
		})
		.then(res => {
	        $('#email-form').css('display', 'none');
	        if (res.status == 200) {
	          $('.w-form-done').css('display', 'block');
	        }
	        else {
	          $('.w-form-fail').css('display', 'block');
	        }
	    })
		.catch(error => console.error(error))

		_paq.push(['trackEvent', 'Sign Up', 'Sign Up Form Submitted', 'Sign Up Form']);
		dataLayer.push({'event': 'signup-form-submitted'});

	});

}
