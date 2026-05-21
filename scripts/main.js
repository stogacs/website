let events = ['Scratchathon', 'CodeFest', 'hackStoga'];
let day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
let navbar = document.getElementById('navbar-links');

let activity = events[day > 310 ? 1 : day > 245 ? 0 : day > 100 ? 1 : day > 30 ? 2 : 1];
// Uncomment out when Scratchathon, CodeFest, and hackStoga pages are completed
// navbar.innerHTML += `\n<li><a href="/${activity.toLowerCase()}">${activity}</a></li>`;

// script for changing leadership years
const cache = {};

document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('yearSelect');
  if (yearSelect) {
    yearSelect.value = '2026';
  }
  // fix race condition
  setTimeout(() => {
    showYear('2026');
  }, 0);
});

function showYear(year) {
  const container = document.getElementById('officers-container');
  if (!container) return;
  
  if (cache[year]) {
    container.innerHTML = cache[year];
    return;
  }
  
  fetch('/leadership/' + year + '.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load');
      return response.text();
    })
    .then(html => {
      cache[year] = html;
      container.innerHTML = html;
    })
    .catch(error => {
      container.innerHTML = '<p>Error loading leadership data.</p>';
      console.error(error);
    });
}

//script for dropdown menu
const btn = document.getElementById('dropdown-label');
const content = document.getElementById('dropdown-content');
const dropdown = btn.closest('.dropdown');

btn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (window.innerWidth <= 1250) {
    content.classList.toggle('open');
    dropdown.classList.toggle('open');
  }
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 1250) {
    content.classList.remove('open');
    dropdown.classList.remove('open');
  }
});