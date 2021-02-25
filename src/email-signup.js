var emailForm = document.getElementById("email-form");

if (emailForm) {

    emailForm.addEventListener("submit", function(event){

        event.preventDefault();

        $("#signup-submit").attr("disabled", true);
        $('#signup-submit').val("Please wait...")

        // This is done to protect against bots that look for forms containing name & email fields.
        var paramsArr = Array.from(new FormData(emailForm))
        paramsArr[0][0]= "name"
        paramsArr[1][0] = "email"
        paramsArr[2] = ["id", "dxe-signup"]
        paramsArr[3] = ["fullHref", window.location.href]
        var body = new URLSearchParams(paramsArr).toString()

        fetch('https://petitions-229503.appspot.com/api/sign', {
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