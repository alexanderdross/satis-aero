/* global caches, self, Request, fetch, URL */

// =============================================================================
// SATIS Aero – Service Worker (vanilla, no toolchain)
// =============================================================================
//
// This is a plain service worker served from /sw.js. It is registered by
// the tiny `sw-register.tsx` component in the layouts. Goals:
//
//   1. Offline support — cache the brand shell (home, logo, manifest,
//      critical icons) during install and serve the bilingual offline
//      fallback page when navigation fails.
//   2. Fast repeat visits — cache-first for static assets
//      (/images/*, /icons/*, /_next/static/*, fonts), network-first
//      with cache fallback for HTML documents.
//   3. Predictable invalidation — every release bumps CACHE_VERSION,
//      the activate handler wipes every cache that is not on the
//      allowlist.
//
// Because Next.js on Vercel sends long-lived immutable headers for
// /_next/static/* and /images/*, the cache-first strategy below does
// not cause staleness — a new deploy creates new hashed URLs so the
// cache hit rate is high without leaking old bundles.
//
// !!! DO NOT add user data or cookies to any cached response. The
// caches below only hold public, static content.
// =============================================================================

const CACHE_VERSION = "satis-aero-v1";
const PRECACHE = `${CACHE_VERSION}-precache`;
const RUNTIME = `${CACHE_VERSION}-runtime`;
const EXPECTED_CACHES = [PRECACHE, RUNTIME];

// Minimal shell that gets seeded on install. We deliberately keep this
// short so the install step is quick and the user is not forced to
// download every image on every visit.
const PRECACHE_URLS = [
  "/",
  "/en/",
  "/offline.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/images/brand/satis-logo.png",
  "/icons/favicon-32x32.png",
  "/icons/android-icon-192x192.png",
  "/icons/apple-icon-180x180.png",
];

// ---------------------------------------------------------------------------
// install — seed the precache
// ---------------------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      // Use {cache: "reload"} so the install never re-uses a stale
      // HTTP-cache entry. Failures are non-fatal so a single missing
      // asset can't brick the install.
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const request = new Request(url, { cache: "reload" });
            const response = await fetch(request);
            if (response.ok || response.type === "opaque") {
              await cache.put(url, response);
            }
          } catch {
            /* swallow – best effort */
          }
        }),
      );
      // Activate the new worker immediately instead of waiting for
      // all open tabs to close.
      await self.skipWaiting();
    })(),
  );
});

// ---------------------------------------------------------------------------
// activate — prune old caches, claim clients
// ---------------------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !EXPECTED_CACHES.includes(key))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isHtmlRequest(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html"))
  );
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/browserconfig.xml"
  );
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    if (cached) return cached;
    throw error;
  }
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Final fallback: serve the precached offline page.
    const precache = await caches.open(PRECACHE);
    const offline = await precache.match("/offline.html");
    if (offline) return offline;
    throw new Error("Offline and no cached response available");
  }
}

// ---------------------------------------------------------------------------
// fetch — route requests through the right strategy
// ---------------------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GETs. Everything else goes straight to the network.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never intercept cross-origin requests. Cloudflare Turnstile, Resend
  // callbacks and analytics must stay on the network and their error
  // handling must not be swallowed by the SW.
  if (url.origin !== self.location.origin) return;

  // Skip Next.js internal data routes — they have very short
  // invalidation windows that we do not want to cache aggressively.
  if (url.pathname.startsWith("/_next/data/")) return;

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isHtmlRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: network, fall back to cache silently.
  event.respondWith(
    (async () => {
      try {
        return await fetch(request);
      } catch {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(request);
        if (cached) return cached;
        throw new Error("Network request failed and no cache entry");
      }
    })(),
  );
});

// ---------------------------------------------------------------------------
// message — allow the page to tell the worker to skipWaiting
// ---------------------------------------------------------------------------
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
