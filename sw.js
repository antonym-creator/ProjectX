const CACHE_NAME = 'twint-pwa-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/startpage.html',
  '/styles.css',
  '/startpage.css',
  '/app.js',
  '/manifest.json',
  '/assets/appicon/icon.png',
  '/assets/code%20eingabe/dekobild%20oben.svg',
  '/assets/code%20eingabe/0.svg',
  '/assets/code%20eingabe/1.svg',
  '/assets/code%20eingabe/2.svg',
  '/assets/code%20eingabe/3.svg',
  '/assets/code%20eingabe/4.svg',
  '/assets/code%20eingabe/5.svg',
  '/assets/code%20eingabe/6.svg',
  '/assets/code%20eingabe/7.svg',
  '/assets/code%20eingabe/8.svg',
  '/assets/code%20eingabe/9.svg',
  '/assets/startscreen/profil.svg',
  '/assets/startscreen/werbung.svg',
  '/assets/startscreen/transaktionen.svg',
  '/assets/startscreen/parkieren.svg',
  '/assets/startscreen/spin%20%26%20win.svg',
  '/assets/startscreen/superdeals.svg',
  '/assets/startscreen/digitale%20gutscheine.svg',
  '/assets/startscreen/senden.svg',
  '/assets/startscreen/Anforden%20%26%20aufteilen.svg',
  '/assets/startscreen/bezahlen.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
