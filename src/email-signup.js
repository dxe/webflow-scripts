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
		.catch(error => console.error(error))

		_paq.push(['trackEvent', 'Sign Up', 'Sign Up Form Submitted', 'Sign Up Form']);

	});

}
