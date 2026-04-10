import type { MetadataRoute } from "next";

// =============================================================================
// SATIS Aero – Multilingual XML Sitemap
// =============================================================================
// Next.js renders this file as `/sitemap.xml` and emits proper `xhtml:link
// rel="alternate" hreflang=…` entries for every URL listed in
// `alternates.languages`. Both German and English variants of every page
// are cross-linked, which is what Google expects for hreflang.
//
// All URLs end with a trailing slash to match `trailingSlash: true` from
// next.config.ts.
// =============================================================================

const SITE_URL = "https://satis.aero";

type Page = {
  /** Path on the German side, always with a leading and trailing slash. */
  de: string;
  /** Path on the English side, always with a leading and trailing slash. */
  en: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

const pages: Page[] = [
  { de: "/", en: "/en/", changeFrequency: "monthly", priority: 1.0 },
  {
    de: "/impressum/",
    en: "/en/imprint/",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    de: "/datenschutz/",
    en: "/en/privacy/",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.flatMap(({ de, en, changeFrequency, priority }) => {
    const alternates = {
      languages: {
        de: `${SITE_URL}${de}`,
        en: `${SITE_URL}${en}`,
        "x-default": `${SITE_URL}${de}`,
      },
    };

    return [
      {
        url: `${SITE_URL}${de}`,
        lastModified,
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: `${SITE_URL}${en}`,
        lastModified,
        changeFrequency,
        priority,
        alternates,
      },
    ];
  });
}
