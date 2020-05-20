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
                    <span class="card-title center-align">${data.competition.name}</span>
                    <table class="responsive-table highlight">
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

            standings.table.forEach(function (data){

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