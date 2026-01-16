const CACHE_NAME = 'bytemeuh-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/images/logo.svg'
];

// Événement d'installation : mise en cache des fichiers critiques
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker: Installation');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Mise en cache des fichiers critiques');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Événement fetch : stratégie Cache-first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si trouvé dans le cache, on le retourne
        if (cachedResponse) {
          return cachedResponse;
        }
        // Sinon on va chercher sur le réseau
        return fetch(event.request);
      })
  );
});

// Événement d'activation : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
