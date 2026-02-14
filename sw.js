// sw.js
self.addEventListener("install", () => {
  console.log("Service Worker Installed");
});

self.addEventListener("fetch", (event) => {
  // optional: just let requests go through
});

