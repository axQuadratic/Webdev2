let decodedCookies = decodeURIComponent(document.cookie).split(";");
for (let i = 0; i < decodedCookies.length; i++) {
    let cookie = decodedCookies[i];
    while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
    }
}