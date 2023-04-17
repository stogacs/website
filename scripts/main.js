let events = ["Scratchathon", "CodeFest", "hackStoga"];
let day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
let navbar = document.getElementById("navbar-links");

let activity = events[day > 310 ? 1 : day > 245 ? 0 : day > 100 ? 1 : day > 30 ? 2 : 1];
navbar.innerHTML += `\n<li><a href="/${activity.toLowerCase()}">${activity}</a></li>`;