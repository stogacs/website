function getPurchases(userInfo) {
  const isAdmin = userInfo?.admin;
  let leaderboard = document.getElementById('leaderboard-list');
  const leaderboardTable = document.createElement('table');
  leaderboardTable.className = 'leaderboard center-text';
  specialColors = ['gold', 'silver', '#9F7A34'];
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

  fetch('https://cs-services.stoga.club/users')
    .then((response) => response.json())
    .then((data) => {
      if (!data.disabled) {
        let groupedByShekels = {};

        data.forEach((user) => {
          if (!groupedByShekels[user.shekels]) {
            groupedByShekels[user.shekels] = [];
          }
          groupedByShekels[user.shekels].push(user);
        });

        let sortedShekels = Object.keys(groupedByShekels).sort((a, b) => b - a);

        let rank = 1;

        // add each user to the table
        sortedShekels.forEach((shekels) => {
          let usersWithSameShekels = groupedByShekels[shekels];
          usersWithSameShekels.forEach((user) => {
            tableContent += createUserContent(user, isAdmin, rank);
          })

          rank += usersWithSameShekels.length;
        })

        leaderboardTable.innerHTML = tableContent;
        leaderboard.innerHTML = '';
        if (isAdmin) {
          document.getElementById('new-row-button').style.display = '';
          document.getElementById('save-button').style.display = '';
          let footer = document.getElementById('footer-text');
          footer.innerHTML = `<p class="center-text" id="footer-text">As an administrator, you can edit the leaderboard by editing the value in a cell and saving<br>An empty display name will result in the real name being displayed.</p>`;
        }
        leaderboard.appendChild(leaderboardTable);
      } else {
        leaderboard.innerHTML = `<p class="center-text error-text">Web access to the leaderboard is disabled.</p>`;
        document.getElementById('footer-text').innerText = data.hasOwnProperty('message')
          ? data.message
          : 'Access to the leaderboard has been disabled by a club officer.';
      }
    })
    .catch((error) => {
      leaderboard.innerHTML = `<p class="center-text error-text">An error occurred while accessing the leaderboard.</p>`;
      console.log(error);
    });
}

function createUserContent(user, isAdmin, rank) {
  let name = user.display_name || removeMiddle(user.name) || 'N/A';
  let shekels = parseInt(user.shekels) !== 0 ? parseInt(user.shekels) || 'N/A' : 0;
  let discord_linked = user.discord_linked;
  let shekelTags = isAdmin
    ? [
      `<input class="center-text admin-num-input" type="number" min="0" value="${shekels}"`,
      `input`,
    ]
    : ['<p>' + shekels, 'p'];
  let nameTags = isAdmin
    ? [
      `<input class="center-text admin-text-input" id="real-name" type="text" value="${user.name}"> <input class="center-text admin-text-input" id="display-name" type="text" value="${user.display_name}">`,
      `</input>`,
      '<img src="/media/misc/delete.png" onclick="deleteUser(\'' +
      user.id +
      '\')"></img>',
    ]
    : ['' + name, '', ''];
  let styleTag = '';
  if (rank - 1 < specialColors.length) {
    styleTag = `style="color: ${specialColors[rank - 1]}"`;
  }

  tableContent = `
    <tr shekel_guid="${user.id}">
      <td ${styleTag}>
        <span>${shekels === 0 ? '-' : '#' + rank}</span>
      </td>
      <td>${nameTags[0]}${nameTags[1]}${nameTags[2]}${discord_linked ? '<img src="/media/misc/verified.png"></img>' : ''}</td>
      <td>${shekelTags[0]}</${shekelTags[1]}></td>
    </tr>
    `;      
  return tableContent;
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

  fetch('https://cs-services.stoga.club/users/update?discordAuth=' + getCookie('discordAuth'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  }).then((response) => {
    if (response.status == 200) {
      window.location.reload();
    } else {
      response.json().then((data) => {
        document.getElementById(
          'subheading',
        ).innerHTML = `<p class="center-text error-text">${data.message}</p>`;
      });
    }
  });
}

//Visually delete the user from the table, does not send an api request anymore
function deleteUser(shekel_guid) {
  const leaderboardTable = document.getElementsByClassName('leaderboard')[0];
  const rows = leaderboardTable.getElementsByTagName('tr');
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (row.getAttribute('shekel_guid') == shekel_guid) {
      row.remove();
      break;
    }
  }
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

function getOrdinalSuffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return 'st';
  }
  if (j == 2 && k != 12) {
    return 'nd';
  }
  if (j == 3 && k != 13) {
    return 'rd';
  }
  return 'th';
}

function ordinal(i) {
  return i + getOrdinalSuffix(i);
}

function removeMiddle(name) {
  let nameArray = name.split(' ');
  if (nameArray.length > 2) {
    nameArray.splice(1, 1);
    return nameArray.join(' ');
  } else {
    return name;
  }
}

// On page load
document.addEventListener('DOMContentLoaded', async function () {
  let userInfo = await verifyUser();
  if (userInfo != null) {
    if (userInfo.name == null) {
      window.location.href = '/leaderboard/onboarding/claim.html';
    }
  }

  cookie = getCookie('postLoginRedir');
  if (cookie) {
    if (!cookie.includes('http')) {
      redir = setCookie('postLoginRedir', '', 0);
      setCookie('postLoginRedir', '', 0);
      window.location.href = decodeURIComponent(cookie);
    }
  }
  let leaderboard = document.getElementById('leaderboard-list');
  leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;
  getPurchases(userInfo);
  let chars = 'ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ⚍⍊ᑑ/||⨅';
  function textEffect() {
    try {
      document.getElementById('enchanted').innerHTML =
        chars.charAt(Math.floor(Math.random() * chars.length)) +
        chars.charAt(Math.floor(Math.random() * chars.length));
    } catch (e) {}
  }
  setInterval(textEffect, 41);
});
