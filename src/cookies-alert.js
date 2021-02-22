document.cookie = `cookieBannerClosed=false`;

var cookiesAlertCont = document.createElement('div').id = 'cookies-alert';
var body = document.getElementsByClassName('body')
body.appendChild(cookiesAlertCont);

function placeCookiesBanner() {
    function acceptCookies() {
        document.cookie = `cookieBannerClosed=true`;
    }

    var cookiesAccepted = getCookie('cookieBannerClosed')

    if (cookiesAccepted == 'false') {
        document.getElementById('cookies-alert').innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                body {
                    width: 100%;
                    background: gray;
                }
                .cookies-banner {
                    font-family: Inter,sans-serif;
                    font-size: smaller;
                    width: 240px;
                    border-radius: 10px;
                    padding: 20px;
                    background: #fff;
                    position: fixed;
                    bottom: 10px;
                    left: 10px;

                    display: flex;
                    align-items: center;
                    
                }
                a {
                    color: #333;
                }
                button {
                    margin-left: 10px;
                    background: #225dd6;
                    color: #fff;
                    padding: 3px 8px;
                    border-radius: 3px;
                }
            </style>
            <div id='cookies-banner'>
                <p>We use cookies to improve your experience on our site. By using our site, you agree to our <a id="privacy-policy" href="https://www.directactioneverywhere.com/privacy-policy">Privacy Policy</a></p>
                <button id="accept-cookies" onclick="acceptCookies()">OK</button>
            </div>
        `
    }else {
        document.getElementById('cookies-alert').style.display = 'none'
    }
}

placeCookiesBanner();