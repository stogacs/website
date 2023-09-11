document.addEventListener("DOMContentLoaded", async function() {
    let navbar = document.getElementById("navbar-links");
    navbar.innerHTML += `<li id="loader"><p>Now Loading</p></li>`;
    getLoginDetails();
    await verifyUser().then(userInfo => {
        document.getElementById("loader").remove();
        if (userInfo != null) {
            let displayTag = userInfo.discordDiscriminator == 0 ? "" : "#" + userInfo.discordDiscriminator;
            navbar.innerHTML += `<li><a href="/leaderboard/manage.html">${userInfo.discordUsername + displayTag}</a></li>`;
        }else {
            navbar.innerHTML += `\n<li><a href="https://shekels.mrsharick.com/login">Login</a></li>`;
        }
    });
    if (window.location.pathname.includes("leaderboard") && !window.location.pathname.includes("onboarding") && window.location.pathname != ("/leaderboard/")) {
        // for navbar link
        let page = window.location.pathname.split("/")
        currentPage = page.pop();
        console.log(page);
        let navbarLinks = document.getElementById("navbar-links").children;
        for (let i = 0; i < navbarLinks.length; i++) {
            if (navbarLinks[i].children[0].textContent.toLowerCase() == "home") {
                navbarLinks[i].children[0].textContent = "Back";
                navbarLinks[i].children[0].href = page.join("/");

            }
        }
    }

});
