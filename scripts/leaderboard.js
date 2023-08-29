function getLeaderboard() {
    let leaderboard = document.getElementById("leaderboard-list");
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard center-text';
    let tableContent = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Shekels</th>
        </tr>
    `;
    fetch("https://csboard.ddns.net/users")
    .then(response => response.json())
    .then(data => {          
        if (! data.disabled) {
            for (let i = 0; i < data.length; i++) {
                // add each user to the table
                let rank = ordinal(i + 1);
                let name = data[i].display_name || removeMiddle(data[i].name) || 'N/A';
                let shekels = (parseInt(data[i].shekels) !== 0) ? (parseInt(data[i].shekels) || 'N/A') : 0;
                let discord_linked = data[i].discord_linked;
            
                if (!discord_linked) {
                tableContent += `
                    <tr>
                        <td>${rank}</td>
                        <td>${name}</td>
                        <td>${shekels}</td>
                    </tr>
                `;
                } else {
                tableContent += `
                    <tr>
                        <td>${rank}</td>
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
    let navbar = document.getElementById("navbar-links");
    navbar.innerHTML += `<li id="loader"><p>Now Loading</p></li>`;
    getLoginDetails();
    await verifyUser().then(userInfo => {
        document.getElementById("loader").remove();
        if (userInfo != null) {
            let displayTag = userInfo.discordDiscriminator == 0 ? "" : "#" + userInfo.discordDiscriminator;
            navbar.innerHTML += `<li><a href="/leaderboard/manage.html">${userInfo.discordUsername + displayTag}</a></li>`;
        }else {
            navbar.innerHTML += `\n<li><a href="https://csboard.ddns.net/login">Login</a></li>`;
        }
        let leaderboard = document.getElementById("leaderboard-list");
        leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
        getLeaderboard();
    });
});