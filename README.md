// sw.js — WCQF service worker (app shell cache)
const CACHE = 'wcqf-v1';
const SHELL = ['/', '/index.html', '/css/app.css', '/js/app.js', '/js/data.js', '/js/engine.js', '/js/picks.js', '/js/betfair.js', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for API calls
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request).catch(() => new Response('{"data":null,"source":"offline"}', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }
  // Cache-first for app shell
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    if (res.ok && e.request.method === 'GET') {
      caches.open(CACHE).then(c => c.put(e.request, res.clone())).catch(() => {});
    }
    return res;
  }).catch(() => caches.match('/index.html'))));
});
