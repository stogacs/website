function getPurchases(userInfo) {
  const noPurchaseText = [
    'You have not purchased anything yet.',
    "We looked far and wide but couldn't find any purchases.",
    'Despite our diligent search, not a single item found its way into your possession.',
    'Why did you even come here? You got to buy something first.',
    'Why are we even here? Just to suffer?',
    "Like a magician's assistant with a pocketful of empty hats, we pulled nothing out of our bag of tricks.",
    'Nobody here but us chickens.',
  ];
  let chart = document.getElementById('purchases-table');
  const purchaseTable = document.createElement('table');
  purchaseTable.className = 'leaderboard center-text';
  let tableContent = `<table id="purchases-table">
        <tr">
            <td class="table-date">Date</td>
            <td class="table-exp">Expires</td>
            <td class="table-name">Description</td>
            <td class="table-pr">Shekels</td>
            <!-- <td class="table-qty">Qty</td> -->
        </tr>`;
  fetch('https://shekels.mrsharick.com/me/purchases?discordAuth=' + getCookie('discordAuth'))
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        data.products.reverse();
        if (data.products.length > 0) {
          for (let i = 0; i < data.products.length; i++) {
            console.log(data.products[i]);
            let expiry;
            data.products[i].expires_after == null
              ? (expiry = 'Never')
              : (expiry = new Date(data.products[i].expires_after).toLocaleString().split(',')[0]);
            ts = data.products[i].timestamp = new Date(data.products[i].timestamp);
            tableContent += `
                        <tr onclick="toggleContent(${i})" id="row-product-${data.products[i].id}">
                            <td class="table-date">${ts.toLocaleString().split(',')[0]}</td>
                            <td class="table-exp">${expiry}</td>
                            <td class="table-title">${data.products[i].title}</td>
                            <td class="table-pr">${data.products[i].price}</td>
                        </tr>`;
          }
        } else {
          tableContent += `<tr><td colspan="4">${
            noPurchaseText[Math.floor(Math.random() * noPurchaseText.length)]
          }</td></tr>`;
        }

        purchaseTable.innerHTML = tableContent;
        chart.innerHTML = purchaseTable.outerHTML;
      } else {
        tableContent += `<tr><td colspan="4">An error occured while fetching your purchases..</td></tr>`;
      }
    })
    .catch((error) => {
      chart.innerHTML = `<tr><td colspan="4"><p class="center-text error-text">An unhandled error occured while getting your purchases.</p></td></tr>`;
      console.log(error);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
  let userInfo;
  await verifyUser().then((userInfo) => {
    if (userInfo != null) {
      if (userInfo.name == null) {
        window.location.href = '/leaderboard/onboarding/claim.html';
      }
    } else {
      window.location.href = '/401';
    }
    userInfo = userInfo;
  });
  let chart = document.getElementById('purchases-table');
  chart.innerHTML = `<p class="center-text">Now Loading...</p>`;
  getPurchases(userInfo);
});
