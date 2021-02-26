// Create Banner
const createBanner = () => {
    // build inside container
    const cookiesAlert = `
        <p>We use cookies to improve your experience on our site. By using our site, you agree to our <a class="privacyPolicyLink" href="https://www.directactioneverywhere.com/privacy-policy">Privacy Policy</a>.</p>
        <button class="acceptCookiesButton" onclick="acceptCookies()">OK</button>
    `
    // add to body
    document.getElementById('cookie-alert').innerHtml(cookiesAlert);
}

const acceptCookies = () => {
    document.getElementById('cookie-alert').style.display = "none";
    document.cookie = "cookieBannerClosed=true";
}

if (document.cookie.indexOf('cookieBannerClosed=') == -1) {
    createBanner();
}