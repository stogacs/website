document.addEventListener('DOMContentLoaded', async function () {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var signupStart = new Date(currentYear, 1, 14);
  var volunteerStart = new Date(currentYear, 2, 7);
  var hackstogaEnd = new Date(currentYear, 2, 31);

  if (currentDate > hackstogaEnd) {
    signupStart = new Date(currentYear + 1, 1, 1);
    volunteerStart = new Date(currentYear + 1, 2, 1);
    hackstogaEnd = new Date(currentYear + 1, 2, 31);
  }

  const signupPopup = document.createElement('div');
  signupPopup.id = 'signup-popup';
  document.body.appendChild(signupPopup);

  const headerSignupPopup = document.getElementById('signup-popup');

  const volunteerPopup = document.createElement('div');
  volunteerPopup.id = 'volunteer-popup';
  document.body.appendChild(volunteerPopup);

  const signupButton = document.getElementById('signup-event-button');
  const headerSignupButton = document.getElementById('signup-header-link');
  const volunteerButton = document.getElementById('vol-container');
  
  signupButton.addEventListener('click', function (e) {
    if (currentDate < signupStart) {
      e.preventDefault();
      signupPopup.textContent = `Thanks for your interest! Signups open on ${signupStart.toLocaleString()}`;
      signupPopup.style.display = 'block';

      const hide = () => {
        signupPopup.style.display = 'none';
        document.removeEventListener('click', hide);
        clearTimeout(autoHide);
      };
      const autoHide = setTimeout(hide, 3500);
      setTimeout(() => document.addEventListener('click', hide), 0);

    } else {
      const ref = getParameterByName('ref');
      if (ref) {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=${encodeURIComponent(ref)}`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=${encodeURIComponent(ref)}`;
          });
      } else {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=web_other`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=web_other`;
          });
        window.location.href = '/hackstoga/signup/signup.html';
      }
    }
  });

  headerSignupButton.addEventListener('click', function (e) {
    if (currentDate < signupStart) {
      e.preventDefault();
      headerSignupPopup.textContent = `Thanks for your interest! Signups open on ${signupStart.toLocaleString()}`;
      headerSignupPopup.style.display = 'block';

      const hide = () => {
        headerSignupPopup.style.display = 'none';
        document.removeEventListener('click', hide);
        clearTimeout(autoHide);
      };
      const autoHide = setTimeout(hide, 3500);
      setTimeout(() => document.addEventListener('click', hide), 0);

    } else {
      const ref = getParameterByName('ref');
      if (ref) {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=${encodeURIComponent(ref)}`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=${encodeURIComponent(ref)}`;
          });
      } else {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=web_other`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/signup.html?ref=web_other`;
          });
        window.location.href = '/hackstoga/signup/signup.html';
      }
    }
  });

    volunteerButton.addEventListener('click', function (e) {
    if (currentDate < volunteerStart) {
      e.preventDefault();
      volunteerPopup.textContent = `Thanks for your interest! Volunteer signups open on ${volunteerStart.toLocaleString()}`;
      volunteerPopup.style.display = 'block';

      const hide = () => {
        volunteerPopup.style.display = 'none';
        document.removeEventListener('click', hide);
        clearTimeout(autoHide);
      };
      const autoHide = setTimeout(hide, 3500);
      setTimeout(() => document.addEventListener('click', hide), 0);

    } else {
      const ref = getParameterByName('ref');
      if (ref) {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/volunteer.html?ref=${encodeURIComponent(ref)}`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/volunteer.html?ref=${encodeURIComponent(ref)}`;
          });
      } else {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/volunteer.html?ref=web_other`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/volunteer.html?ref=web_other`;
          });
        window.location.href = '/hackstoga/signup/volunteer.html';
      }
    }
  });
})
