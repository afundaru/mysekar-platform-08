/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules

const CACHE_NAME = 'mysekar-cache-v2'; // Increment cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/dashboard',
  '/konsultasi-hukum',
  '/pengaduan',
  '/profile',
  '/forum-diskusi',
  '/admin',
  '/admin/keanggotaan',
  '/admin/forum',
  '/admin/pengaduan',
  '/admin/konsultasi',
  '/admin/add-admin'
];

// Install a service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Cache and return requests with network-first strategy for API/dynamic requests
// and cache-first for static assets
self.addEventListener('fetch', (event) => {
  // Don't cache supabase API requests
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  // For navigation requests (HTML pages), use network first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache, try to return the cached index.html as fallback
              return caches.match('/index.html');
            });
        })
    );
    return;
  }

  // For static assets like JS, CSS, and images, use cache first
  if (event.request.destination === 'style' ||
      event.request.destination === 'script' ||
      event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached response if available
          if (cachedResponse) {
            return cachedResponse;
          }
          // Otherwise fetch from network
          return fetch(event.request)
            .then(response => {
              // Clone the response before using it
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
    );
    return;
  }

  // For other requests, try network first
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      // Claim clients so that the service worker is in control immediately
      return self.clients.claim();
    })
  );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle offline fallbacks
self.addEventListener('fetch', (event) => {
  // Prevent the default fetch handler from handling the request
  // This is a second fetch listener that will only run for specific routes
  // that we want special offline handling for
  
  const url = new URL(event.request.url);
  
  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Special handling for admin routes when offline
  if (url.pathname.startsWith('/admin')) {
    // We check if the request is already being handled by our main fetch handler
    if (event.respondWith) {
      return;
    }
    
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/admin')
            .then(response => {
              if (response) {
                return response;
              }
              return caches.match('/index.html');
            });
        })
    );
  }
});
