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
    fetch("https://csboard.ddns.net/users")
    .then(response => response.json())
    .then(data => {          
        if (! data.disabled) {
            // sort by name alphabetically first, then by shekels descending
            data.sort((a, b) => {
                const aDisplayName = a.display_name || removeMiddle(a.name) || 'N/A';
                const bDisplayName = b.display_name || removeMiddle(b.name) || 'N/A';
            
                if (a.discord_linked && !b.discord_linked) {
                    return -1; // a has discord_linked and b doesn't
                } else if (!a.discord_linked && b.discord_linked) {
                    return 1; // b has discord_linked and a doesn't
                } else {
                    // Both have or don't have discord_linked, sort alphabetically by display name
                    return aDisplayName.toLowerCase().localeCompare(bDisplayName.toLowerCase());
                }
            });
            
            // sort the remaining users by shekels count in descending order
            data.sort((a, b) => parseInt(b.shekels) - parseInt(a.shekels));
            

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
document.addEventListener("DOMContentLoaded", function() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
    getLeaderboard();
});