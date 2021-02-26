// Create Banner
const createBanner = () => {
    const cookiesAlertCont = document.createElement('div').id = 'cookies-alert'.innerHTML = `
        <style>
            .cookiesBanner {
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
                margin: 0;
                padding: 0;
                
            }
            .privacyPolicyLink {
                color: #333;
                margin: 0;
                padding: 0;
            }
            .acceptCookiesButton {
                margin-left: 10px;
                background: #225dd6;
                color: #fff;
                padding: 3px 8px;
                border-radius: 3px;
                margin: 0;
                padding: 0;
            }
        </style>
        <div class='cookiesBanner'>
            <p>We use cookies to improve your experience on our site. By using our site, you agree to our <a class="privacyPolicyLink" href="https://www.directactioneverywhere.com/privacy-policy">Privacy Policy</a></p>
            <button class="acceptCookiesButton" id='acceptCookiesButton'>OK</button>
        </div>
    `
    // add to body
    const body = document.getElementsByClassName('body')
    body.appendChild(cookiesAlertCont);

}

const acceptCookies = () => {
    document.getElementById('cookie-alert').style.display('none')
    document.cookie = "cookieBannerClosed=true";
}

if (document.cookie.indexOf('cookieBannerClosed=') == -1) {
    createBanner();
}

document.getElementById('acceptCookiesButton').addEventListener('click', acceptCookies)