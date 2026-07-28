const CACHE_NAME = "neet-os-v3";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.json",

    "/assets/css/style.css",

    "/assets/js/app.js",

    "/pages/subjects.html",
    "/pages/planner.html",
    "/pages/timer.html",
    "/pages/mocktest.html",
    "/pages/revision.html",
    "/pages/settings.html",

    "/assets/icons/icon-192.png",
    "/assets/icons/icon-512.png",
 "/assets/css/subjects.css",
"/assets/css/planner.css",
"/assets/css/timer.css",
"/assets/css/mocktest.css",
"/assets/css/revision.css",
"/assets/css/settings.css",

"/assets/js/subjects.js",
"/assets/js/planner.js",
"/assets/js/timer.js",
"/assets/js/mocktest.js",
"/assets/js/revision.js",
"/assets/js/settings.js",
    "/favicon.ico"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(FILES_TO_CACHE))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {

                        return caches.delete(cache);

                    }

                })

            );

        }).then(() => self.clients.claim())

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});