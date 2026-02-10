// close mobile menu when navbar link is clicked
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("navbar-click");
  const navLinks = document.querySelectorAll("#navbar-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });
});