document.addEventListener("DOMContentLoaded", async function () {
    await verifyUser().then(userInfo => {
        if (userInfo != null) {
            if (userInfo.name == null) {
                window.location.href = "/leaderboard/onboarding/claim.html";
            }
        } else {
            window.location.href = "/401";
        }
    });
});

function getLoginCode() {
    fetch("https://shekels.mrsharick.com/me/login_code?discordAuth=" + getCookie("discordAuth"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Return the promise
            } else {
                document.getElementById("code-display").innerHTML = "<p class='error-text'>Failed to fetch login code</p>";
            }
        })
        .then(data => {
            // Now data contains the parsed JSON response
            codeString = data.logonCode.toString();
            document.getElementById("code-display").innerText = codeString.substr(0, 3) + "-" + codeString.substr(3, 6);
            button = document.getElementById("code-button");
            button.innerText = "Expires In " + Math.max(1, Math.trunc(Math.round((data.expiresIn / 60) / 1000))) + " Minutes";
            button.className = "pure-button pure-button-primary pure-button-disabled";
        })
        .catch(error => {
            document.getElementById("code-display").innerHTML = "<p class='error-text'>Failed to communicate with server.</p>";
            console.error(error);
        });
}


function submitData() {
    document.getElementById("loader").style.display = "";


    fetch("https://shekels.mrsharick.com/leaderboard/update_prefs?discordAuth=" + getCookie("discordAuth"), {
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
