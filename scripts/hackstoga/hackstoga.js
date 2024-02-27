document.addEventListener('DOMContentLoaded', async function () {
  const signupStart = new Date('2024-02-05T08:00:00-05:00');
  if (Date.now() > signupStart) {
    document.getElementById('signup-event-button').addEventListener('click', () => {
      const ref = getParameterByName('ref');
      if (ref) {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/?ref=${encodeURIComponent(ref)}`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/?ref=${encodeURIComponent(ref)}`;
          });
      } else {
        logAnalytics('hs_button_click', JSON.stringify({ ref: ref }))
          .then((result) => {
            window.location.href = `/hackstoga/signup/?ref=web_other`;
          })
          .catch((err) => {
            window.location.href = `/hackstoga/signup/?ref=web_other`;
          });
        window.location.href = '/hackstoga/signup';
      }
    });
  }
});
