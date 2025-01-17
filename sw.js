const cacheName = 'site-static';
const assets = [
  './',
  './index.html',
  './edit.html',
  './manifest.json',
  './js/edit.js',
  './js/index.js',
  './css/dark.css',
  './css/edit.css',
  './css/index.css',
  './img/add.png',
  './img/arrow_back.png',
  './img/delete.png',
  './img/icons/apple-icon-180.png',
  './img/icons/apple-splash-1125-2436.jpg',
  './img/icons/apple-splash-1136-640.jpg',
  './img/icons/apple-splash-1170-2532.jpg',
  './img/icons/apple-splash-1179-2556.jpg',
  './img/icons/apple-splash-1206-2622.jpg',
  './img/icons/apple-splash-1242-2208.jpg',
  './img/icons/apple-splash-1242-2688.jpg',
  './img/icons/apple-splash-1284-2778.jpg',
  './img/icons/apple-splash-1290-2796.jpg',
  './img/icons/apple-splash-1320-2868.jpg',
  './img/icons/apple-splash-1334-750.jpg',
  './img/icons/apple-splash-1488-2266.jpg',
  './img/icons/apple-splash-1536-2048.jpg',
  './img/icons/apple-splash-1620-2160.jpg',
  './img/icons/apple-splash-1640-2360.jpg',
  './img/icons/apple-splash-1668-2224.jpg',
  './img/icons/apple-splash-1668-2388.jpg',
  './img/icons/apple-splash-1792-828.jpg',
  './img/icons/apple-splash-2048-1536.jpg',
  './img/icons/apple-splash-2048-2732.jpg',
  './img/icons/apple-splash-2160-1620.jpg',
  './img/icons/apple-splash-2208-1242.jpg',
  './img/icons/apple-splash-2224-1668.jpg',
  './img/icons/apple-splash-2266-1488.jpg',
  './img/icons/apple-splash-2360-1640.jpg',
  './img/icons/apple-splash-2388-1668.jpg',
  './img/icons/apple-splash-2436-1125.jpg',
  './img/icons/apple-splash-2532-1170.jpg',
  './img/icons/apple-splash-2556-1179.jpg',
  './img/icons/apple-splash-2622-1206.jpg',
  './img/icons/apple-splash-2688-1242.jpg',
  './img/icons/apple-splash-2732-2048.jpg',
  './img/icons/apple-splash-2778-1284.jpg',
  './img/icons/apple-splash-2796-1290.jpg',
  './img/icons/apple-splash-2868-1320.jpg',
  './img/icons/apple-splash-640-1136.jpg',
  './img/icons/apple-splash-750-1334.jpg',
  './img/icons/apple-splash-828-1792.jpg',
  './img/icons/manifest-icon-192.maskable.png',
  './img/icons/manifest-icon-512.maskable.png',
  './img/favicon.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap',
  'https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2'
];

self.addEventListener('install', e => {
  // console.log('Service worker has been installed.');
  const handleInstall = async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(assets);
  }
  e.waitUntil(handleInstall());
});

self.addEventListener('fetch', e => {
  // console.log('fetch event', e.request.url);
  e.respondWith(
    e.request.url.includes('/edit.html')
      ? caches.match('./edit.html').then(cacheRes => {
        return cacheRes;
      })
      : caches.match(e.request).then(cacheRes => {
        return cacheRes || fetch(e.request);
      })
  );
});