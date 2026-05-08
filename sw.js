const CACHE_NAME = 'soboryane-v48';
const ASSETS = [
  './',
  './index.html',
  './firebase-app.js',
  './firebase-database.js',
  './manifest.json',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

