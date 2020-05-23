const CACHE_NAME = "premiere-league-v1";
const urlsToCache = [
    "/",
    "/nav.html",
    "/manifest.json",
    "/index.html",
    "/icon.png",
    "/standing.html",
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
    const base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    return fetch(event.request)
                        .then(function (response) {
                            cache.put(event.request.url, response.clone());
                            return response;
                        })
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true })
                .then(function (response) {
                    return response || fetch(event.request);
                })
        );
    }
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