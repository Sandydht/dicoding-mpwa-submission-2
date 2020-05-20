const dbPromised = idb.open("premiere-league", 1, function (upgradeDb) {
    const teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("name", "name", { unique: false });
});

function save(team) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil disimpan");
            alert("Data berhasil disimpan");
        })
        .catch(function () {
            console.log("Data gagal disimpan");
            alert("Data gagal disimpan");
        })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");

                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            })
    })
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                console.log(db);
                
                return store.get(id);
            })
            .then(function (teams) {
                console.log(teams.name);
                resolve(teams);
            })
    })
}