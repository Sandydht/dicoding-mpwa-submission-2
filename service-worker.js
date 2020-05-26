// const CACHE_NAME = "premiere-league-v1";
// const urlsToCache = [
//     "/",
//     "/nav.html",
//     "/manifest.json",
//     "/index.html",
//     "/icon.png",
//     "/standing.html",
//     "/pages/home.html",
//     "/pages/saved.html",
//     "/js/api.js",
//     "/js/nav.js",
//     "/js/db.js",
//     "/js/idb.js",
//     "/js/materialize.min.js",
//     "/css/materialize.min.css"
// ];

// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function (cache) {
//                 return cache.addAll(urlsToCache);
//             })
//             .catch(function (errCache) {
//                 console.log("Error: " + errCache);
//             })
//     );
// });

// self.addEventListener("fetch", function (event) {
//     const base_url = "https://api.football-data.org/v2/";

//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME)
//                 .then(function (cache) {
//                     return fetch(event.request)
//                         .then(function (response) {
//                             cache.put(event.request.url, response.clone());
//                             return response;
//                         })
//                 })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true })
//                 .then(function (response) {
//                     return response || fetch(event.request);
//                 })
//         );
//     }
// });

// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys()
//             .then(function (cacheNames) {
//                 return Promise.all(
//                     cacheNames.map(function (cacheName) {
//                         if (cacheName != CACHE_NAME) {
//                             console.log("ServiceWorker: Cache" + cacheName + "telah dihapus");
//                             return caches.delete(cacheName);
//                         }
//                     })
//                 );
//             })
//     );
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/index.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/standing.html", revision: "1" },
    { url: "/icon.png", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/saved.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
]);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.cacheFirst()
)

self.addEventListener("push", function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    let options = {
        body: body,
        icon: "/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});