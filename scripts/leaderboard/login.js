// on page finish loading
document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById('login-code-entry').addEventListener('submit', function (event) {
    event.preventDefault();
    loginWithCode();
  });

  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  if (redirect) {
    setCookie('postLoginRedir', redirect, 1);
  } else {
    setCookie('postLoginRedir', '', 0);
  }
});

function loginWithCode() {
  code = document.getElementById('login-code-for').value.replace(/\D/g, '');

  if (code.length != 6 || isNaN(code)) {
    document.getElementById('error-display').innerHTML = 'Invalid Code';
    return;
  }

  fetch('https://cs-services.stoga.club/me/login?code=' + code, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) {
        setCookie('discordAuth', result.token, 7);
        window.location.href = '/leaderboard/index.html';
      } else {
        document.getElementById('error-display').innerHTML = result.message;
      }
    });
}
