import Script from "next/script";

// =============================================================================
// SATIS Aero – Service Worker Registration
// =============================================================================
// Tiny inline script that registers `/sw.js` on first page load. We render
// it via `next/script` with `strategy="afterInteractive"` so registration
// happens after the page is usable but before idle. The service worker
// itself is the vanilla file at `public/sw.js`.
//
// This component is the ONLY client code on the site besides the Turnstile
// island on the contact form. It is an inline script, not a React client
// component, so it does not bloat the JS bundle – next/script handles the
// injection on the server side.
// =============================================================================

export function SwRegister() {
  return (
    <Script
      id="satis-sw-register"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(function (err) {
        console.warn('[satis] Service worker registration failed:', err);
      });
  });
}`.trim(),
      }}
    />
  );
}
