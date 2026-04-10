import type { MetadataRoute } from "next";

const SITE_URL = "https://satis.aero";

// =============================================================================
// SATIS Aero – robots.txt
// =============================================================================
// - General web crawlers: allow everything.
// - Named AI/LLM crawlers: explicit allow rules so operators of
//   generative engines can see that we welcome being cited. This is
//   the positive signal that the llmstxt.org + GEO community recommend.
// - Disallow the Next.js internal `/_next/` chunk routes (they are not
//   user-facing and waste crawl budget).
// - Point at the multilingual sitemap.
// =============================================================================

const AI_CRAWLERS = [
  // OpenAI (ChatGPT browse, GPTBot training, ChatGPT-User search)
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  // Perplexity
  "PerplexityBot",
  // Google AI Overviews / Gemini / Bard
  "Google-Extended",
  // Microsoft Copilot / Bing Chat
  "cohere-ai",
  // Amazon / Meta
  "Amazonbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  // Apple
  "Applebot-Extended",
  // You.com / Phind / Brave
  "YouBot",
  "PhindBot",
  "BraveBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/_next/"],
      })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
