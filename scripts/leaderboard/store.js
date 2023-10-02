document.addEventListener("DOMContentLoaded", async function () {
    // await verifyUser().then(userInfo => {
    //     if (userInfo != null) {
    //         if (userInfo.name == null) {
    //             window.location.href = "/leaderboard/onboarding/claim.html";
    //         }
    //     } else {
    //         window.location.href = "/401";
    //     }
    // });

    try {
        const response = await fetch("https://shekels.mrsharick.com/shop/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        Object.values(data).forEach(item => {
            if (item.hasImg) {
                createCard(document.getElementById("shop-cards"), item);
                fetchImage(item.id).then(img => {
                    updateCard(item.id, img);
                });
            } else {
                createCard(document.getElementById("shop-cards"), item);
            }
        });

    } catch (error) {
        console.error(error);
    }
});

function createCard(parent, item) {

    const card = document.createElement("div");
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
            <p class="button-text">Buy - ${item.price} Shekels</p>
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

function fetchImage(id) {
    return fetch(`https://shekels.mrsharick.com/getasset/shop_${id}.png`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  }


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-button")) {
        console.log("buying")
        buyProduct(event.target.id);

    }
});

  function buyProduct(id) {
    fetch("https://shekels.mrsharick.com/shop/purchase?" + "discordAuth=" + getCookie("discordAuth"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "discordAuth": getCookie("discordAuth"),
            "itemID": id
        })
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result)
            if (result.success) {
                window.location.href = "/shop/past.html";
            } else {
                document.getElementById("error-display").innerHTML = result.message;
            }
        })
        .catch(error => {
            document.getElementById("error-display").innerHTML = "Failed to communicate with server.";
            console.error(error);
        });
  }