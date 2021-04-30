// Create Banner
const createBanner = () => {
    // build inside container
    const cookiesAlert = `
        <p>
            We use cookies to improve your experience on our site. By using our site, you agree to our
            <a class="privacyPolicyLink" href="https://www.directactioneverywhere.com/privacy-policy">Privacy Policy</a>.
        </p>
        <button class="acceptCookiesButton" onclick="acceptCookies()">OK</button>
    `
    // add to body
    document.getElementById('cookie-alert').innerHTML = cookiesAlert;
    document.getElementById('cookie-alert').style.display = "flex";
}

const acceptCookies = () => {
    const secondsPerDay = 60 * 60 * 24;
    document.getElementById('cookie-alert').style.display = "none";
    document.cookie = `cookieBannerClosed=true; max-age=${secondsPerDay * 90}; path=/`;
}

if (document.cookie.indexOf('cookieBannerClosed=') == -1) {
    createBanner();
}