const CACHE_NAME = "premiere-league-v1";
const urlsToCache = [
    "/",
    "/nav.html",
    "/manifest.json",
    "/index.html",
    "/icon.png",
    "/pages/home.html",
    "/pages/saved.html",
    "/js/api.js",
    "/js/nav.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
            .catch(function (errCache) {
                console.log("Error: " + errCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Memuat aset dari cache");
                    return response;
                } else {
                    console.log("ServiceWorker: Memuat aset dari server");
                    return fetch(event.request);
                }
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: Cache" + cacheName + "telah dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});