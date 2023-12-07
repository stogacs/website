let shekelsOnTop = true;
let currentPrice = 0.0;
let lastInterval = '5m';
newChart = null;
let labels = [];
let prices = [];

intervals = Object.freeze({
  '1m': 1,
  '5m': 5,
  '15m': 15,
  '30m': 30,
  '1h': 60,
  '4h': 240,
  '1d': 1440,
  '1w': 10080,
  '1mo': 43200,
  '3mo': 129600,
  '1y': 525600,
});

logSendIntervals = Object.freeze({
  '1m': 1,
  '5m': 1,
  '15m': 2,
  '30m': 4,
  '1h': 4,
  '4h': 12,
  '1d': 96,
  '1w': 672,
  '1mo': 2880,
  '3mo': 8640,
  '1y': 43200,
});

function sseSubscribe() {
  let price = document.getElementById('dd-conv');
  const source = new EventSource('https://shekels.mrsharick.com/events/trading/dd/price');
  let i = 0;

  source.addEventListener('message', function (event) {
    i++;
    runEvery = logSendIntervals[lastInterval.toString()];
    const data = JSON.parse(event.data);
    currentPrice = data.price;
    addData(newChart, data.timestamp, data.price);
    if (i % runEvery == 0) {
      addData(newChart, data.timestamp, data.price);
      removeFirstData(newChart);
    }

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

  getChart('dd', '5m');

  const btnRow = document.getElementById('row');
  for (let i = 0; i < btnRow.children.length; i++) {
    btnRow.children[i].addEventListener('click', function () {
      lastInterval = btnRow.children[i].id.split('-')[1];
      getChart('dd', btnRow.children[i].id.split('-')[1]);
    });
  }
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

function getChart(currency, interval, reload = false) {
  document.getElementById('reload-text').textContent = 'Loading Chart...';
  if (newChart != null) {
    newChart.destroy();
  }
  document.getElementById('chart').classList.add('hidden');
  if (!reload) {
    document.getElementById('loader').classList.remove('hidden');
  }

  const btnRow = document.getElementById('row');

  for (let i = 0; i < btnRow.children.length; i++) {
    btnRow.children[i].classList.remove('selected');
  }

  const pressedButton = document.getElementById('time-' + interval);
  pressedButton.classList.add('selected');

  fetch(`https://shekels.mrsharick.com/trading/${currency}/history/${interval}`)
    .then((response) => response.json())
    .then((data) => {
      labels = data.history.map((data) => data.timestamp);
      prices = data.history.map((data) => data.price);
      const diff = prices[prices.length - 1] - prices[0];
      const timeDiff = new Date(labels[labels.length - 1]) - new Date(labels[0]);
      let stepSize = [];
      switch (interval) {
        case '1m':
          stepSize = ['second', 1000];
          break;
        case '5m':
          stepSize = ['minute', 60000];
          break;
        case '15m':
          stepSize = ['minute', 60000];
          break;
        case '30m':
          stepSize = ['minute', 60000];
          break;
        case '1h':
          stepSize = ['minute', 60000];
          break;
        case '4h':
          stepSize = ['hour', 3600000];
          break;
        case '1d':
          stepSize = ['hour', 3600000];
          break;
        case '1w':
          stepSize = ['day', 86400000];
          break;
        case '1mo':
          stepSize = ['day', 86400000];
          break;
        case '3mo':
          stepSize = ['month', 2.628e9];
          break;
        case '1y':
          stepSize = ['month', 2.628e9];
          break;
        default:
          stepSize = ['minute', 60000];
          break;
      }

      //if there is less data then selected interval, add a point at the beginning repeating the first price
      //slack of 1 minute
      if (timeDiff + 60000 < intervals[interval] * 60000) {
        document.getElementById('reload-text').textContent = 'Processing data...';
        // go back every minute until the time difference is greater than the interval
        let i = 1;
        while (
          new Date(labels[labels.length - 1]) - new Date(labels[0]) + 60000 <
          intervals[interval] * 60000
        ) {
          labels.unshift(new Date(new Date(labels[0]).getTime() - i * 60000).toISOString());
          prices.unshift(prices[0]);
          i++;
        }
      }
      document.getElementById('reload-text').textContent = 'Finalizing...';

      const color = diff > 0 ? 'rgb(119, 221, 118)' : 'rgb(255, 105, 98)';

      const config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Price',
              data: prices,
              borderColor: color,
              fill: false,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 0,
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            legend: {
              display: false,
              onClick: (e) => e.stopPropagation(),
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat().format(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: stepSize[0],
                displayFormats: {
                  hour: 'h:mm a',
                  minute: 'h:mm a',
                  second: ':ss',
                  day: 'MMM d',
                },
              },
              format: {},
              title: {
                display: true,
                text: 'Time',
              },
              ticks: {
                maxTicksLimit: 6,
                minRotation: 0,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price ($)',
              },
            },
          },
        },
      };

      document.getElementById('loader').classList.add('hidden');
      document.getElementById('chart').classList.remove('hidden');
      // Instantiate the chart on your canvas
      const ctx = document.getElementById('chart');
      newChart = new Chart(ctx, config);
    });
}

// function from https://www.chartjs.org/docs/latest/developers/updates.html
function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
  });
  chart.update();
}

function removeFirstData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
  chart.update();
}
