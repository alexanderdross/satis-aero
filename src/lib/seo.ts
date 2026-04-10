import type { Metadata } from "next";
import type { Locale, PageAlternates } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – SEO metadata helper
// =============================================================================
// Single source of truth for building Next.js `Metadata` objects. Every
// page calls `buildMetadata(...)` with its own locale, canonical URL and
// copy, and gets back a fully populated metadata object including:
//
//   - title + template
//   - description
//   - keywords
//   - alternates.canonical and alternates.languages (hreflang)
//   - openGraph (with locale + locale_alternate)
//   - twitter (summary_large_image card)
//   - robots flags
//
// Keeping this in one place guarantees that when we tweak the default OG
// image or swap Twitter handle, every page picks it up automatically.
// =============================================================================

export const SITE_URL = "https://satis.aero";
export const SITE_NAME = "SATIS Aero";
export const TWITTER_HANDLE = "@satis_aero";

type BuildMetadataInput = {
  locale: Locale;
  /** Path portion, including leading and trailing slashes, e.g. "/impressum/". */
  path: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  alternates: PageAlternates;
  /** Optional override for the OG image for this specific page. */
  image?: { url: string; width?: number; height?: number; alt?: string };
  /** "article" for service detail pages, "website" for the rest. */
  ogType?: "website" | "article";
  /** Noindex the page (used for legal pages with sensitive data). */
  noindex?: boolean;
  /** Disallow following links on the page (rarely useful). */
  nofollow?: boolean;
  /**
   * Article-specific metadata for OG. Ignored when `ogType` is "website".
   */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: readonly string[];
  };
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    keywords,
    alternates,
    image,
    ogType = "website",
    noindex = false,
    nofollow = false,
    article,
  } = input;

  const canonical = `${SITE_URL}${path}`;
  const ogLocale = locale === "de" ? "de_DE" : "en_US";
  const ogAlternateLocale = locale === "de" ? "en_US" : "de_DE";

  // Either use the page-provided image or the default /opengraph-image
  // (which Next.js resolves relative to the page URL automatically).
  const ogImage =
    image ??
    ({
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    } as const);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
      languages: {
        de: `${SITE_URL}${alternates.de}`,
        en: `${SITE_URL}${alternates.en}`,
        "x-default": `${SITE_URL}${alternates.de}`,
      },
    },
    openGraph: {
      type: ogType,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      images: [ogImage],
      ...(ogType === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            section: article.section,
            tags: article.tags ? [...article.tags] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
