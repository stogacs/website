document.addEventListener("DOMContentLoaded", async function () {
    let navbar = document.getElementById("navbar-links");
    const specialPages = {
        "shop": {
            "Purchased": "/leaderboard/shop/past.html",
        },
        "leaderboard": {
            "Shop": "/leaderboard/shop",
            "Purchased": "/leaderboard/shop/past.html",
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
    if (currentPage == "index.html") {
        currentPage = currentPath.slice(0, currentPath.lastIndexOf("/"));
        currentPage = currentPage.slice(currentPage.lastIndexOf("/") + 1);
    }

    if (specialPages[currentPage]) {
        for (let page in specialPages[currentPage]) {
            navbar.innerHTML += `<li><a href="${specialPages[currentPage][page]}">${page}</a></li>`;
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
