function getLeaderboard() {
    let leaderboard = document.getElementById("leaderboard-list");
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard center-text';
    specialColors = ["gold", "silver", "bronze"]
    let tableContent = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Shekels</th>
        </tr>
    `;
    tableContent += `
        <tr>
            <td> <p id="enchanted" style="color: var(--enchanted)">ᔑ!</p></td>
            <td>Mr. Sharick</td>
            <td>∞</td>
        </tr>
    `;
    fetch("https://shekels.mrsharick.com/users")
    .then(response => response.json())
    .then(data => {          
        if (! data.disabled) {
            for (let i = 0; i < data.length; i++) {
                // add each user to the table
                let rank = ordinal(i + 1);
                let name = data[i].displayName || removeMiddle(data[i].name) || 'N/A';
                let shekels = (parseInt(data[i].shekels) !== 0) ? (parseInt(data[i].shekels) || 'N/A') : 0;
                let discord_linked = data[i].discord_linked;

                if (i < specialColors.length) {
                    styleTag = `style="color: ${specialColors[i]}"`
                } else {
                    styleTag = ""
                }
            
                if (!discord_linked) {
                tableContent += `
                    <tr>
                        <td ${styleTag}>${rank}</td>
                        <td>${name}</td>
                        <td>${shekels}</td>
                    </tr>
                `;
                } else {
                tableContent += `
                    <tr>
                        <td ${styleTag}>${rank}</td>
                        <td>${name} <img src="/media/misc/verified.png"></img></td>
                        <td>${shekels}</td>
                    </tr>
                `;
                }
            }
            

            leaderboardTable.innerHTML = tableContent;
            leaderboard.innerHTML = '<p class="center-text">A badge indicates this person has linked their Discord account to the leaderboard.</p>';
            leaderboard.appendChild(leaderboardTable);
        } else {
            leaderboard.innerHTML = `<p class="center-text error-text">Web access to the leaderboard is disabled.</p>`;
        }
    })
    .catch(error => {
        leaderboard.innerHTML = `<p class="center-text error-text">An error occurred while accessing the leaderboard.</p>`;
        console.log(error)
    }
    );
}

function ordinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function removeMiddle(name) {
    let nameArray = name.split(" ");
    if (nameArray.length > 2) {
        nameArray.splice(1, 1);
        return nameArray.join(" ");
    } else {
        return name;
    }
}


// On page load
document.addEventListener("DOMContentLoaded", async function() {
    let userInfo = await verifyUser();
    if (userInfo != null) {
        if (userInfo.name == null) {
            window.location.href = "/leaderboard/onboarding/claim.html";
        }
    }
    let leaderboard = document.getElementById("leaderboard-list");
    leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
    getLeaderboard();
    // isUpToDate().then(result => {
    //     if (!result) {
    //         errorDisplay = document.getElementById("error-display");
    //         errorDisplay.innerHTML += `<p class="center-text error-text">The server is running a newer version than this site expects. Please try refreshing.</p>`;
    //         errorDisplay.style.display = "";
    //     }
    // });
    let chars = "ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ⚍⍊ᑑ/||⨅";
    function textEffect() {
        document.getElementById("enchanted").innerHTML = chars.charAt(Math.floor(Math.random() * chars.length)) + chars.charAt(Math.floor(Math.random() * chars.length));
    }
    try {
        setInterval(textEffect, 41);
    } catch (e) { return; }

});