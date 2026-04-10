import { describe, expect, it } from "vitest";
import { buildMetadata, SITE_URL, TWITTER_HANDLE } from "./seo";
import { pageAlternates } from "./i18n";

// Next.js Metadata types are broad unions. For test assertions we
// cast to loose shapes that match what `buildMetadata` actually
// produces.
type LooseOg = {
  type?: string;
  locale?: string;
  alternateLocale?: string;
  images?: { url: string }[];
};
type LooseTwitter = {
  card?: string;
  site?: string;
  creator?: string;
};
type LooseRobots = { index?: boolean; follow?: boolean };

describe("buildMetadata()", () => {
  it("builds a complete metadata object for a German page", () => {
    const meta = buildMetadata({
      locale: "de",
      path: "/impressum/",
      title: "Impressum | SATIS Aero",
      description: "Impressum von SATIS Aero.",
      keywords: ["Impressum", "SATIS Aero"],
      alternates: pageAlternates.imprint,
    });

    // Title must be absolute (object form) so the layout template is
    // NOT applied. This is the QA-1 regression guard.
    expect(meta.title).toEqual({ absolute: "Impressum | SATIS Aero" });

    // Description and keywords passed through.
    expect(meta.description).toBe("Impressum von SATIS Aero.");
    expect(meta.keywords).toEqual(["Impressum", "SATIS Aero"]);

    // Canonical and alternates with trailing slash.
    expect(meta.alternates?.canonical).toBe(
      "https://satis.aero/impressum/",
    );
    expect(meta.alternates?.languages).toEqual({
      de: "https://satis.aero/impressum/",
      en: "https://satis.aero/en/imprint/",
      "x-default": "https://satis.aero/impressum/",
    });

    // Open Graph must carry both the current and the alternate locale.
    const og = meta.openGraph as LooseOg;
    expect(og.locale).toBe("de_DE");
    expect(og.alternateLocale).toBe("en_US");
    expect(og.type).toBe("website");

    // Twitter card defaults.
    const tw = meta.twitter as LooseTwitter;
    expect(tw.card).toBe("summary_large_image");
    expect(tw.site).toBe(TWITTER_HANDLE);
    expect(tw.creator).toBe(TWITTER_HANDLE);

    // Robots index/follow enabled by default.
    const robots = meta.robots as LooseRobots;
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
  });

  it("swaps locale hints for English pages", () => {
    const meta = buildMetadata({
      locale: "en",
      path: "/en/imprint/",
      title: "Imprint | SATIS Aero",
      description: "Imprint of SATIS Aero.",
      alternates: pageAlternates.imprint,
    });

    const og = meta.openGraph as LooseOg;
    expect(og.locale).toBe("en_US");
    expect(og.alternateLocale).toBe("de_DE");
    expect(meta.alternates?.canonical).toBe(
      "https://satis.aero/en/imprint/",
    );
  });

  it("honours noindex for legal pages", () => {
    const meta = buildMetadata({
      locale: "de",
      path: "/datenschutz/",
      title: "Datenschutz | SATIS Aero",
      description: "Datenschutz von SATIS Aero.",
      alternates: pageAlternates.privacy,
      nofollow: true,
    });

    const robots = meta.robots as LooseRobots;
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(false);
  });

  it("supports article openGraph type for service detail pages", () => {
    const meta = buildMetadata({
      locale: "de",
      path: "/leistungen/coaching-crm-ccc/",
      title: "Coaching | SATIS Aero",
      description: "Coaching & CRM",
      alternates: {
        de: "/leistungen/coaching-crm-ccc/",
        en: "/en/services/coaching-crm-ccc/",
      },
      ogType: "article",
      article: {
        section: "Aviation Training",
        tags: ["EASA Part-ORO.FC.115", "ICAO Doc 9683"],
      },
    });

    const og = meta.openGraph as LooseOg;
    expect(og.type).toBe("article");
  });

  it("uses the default OG image when none is provided", () => {
    const meta = buildMetadata({
      locale: "de",
      path: "/",
      title: "Home | SATIS Aero",
      description: "Home",
      alternates: pageAlternates.home,
    });

    const og = meta.openGraph as LooseOg;
    expect(og.images).toHaveLength(1);
    expect(og.images?.[0].url).toBe(`${SITE_URL}/opengraph-image`);
  });
});
