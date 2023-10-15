function getPurchases(userInfo) {
    let chart = document.getElementById("purchases-table");
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
    fetch("https://shekels.mrsharick.com/me/purchases?discordAuth=" + getCookie("discordAuth"))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.products.reverse();
                if (data.products.length > 0) {
                    for (let i = 0; i < data.products.length; i++) {
                        for (let j = 0; j < data.products[i].timestamps.length; j++) {
                            console.log(data.products[i])
                            let expiry;
                            data.products[i].expires_after == null ? expiry = "Never" : expiry = new Date(data.products[i].expires_after[j]).toLocaleString().split(",")[0];
                            ts = data.products[i].timestamps[j] = new Date(data.products[i].timestamps[j]);
                            tableContent += `
                        <tr onclick="toggleContent(${i})" id="row-product-${data.products[i].id}">
                            <td class="table-date">${ts.toLocaleString().split(",")[0]}</td>
                            <td class="table-exp">${expiry}</td>
                            <td class="table-title">${data.products[i].title}</td>
                            <td class="table-pr">${data.products[i].price}</td>
                        </tr>`
                        }
                    }
                } else {
                    tableContent += `<tr><td colspan="4">We looked far and wide but couldn't find any purchases.</td></tr>`;
                }

                purchaseTable.innerHTML = tableContent;
                chart.innerHTML = purchaseTable.outerHTML;
            } else {
                tableContent += `<tr><td colspan="4">An error occured while fetching your purchases..</td></tr>`;
            }
        })
        .catch(error => {
            chart.innerHTML = `<p class="center-text error-text">An unhandled error occured while getting your purchases.</p>`;
            console.log(error)
        });
}


document.addEventListener("DOMContentLoaded", async function() {
    let userInfo = await verifyUser();
    if (userInfo != null) {
        if (userInfo.name == null) {
            window.location.href = "/leaderboard/onboarding/claim.html";
        }
    }
    let chart = document.getElementById("purchases-table");
    chart.innerHTML = `<p class="center-text">Now Loading...</p>`;
    getPurchases(userInfo);
});