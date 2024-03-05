var countDownDate = new Date('Mar 16, 2024 17:00:00').getTime();
const countDownElement = document.getElementById('countdown');
const img = document.getElementById('img');
showDays = false;

function getData() {
  countDownDate = new Date(fetchConstant('hsconclusion')).getTime();
  img.src = fetchConstant('hssubmitimg');

  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = prependZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
  if (parseInt(days) != 0) {
    showDays = true;
  }
}

function timer() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = showDays ? prependZero(Math.floor(distance / (1000 * 60 * 60 * 24))) + ':' : '';
  var hours = prependZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  var minutes = prependZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = prependZero(Math.floor((distance % (1000 * 60)) / 1000));

  countDownElement.innerHTML = days + hours + ':' + minutes + ':' + seconds;

  if (distance < 0) {
    clearInterval(startTimeInterval);
    countDownElement.innerHTML = 'EXPIRED';
  }
}

function prependZero(value) {
  return value < 10 ? '0' + value : value;
}

// On page load
document.addEventListener('DOMContentLoaded', async function () {
  getData();
  var TimeInterval = setInterval(timer, 1000);
});
