function updateSchedule() {
  let schedule = document.getElementById('schedule-list');
  const scheduleTable = document.createElement('table');
  scheduleTable.className = 'schedule center-text';
  specialColors = ['gold', 'silver', '#9F7A34'];
  let tableContent = `
        <tr>
            <th>Time</th>
            <th>Main Activity</th>
            <th>Side Activity α</th>
            <th>Side Activity β</th>
        </tr>
    `;

  fetch('https://cs-services.stoga.club/schedule?event=hackstoga')
    .then((response) => response.json())
    .then((data) => {
      const startTimeStr = data.start_time;
      const endTimeStr = data.end_time;
      const startTime = parseTimeString(startTimeStr);
      const endTime = parseTimeString(endTimeStr);
      console.log();

      if (data.disabled != true) {
        let i = 0;
        for (activity in data.activities) {
          const date = parseTimeString(activity.toString());

          let activityData = data.activities[activity];

          if ((i = 0)) {
            if (date >= startTime) {
              addToChart(activityData, startTime);
              i++;
            }
          }
          // add date to chart
          addToChart(activityData, date);
          i++;
        }

        schedule.innerHTML = '';

        function addToChart(activityData, time) {
          let mainActivity = activityData.main_activity || '';
          let sideActivity1 = activityData.side_activity_1 || '';
          let sideActivity2 = activityData.side_activity_2 || '';
          tableContent += `
                    <tr>
                        <td>${time}</td>
                        <td>${mainActivity}</td>
                        <td>${sideActivity1}</td>
                        <td>${sideActivity2}</td>
                    </tr>
                `;
          i++;
        }
        scheduleTable.innerHTML = tableContent;
        schedule.appendChild(scheduleTable);
      } else {
        schedule.innerHTML = `<p class="center-text error-text" style=color:white;>${data.message}</p>`;
      }
    })
    .catch((error) => {
      schedule.innerHTML = `<p class="center-text error-text">An error occurred while accessing the schedule.</p>`;
      console.log(error);
    });
}

function parseTimeString(utcTime) {
  // Parse the UTC time string
  let [hours, minutes] = utcTime.split(':').map(Number);

  // Adjust for 24-hour clock
  if (hours >= 24) {
    hours -= 24;
  }

  // Convert to 12-hour clock
  let meridiem = 'AM';
  if (hours >= 12) {
    meridiem = 'PM';
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12; // 12 AM
  }

  // Format the time string
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;

  return formattedTime;
}

// On page load
document.addEventListener('DOMContentLoaded', async function () {
  let schedule = document.getElementById('schedule-list');
  schedule.innerHTML = `<p class="center-text">Loading Schedule...</p>`;
  updateSchedule();
});
