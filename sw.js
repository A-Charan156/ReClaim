const CACHE_NAME = 'lostnfound-cache-v1';

// Files to cache
const urlsToCache = [
  '/ReClaim/main/',
  '/ReClaim/main/index.html',
  '/ReClaim/main/manifest.json',
  '/ReClaim/main/icons/icon-192.png',
  '/ReClaim/main/icons/icon-512.png'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
