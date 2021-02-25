// This script appends URL query params from the take action page to the links.
// The main purpose of this is so that we can track campaign source on the NMFF website.

const queryString = new URLSearchParams(window.location.search.toLowerCase()).toString()
const links = document.getElementsByClassName("take-action-link");
if (queryString != "") {
    links.forEach(l=>{
        let href = l.getAttribute("href");
        href += href.includes("?") ? "&" : "?"
        href += queryString
        l.setAttribute("href", href);
    })
}