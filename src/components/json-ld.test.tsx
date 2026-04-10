import { describe, expect, it } from "vitest";
import {
  BreadcrumbListJsonLd,
  OrganizationJsonLd,
  ProductJsonLd,
  ProfessionalServiceJsonLd,
  ServiceItemListJsonLd,
  ServiceJsonLd,
  SiteNavigationJsonLd,
  SISTER_BRAND_MENTIONS,
  WebPageJsonLd,
  WebSiteJsonLd,
} from "./json-ld";
import { services } from "@/lib/services";

// =============================================================================
// Helper: extract the JSON payload from a JSON-LD component tree
// =============================================================================
//
// Every JSON-LD helper returns one of two shapes:
//
//   1. A React element whose `type` is the inner `JsonLdScript` wrapper
//      and whose `props.payload` is the actual schema.org object.
//
//   2. A React fragment containing multiple such elements (used by
//      SiteNavigationJsonLd for the header + footer pair).
//
// By default, calling a component function directly returns a
// ReactElement without running the render pipeline, so `props.payload`
// is still accessible.
// =============================================================================

type JsonLdElement = {
  type: unknown;
  props: { payload?: Record<string, unknown>; children?: unknown };
};

function extractPayload(element: unknown): Record<string, unknown> {
  const el = element as JsonLdElement;
  if (!el || typeof el !== "object" || !("props" in el) || !el.props.payload) {
    throw new Error("Element is not a JsonLdScript wrapper");
  }
  return el.props.payload;
}

function extractPayloads(element: unknown): Record<string, unknown>[] {
  const el = element as { props: { children: JsonLdElement[] | JsonLdElement } };
  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  return children.map((child) => {
    if (!child.props.payload) {
      throw new Error("Fragment child is not a JsonLdScript wrapper");
    }
    return child.props.payload;
  });
}

// =============================================================================
// Organization
// =============================================================================

describe("OrganizationJsonLd", () => {
  it("emits valid schema.org Organization+ProfessionalService JSON", () => {
    const payload = extractPayload(OrganizationJsonLd({ locale: "de" }));
    expect(payload["@context"]).toBe("https://schema.org");
    expect(payload["@type"]).toEqual(["Organization", "ProfessionalService"]);
    expect(payload["@id"]).toBe("https://satis.aero/#organization");
    expect(payload.name).toBe("SATIS Aero");
  });

  it("uses short BCP-47 language tags (de / en)", () => {
    expect(extractPayload(OrganizationJsonLd({ locale: "de" })).inLanguage).toBe("de");
    expect(extractPayload(OrganizationJsonLd({ locale: "en" })).inLanguage).toBe("en");
  });

  it("lists all 11 services in the OfferCatalog", () => {
    const payload = extractPayload(OrganizationJsonLd({ locale: "de" }));
    const catalogue = payload.hasOfferCatalog as {
      itemListElement: unknown[];
    };
    expect(catalogue.itemListElement).toHaveLength(11);
  });
});

// =============================================================================
// ProfessionalService (standalone)
// =============================================================================

describe("ProfessionalServiceJsonLd", () => {
  it("emits a standalone ProfessionalService entity with aggregateRating", () => {
    const payload = extractPayload(ProfessionalServiceJsonLd({ locale: "de" }));
    expect(payload["@type"]).toBe("ProfessionalService");
    expect(payload["@id"]).toBe("https://satis.aero/#professionalservice");
    expect(payload.inLanguage).toBe("de");
    const rating = payload.aggregateRating as {
      ratingValue: string;
      ratingCount: number;
    };
    expect(Number(rating.ratingValue)).toBeGreaterThanOrEqual(4.8);
    expect(Number(rating.ratingValue)).toBeLessThanOrEqual(4.9);
    expect(rating.ratingCount).toBeGreaterThanOrEqual(19);
    expect(rating.ratingCount).toBeLessThanOrEqual(51);
  });

  it("references the Organization as parentOrganization", () => {
    const payload = extractPayload(ProfessionalServiceJsonLd({ locale: "en" }));
    expect(payload.parentOrganization).toEqual({
      "@id": "https://satis.aero/#organization",
    });
  });
});

// =============================================================================
// WebSite
// =============================================================================

describe("WebSiteJsonLd", () => {
  it("references the Organization as publisher", () => {
    const payload = extractPayload(WebSiteJsonLd({ locale: "de" }));
    expect(payload["@type"]).toBe("WebSite");
    expect(payload.publisher).toEqual({
      "@id": "https://satis.aero/#organization",
    });
    expect(payload.inLanguage).toBe("de");
  });
});

// =============================================================================
// WebPage
// =============================================================================

describe("WebPageJsonLd", () => {
  it("builds a canonical WebPage with short language tag", () => {
    const payload = extractPayload(
      WebPageJsonLd({
        locale: "en",
        path: "/en/imprint/",
        title: "Imprint | SATIS Aero",
        description: "Imprint",
      }),
    );
    expect(payload["@type"]).toBe("WebPage");
    expect(payload.url).toBe("https://satis.aero/en/imprint/");
    expect(payload.inLanguage).toBe("en");
  });

  it("supports ContactPage override", () => {
    const payload = extractPayload(
      WebPageJsonLd({
        locale: "de",
        path: "/kontakt/",
        title: "Kontakt",
        description: "Kontakt",
        type: "ContactPage",
      }),
    );
    expect(payload["@type"]).toBe("ContactPage");
  });

  it("embeds the mentions array when provided", () => {
    const payload = extractPayload(
      WebPageJsonLd({
        locale: "de",
        path: "/",
        title: "Home",
        description: "Home",
        mentions: SISTER_BRAND_MENTIONS,
      }),
    );
    const mentions = payload.mentions as { name: string; url: string }[];
    expect(mentions).toHaveLength(3);
    expect(mentions.map((m) => m.name)).toEqual(["Dross:Aviation", "Trade:Aero", "AIP:Aero"]);
  });

  it("omits mentions when no array is passed", () => {
    const payload = extractPayload(
      WebPageJsonLd({
        locale: "en",
        path: "/en/imprint/",
        title: "Imprint",
        description: "Imprint",
      }),
    );
    expect(payload.mentions).toBeUndefined();
  });
});

describe("SISTER_BRAND_MENTIONS constant", () => {
  it("contains the three sister aviation brands in the expected order", () => {
    expect(SISTER_BRAND_MENTIONS).toHaveLength(3);
    expect(SISTER_BRAND_MENTIONS[0]).toEqual({
      "@type": "Organization",
      name: "Dross:Aviation",
      url: "https://dross.net/aviation/",
      description:
        "The low-cost open-source anti-collision system for general aviation and gliders.",
    });
    expect(SISTER_BRAND_MENTIONS[1].name).toBe("Trade:Aero");
    expect(SISTER_BRAND_MENTIONS[1].url).toBe("https://trade.aero/");
    expect(SISTER_BRAND_MENTIONS[2].name).toBe("AIP:Aero");
    expect(SISTER_BRAND_MENTIONS[2].url).toBe("https://aip.aero/");
  });
});

// =============================================================================
// Service
// =============================================================================

describe("ServiceJsonLd", () => {
  it("uses the short language tag", () => {
    const payload = extractPayload(ServiceJsonLd({ service: services[0], locale: "de" }));
    expect(payload.inLanguage).toBe("de");
    expect(payload["@type"]).toBe("Service");
  });

  it("references the Organization as provider", () => {
    const payload = extractPayload(ServiceJsonLd({ service: services[0], locale: "en" }));
    expect(payload.provider).toEqual({
      "@id": "https://satis.aero/#organization",
    });
  });
});

// =============================================================================
// SiteNavigationElement
// =============================================================================

describe("SiteNavigationJsonLd", () => {
  it("emits two blocks (header + footer)", () => {
    const payloads = extractPayloads(SiteNavigationJsonLd({ locale: "de" }));
    expect(payloads).toHaveLength(2);
    expect(payloads[0]["@type"]).toBe("SiteNavigationElement");
    expect(payloads[1]["@type"]).toBe("SiteNavigationElement");
  });

  it("includes every service URL in the header navigation list", () => {
    const [header] = extractPayloads(SiteNavigationJsonLd({ locale: "en" }));
    const parts = header.hasPart as { url: string }[];
    for (const service of services) {
      const expectedUrl = `https://satis.aero/en/services/${service.slug}/`;
      expect(parts.some((p) => p.url === expectedUrl)).toBe(true);
    }
  });

  it("includes imprint and privacy in the footer navigation", () => {
    const [, footer] = extractPayloads(SiteNavigationJsonLd({ locale: "de" }));
    const urls = (footer.hasPart as { url: string }[]).map((p) => p.url);
    expect(urls).toContain("https://satis.aero/impressum/");
    expect(urls).toContain("https://satis.aero/datenschutz/");
  });
});

// =============================================================================
// Product (with seeded aggregateRating)
// =============================================================================

describe("ProductJsonLd", () => {
  it("renders a Product with aggregateRating in the required range", () => {
    const payload = extractPayload(
      ProductJsonLd({
        locale: "de",
        path: "/",
        name: "SATIS Aero Aviation Consultancy",
        description: "Brand product",
      }),
    );
    expect(payload["@type"]).toBe("Product");
    expect(payload.url).toBe("https://satis.aero/");
    expect(payload.inLanguage).toBe("de");
    const rating = payload.aggregateRating as {
      ratingValue: string;
      ratingCount: number;
    };
    expect(Number(rating.ratingValue)).toBeGreaterThanOrEqual(4.8);
    expect(Number(rating.ratingValue)).toBeLessThanOrEqual(4.9);
    expect(rating.ratingCount).toBeGreaterThanOrEqual(19);
    expect(rating.ratingCount).toBeLessThanOrEqual(51);
  });

  it("is deterministic for the same seed", () => {
    const a = extractPayload(
      ProductJsonLd({
        locale: "de",
        path: "/leistungen/vr-training/",
        name: "VR",
        description: "VR",
        brandSlug: "vr-training",
      }),
    );
    const b = extractPayload(
      ProductJsonLd({
        locale: "de",
        path: "/leistungen/vr-training/",
        name: "VR",
        description: "VR",
        brandSlug: "vr-training",
      }),
    );
    expect(a.aggregateRating).toEqual(b.aggregateRating);
  });

  it("produces different ratings for different seeds", () => {
    const a = extractPayload(
      ProductJsonLd({
        locale: "de",
        path: "/a/",
        name: "a",
        description: "a",
        brandSlug: "coaching-crm-ccc",
      }),
    );
    const b = extractPayload(
      ProductJsonLd({
        locale: "de",
        path: "/b/",
        name: "b",
        description: "b",
        brandSlug: "vr-training",
      }),
    );
    // At least one of { ratingValue, ratingCount } differs.
    const ratingA = a.aggregateRating as {
      ratingValue: string;
      ratingCount: number;
    };
    const ratingB = b.aggregateRating as {
      ratingValue: string;
      ratingCount: number;
    };
    const differs =
      ratingA.ratingValue !== ratingB.ratingValue || ratingA.ratingCount !== ratingB.ratingCount;
    expect(differs).toBe(true);
  });
});

// =============================================================================
// ServiceItemList
// =============================================================================

describe("ServiceItemListJsonLd", () => {
  it("lists all 11 services", () => {
    const payload = extractPayload(ServiceItemListJsonLd({ locale: "de" }));
    expect(payload["@type"]).toBe("ItemList");
    expect(payload.numberOfItems).toBe(11);
    expect((payload.itemListElement as unknown[]).length).toBe(11);
  });
});

// =============================================================================
// BreadcrumbList
// =============================================================================

describe("BreadcrumbListJsonLd", () => {
  it("emits a valid BreadcrumbList with position indices", () => {
    const payload = extractPayload(
      BreadcrumbListJsonLd({
        items: [
          { name: "Home", url: "/" },
          { name: "Impressum", url: "/impressum/" },
        ],
      }),
    );
    expect(payload["@type"]).toBe("BreadcrumbList");
    const elements = payload.itemListElement as {
      position: number;
      name: string;
      item: string;
    }[];
    expect(elements).toHaveLength(2);
    expect(elements[0].position).toBe(1);
    expect(elements[0].item).toBe("https://satis.aero/");
    expect(elements[1].position).toBe(2);
    expect(elements[1].item).toBe("https://satis.aero/impressum/");
  });
});
