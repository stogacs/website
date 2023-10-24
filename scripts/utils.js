const knownVersion = 'Mi4wLjA';

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
  const cookieValue =
    encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()};` : '');
  document.cookie = `${name}=${cookieValue}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function getLoginDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const access_token = urlParams.get('access_token');

  if (access_token != null) {
    setCookie('discordAuth', access_token, 7);
    window.location.href = window.location.href.split('?')[0];
  }
}

async function verifyUser() {
  const access_token = getCookie('discordAuth');
  if (access_token != null) {
    try {
      const response = await fetch(
        `https://shekels.mrsharick.com/discord/user?token=${access_token}`,
      );
      const data = await response.json();
      if (response.status != 200) {
        deleteCookie('discordAuth');
        return null;
      }
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    return null;
  }
}

async function isUpToDate() {
  const response = await fetch('https://shekels.mrsharick.com/api/version');
  const data = await response.json();
  return data.version == knownVersion;
}
