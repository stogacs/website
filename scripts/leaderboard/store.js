document.addEventListener('DOMContentLoaded', async function () {
  let userinfo;
  await verifyUser().then((userInfo) => {
    userinfo = userInfo;
    if (userInfo != null) {
      if (userInfo.name == null) {
        window.location.href = '/leaderboard/onboarding/claim.html';
      }
    } else {
      document.getElementById('alert-signin').style = 'display: inline-flex;';
      document.getElementById('account-description').innerText =
        'Sign in to see your account details.';
      document.getElementById('past-purchase-button').classList.add('pure-button-disabled');
    }

    fetch('https://shekels.mrsharick.com/me/purchases?discordAuth=' + getCookie('discordAuth'))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let latestPurchase;
          if (data.products.length > 0) {
            latestPurchase = data.products[0].title + ' (' + data.products[0].price + ' Shekels)';
          } else {
            latestPurchase = 'Never';
          }
          document.getElementById('account-description').innerHTML =
            `<p id="account-description" class="center-text">` +
            'Shekels: ' +
            userInfo.shekels +
            '<br>Last Purchase: ' +
            latestPurchase +
            `</p>`;
          document.getElementById('account-title').innerHTML = userInfo.name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  try {
    const response = await fetch('https://shekels.mrsharick.com/shop/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    items = Object.values(data.products);
    element = document.getElementById('shop-cards');
    if (items.length > 0) {
      items.forEach((item) => {
        createCard(element, item);
      });
      items.forEach((item) => {
        if (item.hasImg) {
          updateCard(item.id, fetchImage(item.id));
        }
      });
    } else {
      document.getElementById('error-display').innerHTML =
        "There's nothing in store for you at the moment...";
    }
  } catch (error) {
    console.error(error);
  }
});

function createCard(parent, item) {
  const card = document.createElement('div');
  card.innerHTML = `<div class="card pure-g">
    <div class="card-content center-text">
      <div>
        <b id="title" class="center-text">${item.title}</b>
      </div>
      <img style="padding:30px;" id="${item.id}">
      <div>
        <p id="description" class="center-text">${item.description}</p>
      </div>
      <div class="button-container">
        <button type="button" id="${item.id}" class="buy-button pure-button button-secondary">
          <div class="button-content">
            <p class="button-text" id="${item.id}">Buy - ${item.price} Shekels</p>
          </div>
        </button>
      </div>
    </div>
  </div>`;

  parent.appendChild(card);
}

function updateCard(id, img) {
  let imageElement = document.getElementById(id);
  imageElement.src = img;
}

// this is here because it used to be a lot stupider...
function fetchImage(id) {
  return `https://shekels.mrsharick.com/getasset/shop_${id}.png`;
}

document.addEventListener('click', function (event) {
  if (
    event.target &&
    (event.target.classList.contains('buy-button') ||
      event.target.classList.contains('button-text'))
  ) {
    buyProduct(event.target.id);
  }
});

function buyProduct(id) {
  fetch(
    'https://shekels.mrsharick.com/shop/purchase?' + 'discordAuth=' + getCookie('discordAuth'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        discordAuth: getCookie('discordAuth'),
        itemID: id,
      }),
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.success) {
        window.location.href = '/leaderboard/shop/past.html';
      } else {
        document.getElementById('error-display').innerHTML = result.message;
      }
    })
    .catch((error) => {
      document.getElementById('error-display').innerHTML = 'Failed to communicate with server.';
      console.error(error);
    });
}
