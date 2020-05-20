const dbPromised = idb.open("premiere-league", 1, function (upgradeDb) {
    const standingsObjectStore = upgradeDb.createObjectStore("standings", {
        keyPath: "id"
    });
    standingsObjectStore.createIndex("name", "name", { unique: false });
});

function saveStanding(standing) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("standings", "readwrite");
            const store = tx.objectStore("standings");
            store.add(standing);
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
                const tx = db.transaction("standings", "readonly");
                const store = tx.objectStore("standings");
                return store.getAll();
            })
            .then(function (standings) {
                resolve(standings);
            })
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("standings", "readonly");
                const store = tx.objectStore("standings");
                return store.get(parseInt(id));
            })
            .then(function (standing) {
                resolve(standing);
            })
    })
}

<<<<<<< Updated upstream
function deleteById(id) {
=======
function deleteStanding(id) {
>>>>>>> Stashed changes
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("standings", "readwrite");
                const store = tx.objectStore("standings");
                store.delete(parseInt(id));
                return tx.complete;
            })
            .then(function () {
<<<<<<< Updated upstream
                resolve("Data berhasil dihapus");
=======
                resolve("Data berhasil dihapus")
>>>>>>> Stashed changes
            })
            .catch(function () {
                reject("Data gagal dihapus");
            })
    })
} 