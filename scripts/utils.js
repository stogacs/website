function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
  
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()};` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
}

function getLoginDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token');

    console.log(access_token);
    if (access_token != null) {
        console.log('got token')
        setCookie('discordAuth', access_token, 7);
        window.location.href = window.location.href.split('?')[0]; // go back but remove token
    }
}

async function verifyUser() {
    const access_token = getCookie('discordAuth');
    if (access_token != null) {
        try {
            const response = await fetch(`https://csboard.ddns.net/discord/user?token=${access_token}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    } else {
        return null;
    }
}