const specialColors = ['gold', 'silver', '#9F7A34'];

async function loadLeaderboard(profile) {
  const isAdmin = profile?.is_admin;
  const leaderboard = document.getElementById('leaderboard-list');
  if (!shekelsDb) {
    leaderboard.innerHTML = `<p class="center-text error-text">${NOT_CONFIGURED_MESSAGE}</p>`;
    return;
  }

  const { data: users, error } = await shekelsDb
    .from('profiles')
    .select('id, username, display_name, shekels')
    .order('shekels', { ascending: false })
    .order('display_name', { ascending: true });

  if (error) {
    leaderboard.innerHTML = `<p class="center-text error-text">An error occurred while accessing the leaderboard.</p>`;
    console.log(error);
    return;
  }

  let tableContent = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Shekels</th>
        </tr>
        <tr>
            <td> <p id="enchanted" style="color: var(--enchanted)">ᔑ!</p></td>
            <td>Mr. Sharick</td>
            <td>∞</td>
        </tr>
    `;

  // users tied on shekels share a rank, and the next rank skips ahead (1, 1, 3)
  let rank = 0;
  users.forEach((user, index) => {
    if (index == 0 || user.shekels != users[index - 1].shekels) {
      rank = index + 1;
    }
    tableContent += createUserContent(user, isAdmin, rank);
  });

  const leaderboardTable = document.createElement('table');
  leaderboardTable.className = 'leaderboard center-text';
  leaderboardTable.innerHTML = tableContent;
  leaderboard.innerHTML = '';
  leaderboard.appendChild(leaderboardTable);

  if (isAdmin) {
    document.getElementById('save-button').style.display = '';
    document.getElementById('footer-text').innerHTML =
      'As an administrator, you can edit display names and shekel counts in the table, then press Save.';
  }
}

function createUserContent(user, isAdmin, rank) {
  const displayName = escapeHtml(user.display_name);
  const username = escapeHtml(user.username);

  const nameCell = isAdmin
    ? `<input class="center-text admin-text-input" type="text" maxlength="40" value="${displayName}"
         data-original="${displayName}"> <span title="Username">(${username})</span>`
    : `<span title="${username}">${displayName}</span>`;
  const shekelCell = isAdmin
    ? `<input class="center-text admin-num-input" type="number" min="0" step="1" value="${user.shekels}"
         data-original="${user.shekels}">`
    : `<p>${user.shekels}</p>`;

  let styleTag = '';
  if (user.shekels > 0 && rank - 1 < specialColors.length) {
    styleTag = `style="color: ${specialColors[rank - 1]}"`;
  }

  return `
    <tr data-user-id="${user.id}">
      <td ${styleTag}>
        <span>${user.shekels === 0 ? '-' : '#' + rank}</span>
      </td>
      <td>${nameCell}</td>
      <td>${shekelCell}</td>
    </tr>
    `;
}

async function updateLeaderboard() {
  const saveButton = document.getElementById('save-button');
  const errorDisplay = document.getElementById('error-display');
  errorDisplay.style.display = 'none';

  const changes = [];
  for (const row of document.querySelectorAll('.leaderboard tr[data-user-id]')) {
    const nameInput = row.querySelector('.admin-text-input');
    const shekelInput = row.querySelector('.admin-num-input');
    const displayName = nameInput.value.trim();
    const shekels = Number(shekelInput.value);

    if (displayName.length < 1 || !Number.isInteger(shekels) || shekels < 0) {
      errorDisplay.innerText =
        'Every row needs a display name and a whole number of shekels that is 0 or more.';
      errorDisplay.style.display = '';
      return;
    }
    if (displayName != nameInput.dataset.original || shekels != Number(shekelInput.dataset.original)) {
      changes.push({ id: row.dataset.userId, display_name: displayName, shekels });
    }
  }

  if (changes.length == 0) {
    return;
  }

  saveButton.disabled = true;
  saveButton.innerText = 'Saving...';
  for (const change of changes) {
    const { data, error } = await shekelsDb
      .from('profiles')
      .update({ display_name: change.display_name, shekels: change.shekels })
      .eq('id', change.id)
      .select('id');
    if (error || data.length == 0) {
      errorDisplay.innerText = 'Some changes could not be saved. Make sure you are still logged in as an admin.';
      errorDisplay.style.display = '';
      saveButton.disabled = false;
      saveButton.innerText = 'Save';
      return;
    }
  }
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', async function () {
  const leaderboard = document.getElementById('leaderboard-list');
  leaderboard.innerHTML = `<p class="center-text">Loading leaderboard...</p>`;

  const profile = await getCurrentProfile();
  await loadLeaderboard(profile);

  const chars = 'ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ⚍⍊ᑑ/||⨅';
  function textEffect() {
    try {
      document.getElementById('enchanted').innerHTML =
        chars.charAt(Math.floor(Math.random() * chars.length)) +
        chars.charAt(Math.floor(Math.random() * chars.length));
    } catch (e) {}
  }
  setInterval(textEffect, 41);
});