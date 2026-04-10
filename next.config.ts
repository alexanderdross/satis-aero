import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization – AVIF first, WebP fallback. See konzept.md §6.
  images: {
    formats: ["image/avif", "image/webp"],
    // Long cache for optimized images on Vercel CDN.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Strict mode for catching React issues early.
  reactStrictMode: true,
  // Every URL ends with a trailing slash. Vercel + Next.js redirect
  // non-slash variants to the slashed version with a 308.
  trailingSlash: true,

  // Redirects
  // ---------------------------------------------------------------------------
  // The services "index" URLs /leistungen/ and /en/services/ are not
  // real pages – the dynamic segment /leistungen/[slug]/ handles the
  // eleven detail pages. When someone lands on the bare index we send
  // them to the homepage services section, which *is* the index.
  //
  // `source` is an exact path match in Next.js (no regex, no wildcard),
  // so these redirects do NOT affect any of the /leistungen/<slug>/
  // detail pages underneath.
  async redirects() {
    return [
      {
        source: "/leistungen/",
        destination: "/#leistungen",
        permanent: true,
      },
      {
        source: "/en/services/",
        destination: "/en/#services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
