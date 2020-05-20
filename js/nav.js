document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".topnav a, .sidenav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page === "") page = "home";

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let content = document.getElementById("body-content");

                if (page === "home") {
                    getStandings();
                } else if (page === "saved") {
                    getSavedTeam();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>";
                } else {
                    content.innerHTML = "<p>Halaman tidak dapat diakses</p>";
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html");
        xhttp.send();
    }

    loadNav();
    loadPage(page);
})