let events = ['Scratchathon', 'CodeFest', 'hackStoga'];
let day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
let navbar = document.getElementById('navbar-links');

let activity = events[day > 310 ? 1 : day > 245 ? 0 : day > 100 ? 1 : day > 30 ? 2 : 1];
// Uncomment out when Scratchathon, CodeFest, and hackStoga pages are completed
// navbar.innerHTML += `\n<li><a href="/${activity.toLowerCase()}">${activity}</a></li>`;

// script for changing leadership years
const cache = {};
let initialHTML;

document.addEventListener('DOMContentLoaded', () => {
  initialHTML = document.getElementById('officers-container').innerHTML;
  document.getElementById('yearSelect').value = '2026';
});

function showYear(year) {
  if (year === '2026') {
    document.getElementById('officers-container').innerHTML = initialHTML;
    return;
  }
  if (cache[year]) {
    document.getElementById('officers-container').innerHTML = cache[year];
    return;
  }
  fetch('/leadership/' + year + '.html')
    .then(r => r.text())
    .then(html => {
      cache[year] = html;
      document.getElementById('officers-container').innerHTML = html;
    });
}