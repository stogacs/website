document.addEventListener("DOMContentLoaded", async function() {
    await verifyUser().then(userInfo => {
        if (userInfo != null) {
            if (userInfo.name == null) {
                window.location.href = "/leaderboard/onboarding/claim.html";
            }
        }else {
            window.location.href = "/401";
        }
    });
});

function submitData() {
    document.getElementById("loader").style.display = "";


    fetch("https://csboard.ddns.net/leaderboard/update_prefs?discordAuth=" + getCookie("discordAuth"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "display_name": document.getElementById("display-name-for").value,
        })
    })
    .then(response => {
        return response.json();
    })
    .then(result => {
        // if code is 200, redirect to leaderboard
        console.log(result)
        if (result.success) {
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
