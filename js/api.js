const base_url = "https://api.football-data.org/v2/";
const auth_token = "36621d2494bf4f0e8aaa5550913c02e8";

function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error: " + error);
}

function getStandings() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2021/standings")
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            let standingsHTML = "";
                            const standings = data.standings[0];
                            standingsHTML += `
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">${data.competition.name}</span>
                                    <table class="responsive-table highlight centered">
                                        <thead>
                                            <tr>
                                                <th>Position</th>
                                                <th>Logo</th>
                                                <th>Name</th>
                                                <th>Played Games</th>
                                                <th>Won</th>
                                                <th>Draw</th>
                                                <th>Lost</th>
                                                <th>Points</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                
                                        <tbody>`;

                            standings.table.forEach(function (data) {
                                standingsHTML += `
                                <tr>
                                    <td>${data.position}</td>
                                    <td><img src=${data.team.crestUrl} alt="logo" class="responsive-img" style="max-height: 20px"></td>
                                    <td>${data.team.name}</td>
                                    <td>${data.playedGames}</td>
                                    <td>${data.won}</td>
                                    <td>${data.draw}</td>
                                    <td>${data.lost}</td>
                                    <td>${data.points}</td>
                                    <td><a href="./standing.html?id=${data.team.id}"><i class="material-icons">search</i></a></td>
                                </tr>`;
                            });

                            standingsHTML += `
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;

                            document.getElementById("standings").innerHTML = standingsHTML;
                        })
                }
            })
    }

    fetch(base_url + "competitions/2021/standings", {
        headers: {
            "X-Auth-Token": auth_token
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            let standingsHTML = "";
            const standings = data.standings[0];
            standingsHTML += `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${data.competition.name}</span>
                    <table class="responsive-table highlight centered">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Played Games</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                
                        <tbody>`;

            standings.table.forEach(function (data) {
                standingsHTML += `
                <tr>
                    <td>${data.position}</td>
                    <td><img src=${data.team.crestUrl} alt="logo" class="responsive-img" style="max-height: 20px"></td>
                    <td>${data.team.name}</td>
                    <td>${data.playedGames}</td>
                    <td>${data.won}</td>
                    <td>${data.draw}</td>
                    <td>${data.lost}</td>
                    <td>${data.points}</td>
                    <td><a href="./standing.html?id=${data.team.id}"><i class="material-icons">search</i></a></td>
                </tr>`;
            });

            standingsHTML += `
                        </tbody>
                    </table>
                </div>
            </div>`;

            document.getElementById("standings").innerHTML = standingsHTML;
        })
        .catch(error)
}

function getStandingById() {
    return new Promise(function (resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam)
                .then(function (response) {
                    if (response) {
                        response.json()
                            .then(function (data) {
                                console.log(data);
                                let standingHTML = "";
                                standingHTML += `
                                <div class="row">
                                    <div class="col s12">
                                        <div class="card">
                                            <div class="card-image">
                                                <img src=${data.crestUrl} alt="Logo" class="responsive-img circular" style="max-height: 200px">
                                            </div>
                                            <div class="card-content">
                                                <span class="card-title">${data.name}</span>
                                                <table class="highlight">
                                                    <tr>
                                                        <th>Official Website</th>
                                                        <td><a href=${data.website} target="blank">${data.website}</a></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Address</th>
                                                        <td>${data.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone</th>
                                                        <td>${data.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>${data.email}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col s12">
                                        <div class="card">
                                            <div class="card-content">
                                                <span class="card-title">Squad</span>
                                                <div class="row">
                                                        <table class="highlight responsive-table centered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Nationality</th>
                                                                    <th>Position</th>
                                                                    <th>Role</th>
                                                                    <th>Shirt Number</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>`;

                                data.squad.forEach(function (sqd) {
                                    standingHTML += `
                                    <tr>
                                        <td>${sqd.name}</td>
                                        <td>${sqd.nationality}</td>
                                        <td>${sqd.position}</td>
                                        <td>${sqd.role}</td>
                                        <td>${sqd.shirtNumber}</td>
                                    </tr>`;
                                });

                                standingHTML += `          
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                                document.getElementById("body-content").innerHTML = standingHTML;
                                resolve(data);
                            })
                    }
                })
        }

        fetch(base_url + "teams/" + idParam, {
            headers: {
                "X-Auth-Token": auth_token
            }
        })
            .then(status)
            .then(json)
            .then(function (data) {
                let standingHTML = "";
                standingHTML += `
                <div class="row">
                    <div class="col s12">
                        <div class="card">
                            <div class="card-image">
                                <img src=${data.crestUrl} alt="Logo" class="responsive-img circular" style="max-height: 200px">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${data.name}</span>
                                <table class="highlight">
                                    <tr>
                                        <th>Official Website</th>
                                        <td><a href=${data.website} target="blank">${data.website}</a></td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>${data.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>${data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>${data.email}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col s12">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Squad</span>
                                <div class="row">
                                        <table class="highlight responsive-table centered">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Nationality</th>
                                                    <th>Position</th>
                                                    <th>Role</th>
                                                    <th>Shirt Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

                data.squad.forEach(function (sqd) {
                    standingHTML += `
                    <tr>
                        <td>${sqd.name}</td>
                        <td>${sqd.nationality}</td>
                        <td>${sqd.position}</td>
                        <td>${sqd.role}</td>
                        <td>${sqd.shirtNumber}</td>
                    </tr>`;
                });

                standingHTML += `          
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                document.getElementById("body-content").innerHTML = standingHTML;
                resolve(data);
            })
            .catch(error)
    })
}

function getSavedStandings() {
    getAll()
        .then(function (standings) {
            console.log(standings);
            let standingsHTML = "";
            standings.forEach(function (data) {
                standingsHTML += `
                <div class="card">
                    <div class="card-image">
                        <img src=${data.crestUrl} alt="Logo" class="responsive-img circular" style="max-height: 200px">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${data.name}</span>
                        <table class="highlight">
                            <tr>
                                <th>Official Website</th>
                                <td><a href=${data.website} target="blank">${data.website}</a></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${data.address}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>${data.phone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${data.email}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-action">
                        <a href="./standing.html?id=${data.id}&saved=true">See detail</a>
                    </div>
                </div>`;
            })

            document.getElementById("body-content").innerHTML = standingsHTML;
        })
}

function getSavedStandingById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(idParam)
        .then(function (data) {
            console.log(data);
            let standingHTML = "";
            standingHTML += `
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-image">
                            <img src=${data.crestUrl} alt="Logo" class="responsive-img circular" style="max-height: 200px">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${data.name}</span>
                            <table class="highlight">
                                <tr>
                                    <th>Official Website</th>
                                    <td><a href=${data.website} target="blank">${data.website}</a></td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>${data.address}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>${data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>${data.email}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Squad</span>
                            <div class="row">
                                    <table class="highlight responsive-table centered">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Nationality</th>
                                                <th>Position</th>
                                                <th>Role</th>
                                                <th>Shirt Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>`;

            data.squad.forEach(function (sqd) {
                standingHTML += `
                <tr>
                    <td>${sqd.name}</td>
                    <td>${sqd.nationality}</td>
                    <td>${sqd.position}</td>
                    <td>${sqd.role}</td>
                    <td>${sqd.shirtNumber}</td>
                </tr>`;
            });

            standingHTML += `          
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById("body-content").innerHTML = standingHTML;
        })
}