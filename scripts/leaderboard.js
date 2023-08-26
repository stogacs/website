function getLeaderboard() {
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard center-text';
    let tableContent = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Shekels</th>
        </tr>
    `;
    fetch("http://csboard.ddns.net/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.sort((a, b) => (a.Shekels < b.Shekels) ? 1 : -1); // sort descending by shekels
        if (!data.hasOwnProperty('disabled')) {
            for (let i = 0; i < data.length; i++) {
                let rank = ordinal(i + 1);
                let name = data[i].displayName || removeMiddle(data[i].name) || 'N/A';
                let shekels = data[i].Shekels;
                let discordLinked = data[i].discordLinked;
            
                if (!discordLinked) {
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
document.addEventListener("DOMContentLoaded", function() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
    getLeaderboard();
});