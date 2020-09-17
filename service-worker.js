const CACHE_NAME = "pwaSubmision-1.2";

let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/experience.html",
  "/pages/contact.html",
  "/pages/service.html",
  "/css/materialize.min.css",
  "/css/footer.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/sendservice.js",
  "/manifest.json",
  "/images/exp-1.jpg",
  "/images/exp-2.jpg",
  "/images/exp-3.jpg",
  "/images/usep.JPG",
  "/images/icon-designer.png",
  "/images/icon-dev-web.png",
  "/images/icon-web-design.png",
  "s.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];


 //simpan
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
//hapus cache lama
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


