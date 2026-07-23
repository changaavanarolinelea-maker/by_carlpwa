// Service worker minimal — assure l'installabilité de la PWA.
// La mise en cache hors-ligne sera ajoutée dans une itération future.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});
