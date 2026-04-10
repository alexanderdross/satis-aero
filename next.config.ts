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
};

export default nextConfig;
