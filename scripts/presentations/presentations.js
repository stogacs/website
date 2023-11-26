const link = 'https://shekels.mrsharick.com/';
let userinfo;
document.addEventListener('DOMContentLoaded', async function () {
  await verifyUser().then((userInfo) => {
    userinfo = userInfo;
    if (userInfo != null) {
      if (userInfo.name == null) {
        window.location.href = '/leaderboard/onboarding/claim.html';
      }
    }
  });
});

$.get(link + 'schedule/presentations/daily', (response, status) => {
  if (status !== 'success' || !response || !response.schedule) {
    console.error('Invalid API response.');
    return;
  }

  const handleSchedule = (schedule, flexContainerId, isPast) => {
    const flexContainer = document.getElementById(flexContainerId);
    if (!flexContainer) {
      console.error(`No element with ID ${flexContainerId} found.`);
      return;
    }

    for (const dayKey in schedule) {
      if (!schedule.hasOwnProperty(dayKey)) continue;

      const dayCard = createDayCard(dayKey, isPast);
      const slotsForDay = schedule[dayKey];

      for (const slotIndex in slotsForDay) {
        if (!slotsForDay.hasOwnProperty(slotIndex)) continue;

        const slotData = slotsForDay[slotIndex][0];
        if (slotData) {
          const item = createSlotItem(slotData, parseInt(slotIndex, 10) + 1);
          dayCard.appendChild(item);
        }
      }

      flexContainer.appendChild(dayCard);
    }
  };

  const createDayCard = (dayKey, isPast) => {
    const dayCard = document.createElement('div');
    dayCard.className = 'pres-item';

    const banner = document.createElement('section');
    banner.className = `col-ban ${isPast ? 'blue-mod' : ''}`;

    const title = document.createElement('h1');
    title.textContent = dayKey.split(' ').splice(1, 3).join(' ');
    banner.appendChild(title);
    dayCard.appendChild(banner);

    return dayCard;
  };

  const createSlotItem = (slotData, slotNumber) => {
    const item = document.createElement('div');
    item.className = 'slot-item';

    const desc = document.createElement('p');
    desc.className = 'pres-desc';
    desc.id = `desc-${slotData.id}`;

    desc.innerHTML = `
      <u>Time Slot: ${slotNumber}</u>
      <br>
      Topic:
      <a href="${slotData.link}"><u>
         ${slotData.topic}
      </u></a>
      <br><br>
      Presenters: ${slotData.presenters}
      <br><br>`;

    if ((userinfo && userinfo.id == slotData.ownerID) || (userinfo && userinfo.admin)) {
      desc.innerHTML += `
      <button class="pure-button pure-button-primary" onclick="makeSignup()">Edit</button>
      <button class="pure-button button-danger" style="color: #fff; background-color: #970000;" onclick="destroySignup()">Delete</button>
      `;
    }

    item.appendChild(desc);
    return item;
  };

  if (response.schedule.upcoming) {
    handleSchedule(response.schedule.upcoming, 'upc-flex', false);
  }
  if (response.schedule.past) {
    handleSchedule(response.schedule.past, 'pas-flex', true);
  }
});

$.get(link + 'schedule/presentations/formhelper', (nextDays, status) => {
  var sel = document.getElementById('dateSelect');
  for (i in nextDays.dates) {
    var option = document.createElement('option');
    option.text = option.value = nextDays.dates[i];
    sel.add(option);
  }
  var slotSel = document.getElementById('timeSelect');
  for (i in nextDays.slots) {
    var option = document.createElement('option');
    option.text = option.value = nextDays.slots[i];
    slotSel.add(option);
  }
});

function makeSignup() {
  var backgr = document.getElementById('signupDialog');
  backgr.style.display = 'flex';
  setTimeout(function () {}, 100);
  check();
}

function destroySignup() {
  var backgr = document.getElementById('signupDialog');
  backgr.style.display = 'none';
}

function check() {
  slotStatus = document.getElementById('slot-status');
  button = document.getElementById('submit');

  slotStatus.classList.remove('text-loading');
  slotStatus.classList.remove('text-available');
  slotStatus.classList.remove('text-taken');
  slotStatus.classList.add('text-loading');

  slotStatus.innerHTML = '<b>Checking...</b>';

  $.ajax({
    type: 'GET',
    url: link + 'schedule/presentation/check',
    data: {
      date: $('#dateSelect').val(),
      slot: $('#timeSelect').val(),
    },
    async: false,
    success: function (meetingData) {
      presentation = meetingData.presentation;

      button.classList.remove('available');
      button.classList.remove('taken');

      slotStatus.classList.remove('text-loading');

      if (presentation != null) {
        if (userinfo) {
          if (userinfo.admin) {
            button.disabled = false;
            button.innerHTML = 'Edit';
            button.classList.add('available');

            slotStatus.innerHTML = "<b>Editing another user's slot.</b>";
            slotStatus.classList.add('text-available');
          } else if (userinfo.id == meetingData.ownerID) {
            button.disabled = false;
            button.innerHTML = 'Edit';
            button.classList.add('available');

            slotStatus.innerHTML = '<b>Now editing your slot.</b>';
            slotStatus.classList.add('text-available');
          }
        } else {
          button.innerHTML = 'Taken';
          button.classList.add('taken');

          slotStatus.innerHTML = '<b>Slot Unavailable</b>';
          slotStatus.classList.add('text-taken');
        }
      } else {
        button.innerHTML = 'Sign Up';
        button.classList.add('available');

        slotStatus.innerHTML = '<b>Available!</b>';
        slotStatus.classList.add('text-available');
      }
    },
  });
}

$(function (ready) {
  $('#dateSelect').change(function () {
    check();
  });
});

$(function (ready) {
  $('#timeSelect').change(function () {
    check();
  });
});

function register() {
  document.getElementById('submit').innerHTML = '...';
  if (!userinfo) {
    document.getElementById('submit').disabled = false;
    document.getElementById('submit').innerHTML = 'Log in to reserve a slot.';
    window.location = `/leaderboard/login.html?redirect=${window.location.pathname}`;
  } else if (
    $('#topic').val() === '' ||
    $('#presenters').val() === '' ||
    $('#link').val() === '' ||
    $('#pw').val() === ''
  ) {
    document.getElementById('submit').disabled = false;
    document.getElementById('submit').innerHTML = 'Fill all fields';
  } else {
    $.ajax({
      type: 'POST',
      url: link + 'schedule/presentation/',
      data: JSON.stringify({
        date: $('#dateSelect').val(),
        slot: $('#timeSelect').val(),
        topic: $('#topic').val(),
        presenters: $('#presenters').val(),
        link: $('#link').val(),
      }),
      headers: {
        token: getCookie('discordAuth'),
        'Content-Type': 'application/json',
      },
      async: false,
      mode: 'cors',
      success: function (res) {
        document.getElementById('submit').innerHTML = res.message;
        if (res == 'Success') {
          setTimeout(function () {
            location.reload();
          }, 2000); // 3000 milliseconds = 2 seconds
        } else {
          document.getElementById('submit').disabled = false;
        }
      },
    });
  }
}
