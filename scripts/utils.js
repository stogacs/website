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

function escapeHtml(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyUser() {
  if (typeof getCurrentProfile != 'function') {
    return null;
  }
  try {
    return await getCurrentProfile();
  } catch (error) {
    console.error(error);
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