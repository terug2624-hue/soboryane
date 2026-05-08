const CACHE_NAME = 'soboryane-v49'; // Меняйте номер версии здесь при каждом обновлении
const ASSETS = [
  './',
  './index.html',
  './firebase-app.js',
  './firebase-database.js',
  './manifest.json',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  // Пропускаем ожидание и сразу активируем новый SW
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  // Удаляем старые версии кэша автоматически
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
