document.addEventListener("DOMContentLoaded", async function () {
    let navbar = document.getElementById("navbar-links");
    const specialPages = {
        "shop": {
            "Purchased": "/shop/past",
            "Leaderboard": "/leaderboard/"
        },
        "leaderboard": {
            "Shop": "/leaderboard/shop"
        },
        "login": {
            "Leaderboard": "/leaderboard/",
            "Home": "/"
        },
    }

    let currentPath = window.location.pathname
    // remove trailing slash from currentPath
    if (currentPath[currentPath.length - 1] == "/") {
        currentPath = currentPath.slice(0, -1);
    }
    let currentPage = currentPath.slice(currentPath.lastIndexOf("/") + 1);
    if (specialPages[currentPage]) {
        for (let page in specialPages[currentPage]) {
            navbar.innerHTML += `<li><a href="${specialPages[currentPage][page]}">${page}</a></li>`;
        }
    }
    if (!currentPage.includes("onboarding")) {
        // for navbar link
        let navbarLinks = document.getElementById("navbar-links").children;
        for (let i = 0; i < navbarLinks.length; i++) {
            if (navbarLinks[i].children[0].textContent.toLowerCase() == "home") {
                navbarLinks[i].children[0].textContent = "Back";
                if (currentPath.slice(0, currentPath.lastIndexOf("/")) == "") {
                    navbarLinks[i].children[0].href = "/";
                } else {
                    navbarLinks[i].children[0].href = currentPath.slice(0, currentPath.lastIndexOf("/"));
                }
            }
        }
    }
    navbar.innerHTML += `<li id="loader"><p>Now Loading</p></li>`;
    getLoginDetails();
    await verifyUser().then(userInfo => {
        document.getElementById("loader").remove();
        if (userInfo != null) {
            let displayTag = userInfo.discordDiscriminator == 0 ? "" : "#" + userInfo.discordDiscriminator;
            navbar.innerHTML += `<li><a href="/leaderboard/manage.html">${userInfo.discordUsername + displayTag}</a></li>`;
        } else {
            navbar.innerHTML += `\n<li><a href="/leaderboard/login.html">Login</a></li>`;
        }
    });

});
