document.addEventListener("DOMContentLoaded", async function() {
    // update navs with user's name
    let navbar = document.getElementById("navbar-links");
    navbar.innerHTML += `<li id="loader"><p>Now Loading</p></li>`;
    getLoginDetails();
    await verifyUser().then(userInfo => {
        document.getElementById("loader").remove();
        if (userInfo != null) {
            let displayTag = userInfo.discordDiscriminator == 0 ? "" : "#" + userInfo.discordDiscriminator;
            navbar.innerHTML += `<li><a href="/leaderboard/manage.html">${userInfo.discordUsername + displayTag}</a></li>`;
            if (userInfo.linked) {
                window.location.href = "/leaderboard";
            }
        }else {
            window.location.href = "/401";
        }
    });

});

function submitData() {
    document.getElementById("loader").style.display = "";

    let form = document.getElementById("claim-form");
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch("https://csboard.ddns.net/leaderboard/claim", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .then(result => {
        // if code is 200, redirect to leaderboard
        if (result.code == 200) {
            window.location.href = "/leaderboard";
        } else {
            document.getElementById("error-display").innerHTML = result.message;
        }
        document.getElementById("loader").style.display = "none";
    })
    .catch(error => {
        console.log(error);
        document.getElementById("error-display").innerHTML = "An error occurred while communicating with the server, please try again later.";
        document.getElementById("loader").style.display = "none";
    });

    return false;
};
