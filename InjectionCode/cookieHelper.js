
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value) {

    var expires = 3600 * 1000 * 24 * 365 * 10;

    var updatedCookie = name + "=" + value + '; expires=' + expires;

    document.cookie = updatedCookie;

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function deleteCookie() {
    for (var i = 0; i < getCookie().length; i++) {

        var name = getCookie()[i];

        setCookie(name, "", {

            expires: -1
        })
    }
}