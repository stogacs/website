// only allow redirects back to pages on this site
function getRedirect() {
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  return '/leaderboard/';
}

function showError(id, message) {
  const element = document.getElementById(id);
  element.innerText = message;
  element.style.display = '';
}

async function handleLogIn(event) {
  event.preventDefault();
  const button = document.getElementById('login-button');
  document.getElementById('login-error').style.display = 'none';
  button.disabled = true;
  try {
    await logIn(
      document.getElementById('login-username').value,
      document.getElementById('login-password').value,
    );
    window.location.href = getRedirect();
  } catch (error) {
    showError('login-error', error.message);
    button.disabled = false;
  }
}

async function handleSignUp(event) {
  event.preventDefault();
  const button = document.getElementById('signup-button');
  document.getElementById('signup-error').style.display = 'none';

  const password = document.getElementById('signup-password').value;
  if (password != document.getElementById('signup-password-confirm').value) {
    showError('signup-error', 'The passwords do not match.');
    return;
  }

  button.disabled = true;
  try {
    await signUp(
      document.getElementById('signup-username').value,
      document.getElementById('signup-display-name').value,
      password,
    );
    window.location.href = getRedirect();
  } catch (error) {
    showError('signup-error', error.message);
    button.disabled = false;
  }
}

let currentProfile = null;

function resetMessages(prefix) {
  document.getElementById(prefix + '-error').style.display = 'none';
  document.getElementById(prefix + '-success').style.display = 'none';
}

async function handleDisplayNameChange(event) {
  event.preventDefault();
  const button = document.getElementById('display-name-button');
  const input = document.getElementById('new-display-name');
  resetMessages('display-name');
  button.disabled = true;
  try {
    await changeDisplayName(input.value);
    currentProfile.display_name = input.value.trim();
    document.getElementById('account-name').innerText = currentProfile.display_name;
    input.value = currentProfile.display_name;
    showError('display-name-success', 'Display name updated.');
  } catch (error) {
    showError('display-name-error', error.message);
  }
  button.disabled = false;
}

async function handlePasswordChange(event) {
  event.preventDefault();
  const button = document.getElementById('password-button');
  const form = document.getElementById('password-form');
  resetMessages('password');

  const newPassword = document.getElementById('new-password').value;
  if (newPassword != document.getElementById('new-password-confirm').value) {
    showError('password-error', 'The new passwords do not match.');
    return;
  }

  button.disabled = true;
  try {
    await changePassword(
      currentProfile.username,
      document.getElementById('current-password').value,
      newPassword,
    );
    form.reset();
    showError('password-success', 'Password changed.');
  } catch (error) {
    showError('password-error', error.message);
  }
  button.disabled = false;
}

async function handleLogOut() {
  await logOut();
  window.location.reload();
}

// on page finish loading
document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById('login-form').addEventListener('submit', handleLogIn);
  document.getElementById('signup-form').addEventListener('submit', handleSignUp);
  document.getElementById('logout-button').addEventListener('click', handleLogOut);
  document.getElementById('display-name-form').addEventListener('submit', handleDisplayNameChange);
  document.getElementById('password-form').addEventListener('submit', handlePasswordChange);

  const profile = await getCurrentProfile();
  currentProfile = profile;
  if (profile) {
    document.getElementById('new-display-name').value = profile.display_name;
    document.getElementById('page-title').innerText = 'Your Account';
    document.getElementById('account-name').innerText = profile.display_name;
    document.getElementById('account-username').innerText = profile.username;
    document.getElementById('account-shekels').innerText = profile.shekels;
    document.getElementById('account-card').style.display = '';
  } else {
    document.getElementById('login-cards').style.display = '';
  }
});