var emailForm = document.getElementById("email-form");

if (emailForm) {

	emailForm.addEventListener("submit", function(event){

		event.preventDefault();

		var name = document.getElementById("name").value;
		var firstName = '';
		var i = name.indexOf(' ');
		if (i == -1) {
		    // there are no spaces in userName
		    firstName = name
		} else {
		    firstName = name.slice(0, i);
		}
		firstName = encodeURIComponent(firstName);

		var body = new URLSearchParams(Array.from(new FormData(emailForm))).toString() + `&list=Jx892mirlwaaY8uFHms763uCrw&LastSource=Webflow%20Sign%20Up%20Form&FirstName=${firstName}&hp=`

		fetch('https://sendy.dxetech.org/subscribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;'
			},
			body: body
		})
		.catch(error => console.error(error))

	});

}
