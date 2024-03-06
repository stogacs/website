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

function pluralize(word, count) {
  return count === 1 ? word : word + 's';
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
        `https://cs-services.stoga.club/discord/user?token=${access_token}`,
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

async function logAnalytics(event, data) {
  const token = getCookie('discordAuth') || '';
  await fetch('https://cs-services.stoga.club/analytics/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event, data, token }),
  });
}

function getParameterByName(paramName) {
  const url = window.location.href;
  let paramString = url.split('?')[1];

  if (!paramString) {
    console.error('No parameters found in the URL');
    return null;
  }

  let queryString = new URLSearchParams(paramString);

  if (queryString.has(paramName)) {
    return queryString.get(paramName);
  } else {
    console.error('Parameter not found: ' + paramName);
    return null;
  }
}

function fetchConstant(constant) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://cs-services.stoga.club/constants/${constant}`, false);
  xhr.setRequestHeader('Content-Type', 'application/json');

  try {
    xhr.send();

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      return data.value;
    } else {
      console.error(`Request failed with status ${xhr.status}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
