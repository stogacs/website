let shekelsOnTop = true;
let currentPrice = 0.0;

function sseSubscribe() {
  let price = document.getElementById('dd-conv');
  const source = new EventSource('https://shekels.mrsharick.com/events/dewees-dollars');
  source.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    currentPrice = data.price;
    price.innerHTML = data.price.toFixed(2) + ' Dewees Dollars';
    convert();
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  let userInfo = await verifyUser();
  if (userInfo != null) {
    if (userInfo.name == null) {
      window.location.href = '/leaderboard/onboarding/claim.html';
    }
    const bal = document.getElementById('shekel-bal');
    bal.textContent = bal.textContent.replace('0', userInfo.shekels);
  }
  sseSubscribe();
  document.getElementById('conv-quantity').addEventListener('input', convert);
  document.getElementById('swap-button').addEventListener('click', toggleCurrency);
});

function convert() {
  let input = document.getElementById('conv-quantity');
  let inputLabel = document.getElementById('conv-input-label');
  let res = document.getElementById('conv-result');

  if (isNaN(input.value)) {
    return;
  }
  if (shekelsOnTop) {
    inputLabel.innerHTML = 'Sharick Shekel';
  } else {
    inputLabel.innerHTML = 'Dewees Dollar';
  }
  if (input.value != 1) {
    inputLabel.innerHTML += 's';
  }

  if (shekelsOnTop) {
    res.innerHTML = (input.value * currentPrice).toFixed(2) + ' Dewees Dollars';
  } else {
    res.innerHTML = (input.value / currentPrice).toFixed(2) + ' Shekels';
  }
}

function toggleCurrency() {
  shekelsOnTop = !shekelsOnTop;
  document.getElementById('conv-quantity').value = Math.round(
    document.getElementById('conv-result').textContent.split(' ')[0],
  );
  convert();
}
