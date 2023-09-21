function getLeaderboard(userInfo) {
    const isAdmin = userInfo?.admin;
    let leaderboard = document.getElementById("leaderboard-list");
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard center-text';
    specialColors = ["gold", "silver", "#9F7A34"]
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
            if (!data.disabled) {
                for (let i = 0; i < data.length; i++) {
                    // add each user to the table
                    let rank = ordinal(i + 1);
                    let name = data[i].displayName || removeMiddle(data[i].name) || 'N/A';
                    let shekels = (parseInt(data[i].shekels) !== 0) ? (parseInt(data[i].shekels) || 'N/A') : 0;
                    let discord_linked = data[i].discord_linked;
                    let shekelTags = isAdmin ? [`<input class="center-text admin-num-input" type="number" min="0" value="${shekels}"`, `input`] : ["<p>" + shekels, "p"];
                    let nameTags = isAdmin ? [`<input class="center-text admin-text-input" id="real-name" type="text" value="${data[i].name}"> <input class="center-text admin-text-input" id="display-name" type="text" value="${data[i].displayName}">`, `</input>`, "<img src=\"/media/misc/delete.png\" onclick=\"deleteUser('"+ data[i].id + "')\"></img>"] : ["" + name, "", ""];
                    let styleTag = "";
                    console.log(rank)
                    if (i < specialColors.length) {
                        styleTag = `style="color: ${specialColors[i]}"`;
                    }

                        if (discord_linked) {
                            tableContent += `
                            <tr shekel_guid="${data[i].id}">
                            <td ${styleTag}>${rank}</td>
                            <td>${nameTags[0]}${nameTags[1]}${nameTags[2]}<img src="/media/misc/verified.png"></img></td>
                            <td>${shekelTags[0]}</${shekelTags[1]}></td>
                        </tr>
                    `;
                        } else {
                            tableContent += `
                            <tr shekel_guid="${data[i].id}">
                                <td ${styleTag}>${rank}</td>
                                <td>${nameTags[0]}${nameTags[1]}${nameTags[2]}</td>
                                <td>${shekelTags[0]}</${shekelTags[1]}></td>
                            </tr>
                        `;
                        }

                    }


                leaderboardTable.innerHTML = tableContent;
                leaderboard.innerHTML = '<p class="center-text" id="subheading">A badge indicates this person has linked their Discord account to the leaderboard.</p>';
                if (isAdmin) {
                    document.getElementById("new-row-button").style.display = "";
                    document.getElementById("save-button").style.display = "";
                    let footer = document.getElementById("footer-text");
                    footer.innerHTML = `<p class="center-text" id="footer-text">As an administrator, you can edit the leaderboard by editing the value in a cell and saving<br>An empty display name will result in the real name being displayed.</p>`;
                }
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

function updateLeaderboard() {
    const leaderboardTable = document.getElementsByClassName('leaderboard')[0];
    const rows = leaderboardTable.getElementsByTagName('tr');
    const data = [];

    // skipping the first 2 rows!!!
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const shekel_guid = row.getAttribute('shekel_guid');
        const real_name = row.getElementsByTagName('input')[0].value;
        const display_name = row.getElementsByTagName('input')[1].value;
        const shekels = row.getElementsByTagName('input')[2].value;
        data.push({ shekel_guid, real_name, display_name, shekels });
    }

    const json = JSON.stringify(data);
    console.log(json);

    fetch("https://shekels.mrsharick.com/users/update?discordAuth=" + getCookie("discordAuth"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }).then(response => {
        if (response.status == 200) {
            window.location.reload();
        } else {
            response.json()
            .then(data => {
                console.log(response)
                document.getElementById("subheading").innerHTML = `<p class="center-text error-text">${data.message}</p>`;
            })
        }
    });
}

function deleteUser(shekel_guid) {
    // fetch("https://shekels.mrsharick.com/users/delete?discordAuth=" + getCookie("discordAuth") + "&shekel_guid=" + shekel_guid, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => {
    //     if (response.status == 200) {
            const leaderboardTable = document.getElementsByClassName('leaderboard')[0];
            const rows = leaderboardTable.getElementsByTagName('tr');
            for (let i = 2; i < rows.length; i++) {
                const row = rows[i];
                if (row.getAttribute('shekel_guid') == shekel_guid) {
                    row.remove();
                    break;
                }
            }
        // } else {
        //     // Handle error response
        //     response.json()
        //         .then(data => {
        //             console.log(data); // Log the response data
        //             document.getElementById("subheading").innerHTML = `<p class="center-text error-text">${data.message}</p>`;
        //         })
        //         .catch(error => {
        //             console.error("Error parsing JSON response:", error);
        //         });
        // }
    // })
    // .catch(error => {
    //     console.error("Error sending the request:", error);
    // });
}

function newRow() {
    const leaderboardTable = document.getElementsByClassName('leaderboard')[0];
    const row = leaderboardTable.insertRow(-1);
    row.innerHTML = `
        <td></td>
        <td><input class="center-text admin-text-input" id="real-name" type="text" value=""> <input class="center-text admin-text-input" id="display-name" type="text" value=""></input></td>
        <td><input class="center-text admin-num-input" type="number" min="0" value="0"></input></td>
    `;
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
document.addEventListener("DOMContentLoaded", async function () {
    let userInfo = await verifyUser();
    if (userInfo != null) {
        if (userInfo.name == null) {
            window.location.href = "/leaderboard/onboarding/claim.html";
        }
    }
    let leaderboard = document.getElementById("leaderboard-list");
    leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
    getLeaderboard(userInfo);
    // isUpToDate().then(result => {
    //     if (!result) {
    //         errorDisplay = document.getElementById("error-display");
    //         errorDisplay.innerHTML += `<p class="center-text error-text">The server is running a newer version than this site expects. Please try refreshing.</p>`;
    //         errorDisplay.style.display = "";
    //     }
    // });
    let chars = "ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ⚍⍊ᑑ/||⨅";
    function textEffect() {
        try { document.getElementById("enchanted").innerHTML = chars.charAt(Math.floor(Math.random() * chars.length)) + chars.charAt(Math.floor(Math.random() * chars.length)); }  catch (e) { }
    }
    setInterval(textEffect, 41);

});