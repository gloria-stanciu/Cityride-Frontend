const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Open cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request) //pentru fiecare request facut
            .then(() => {
                return fetch(event.request) //vrem sa primim date noi
                    .catch(() => caches.match('offline.html')) //daca nu poate face fetch -> no internet conncetion -> go on offline page
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)) { //daca whiteList nu include cacheName
                        return caches.delete(cacheName); //sterge cacheName
                    }
                })
                ))
    )
});