// Service Worker for Page Caching
const CACHE_NAME = 'shadcn-transitions-v2';
const STATIC_CACHE_NAME = 'shadcn-static-v2';

// Pages to cache for offline access
const PAGES_TO_CACHE = [
  '/',
  '/components/button',
  '/components/dialog',
  '/components/transition-demo',
  '/components/fullscreen-viewport',
  '/components/fullscreen-chat-demo',
];

// Static assets to cache
const STATIC_ASSETS = [
  '/manifest.json',
  '/icon.svg',
];

// Install event - cache pages and static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache pages with error handling
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.allSettled(
          PAGES_TO_CACHE.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache page: ${url}`, error);
              return null;
            })
          )
        );
      }),
      // Cache static assets with error handling
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return Promise.allSettled(
          STATIC_ASSETS.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache asset: ${url}`, error);
              return null;
            })
          )
        );
      })
    ])
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clear any problematic caches that might contain old routes
      caches.delete('shadcn-transitions-v1').catch(() => {}),
      caches.delete('shadcn-static-v1').catch(() => {})
    ])
  );
  
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Handle navigation requests (pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving page from cache:', request.url);
          return cachedResponse;
        }
        
        // If not in cache, fetch from network and cache it
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, try to serve a fallback page
          return caches.match('/');
        });
      })
    );
  }
  
  // Handle static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.url.includes('/_next/')) {
    
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any pending offline actions here
      Promise.resolve()
    );
  }
});

// Push notifications (optional)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icon.svg',
    badge: '/icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icon.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ShadCN Transitions', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/components/transition-demo')
    );
  }
});
