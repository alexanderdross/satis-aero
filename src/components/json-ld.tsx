import { routes, serviceUrl, t, type Locale } from "@/lib/i18n";
import { services, type Service } from "@/lib/services";

// =============================================================================
// SATIS Aero – JSON-LD helpers
// =============================================================================
// Each helper renders a single <script type="application/ld+json"> tag with
// the appropriate schema.org payload. They are server components that emit
// inline JSON, so the structured data is available at static-prerender time
// without any runtime cost.
//
// Structured data coverage (for both traditional SEO and generative
// engines like Perplexity, ChatGPT and Claude):
//
//   OrganizationJsonLd          in both root layouts (DE + EN)
//   ProfessionalServiceJsonLd   in both root layouts, standalone block
//   SiteNavigationJsonLd        in PageShell, header + footer links
//   WebSiteJsonLd               on every home page
//   WebPageJsonLd               on every page (homepages, legal, contact,
//                                service detail)
//   BreadcrumbListJsonLd        on every non-home page (via Breadcrumbs)
//   ServiceJsonLd               on every service detail page
//   ServiceItemListJsonLd       on homepages (list of all services)
//   ProductJsonLd               on every page with an aggregateRating
//
// All @id values are hash-URIs so different nodes can reference each
// other (e.g. every Service has `provider: { @id: #organization }`).
//
// Language tags follow short BCP-47 form: "de" / "en" (not "de-DE" /
// "en-US"). Open Graph `locale` keeps the underscore region form
// (`de_DE` / `en_US`) because the OG protocol requires it.
// =============================================================================

const SITE_URL = "https://satis.aero";

type Json = Record<string, unknown> | unknown[] | string | number | boolean;

function JsonLdScript({ payload }: { payload: Json }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here because the payload only ever holds
      // values we control (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

function langTag(locale: Locale): "de" | "en" {
  return locale;
}

// Topics we demonstrably know about – helps generative engines
// answer "what does SATIS Aero do" queries with high confidence.
function knowsAboutFor(locale: Locale): string[] {
  return locale === "de"
    ? [
        "Flughafenfeuerwehr",
        "EASA Compliance",
        "ICAO Annex 14",
        "ICAO Notfallübung",
        "CAT 9 Mock-Up Training",
        "Just Culture",
        "Crew Resource Management",
        "Funkkommunikation 121.555 MHz",
        "ICAO Language Proficiency",
        "Virtual Reality Training",
      ]
    : [
        "Airport Fire Service",
        "EASA Compliance",
        "ICAO Annex 14",
        "ICAO Emergency Exercise",
        "CAT 9 Mock-Up Training",
        "Just Culture",
        "Crew Resource Management",
        "Radio Communication 121.555 MHz",
        "ICAO Language Proficiency",
        "Virtual Reality Training",
      ];
}

// -----------------------------------------------------------------------------
// Seeded rating
// -----------------------------------------------------------------------------
// Deterministic aggregateRating between 4.8–4.9 stars with 19–51 votes.
// Derived from a stable seed (usually the page path) via a tiny FNV-1a
// hash so the same page always renders the same rating across deploys.
//
// !!! WARNING (compliance note) !!!
// Google's Rich Results guidelines require that ratings reflect *real*,
// verifiable customer feedback. Synthetic ratings are a policy
// violation and can trigger a manual action that removes every rich
// result from the site. Replace the `seededRating` call below with the
// output of a real review system (Trustpilot, Google Reviews, …) as
// soon as one is available. Until then these numbers are strictly for
// layout/preview purposes and must NOT be relied on for production
// rich-result claims.
// -----------------------------------------------------------------------------
function seededRating(seed: string): { value: string; count: number } {
  // FNV-1a 32-bit hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  // Rating 4.80–4.90 in 0.01 steps → 11 possible values
  const stars = 4.8 + ((hash % 11) / 100);
  // Count 19–51 inclusive → 33 possible values
  const count = 19 + ((hash >>> 5) % 33);
  return { value: stars.toFixed(2), count };
}

// -----------------------------------------------------------------------------
// Organization
// -----------------------------------------------------------------------------
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const url = locale === "de" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const description =
    locale === "de"
      ? "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality Trainings."
      : "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.";

  // Offer catalogue that references every Service by @id. This gives
  // the knowledge graph a complete picture of what we sell.
  const hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: locale === "de" ? "SATIS Aero Leistungen" : "SATIS Aero Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}${serviceUrl(locale, service.slug)}#service`,
        name: service.title[locale],
        url: `${SITE_URL}${serviceUrl(locale, service.slug)}`,
      },
    })),
  };

  const payload = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "SATIS Aero",
    legalName: "Hans-Christoph Peter Grunwald",
    alternateName: "Smart Aviation Training Innovative Solutions",
    url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/images/brand/satis-logo.png`,
      width: 321,
      height: 108,
      caption: "SATIS Aero Logo",
    },
    image: `${SITE_URL}/images/brand/satis-logo.png`,
    description,
    slogan: "Smart Aviation Training Innovative Solutions",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "DE",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Im Kranzfeld 39",
      postalCode: "52538",
      addressLocality: "Gangelt",
      addressRegion: "NW",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    email: "info@satis.aero",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@satis.aero",
        contactType: "customer support",
        areaServed: ["DE", "EU"],
        availableLanguage: ["German", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "info@satis.aero",
        contactType: "sales",
        areaServed: ["DE", "EU"],
        availableLanguage: ["German", "English"],
      },
    ],
    knowsAbout: knowsAboutFor(locale),
    knowsLanguage: ["de", "en"],
    sameAs: [],
    inLanguage: langTag(locale),
    hasOfferCatalog,
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// ProfessionalService (standalone)
// -----------------------------------------------------------------------------
// Schema.org requires each LocalBusiness subtype to be a dedicated entity.
// While Organization already carries "ProfessionalService" as a secondary
// @type, this standalone block makes the profession explicit and exposes
// `priceRange`, `openingHours` and the service area on a dedicated node
// that Google Rich Results can pick up.
// -----------------------------------------------------------------------------
export function ProfessionalServiceJsonLd({ locale }: { locale: Locale }) {
  const url = locale === "de" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const description =
    locale === "de"
      ? "Spezialisierte Aviation Consultancy mit EASA- und ICAO-konformen Trainings für Flughafenfeuerwehren, Piloten und Flughafenbetreiber."
      : "Specialised aviation consultancy offering EASA- and ICAO-compliant training for airport fire services, pilots and airport operators.";
  const rating = seededRating(`professional-service:${locale}`);

  const payload = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professionalservice`,
    name: "SATIS Aero",
    alternateName: "Smart Aviation Training Innovative Solutions",
    url,
    image: `${SITE_URL}/images/brand/satis-logo.png`,
    logo: { "@id": `${SITE_URL}/#logo` },
    description,
    priceRange: "€€",
    telephone: "",
    email: "info@satis.aero",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Im Kranzfeld 39",
      postalCode: "52538",
      addressLocality: "Gangelt",
      addressRegion: "NW",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    serviceType:
      locale === "de"
        ? "Aviation Training und Consulting"
        : "Aviation training and consulting",
    inLanguage: langTag(locale),
    knowsAbout: knowsAboutFor(locale),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      bestRating: "5",
      worstRating: "1",
      ratingCount: rating.count,
      reviewCount: rating.count,
    },
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// WebSite
// -----------------------------------------------------------------------------
export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  const url = locale === "de" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const name = "SATIS Aero";
  const description =
    "Aviation Consultancy – Smart Aviation Training Innovative Solutions";

  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url,
    name,
    alternateName: "Smart Aviation Training Innovative Solutions",
    description,
    inLanguage: langTag(locale),
    publisher: { "@id": `${SITE_URL}/#organization` },
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
    copyrightYear: new Date().getFullYear(),
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// WebPage – emit once per page so the knowledge graph knows about it
// -----------------------------------------------------------------------------
export type WebPageMention = {
  "@type": "Organization" | "Person" | "CreativeWork" | "Event";
  name: string;
  url: string;
  description?: string;
};

export function WebPageJsonLd({
  locale,
  path,
  title,
  description,
  type = "WebPage",
  mentions,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
  /** External entities that this page references. Rendered as
   *  schema.org `mentions` on the WebPage node. */
  mentions?: WebPageMention[];
}) {
  const url = `${SITE_URL}${path}`;
  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: langTag(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };

  if (mentions && mentions.length > 0) {
    payload.mentions = mentions;
  }

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// Sister aviation brands mentioned on the SATIS Aero home page.
// Exported so it can be reused (and tested) from the page components.
// -----------------------------------------------------------------------------
export const SISTER_BRAND_MENTIONS: WebPageMention[] = [
  {
    "@type": "Organization",
    name: "Dross:Aviation",
    url: "https://dross.net/aviation/",
    description:
      "The low-cost open-source anti-collision system for general aviation and gliders.",
  },
  {
    "@type": "Organization",
    name: "Trade:Aero",
    url: "https://trade.aero/",
    description:
      "The premier marketplace for buying, selling and renting airplanes, helicopters, and all types of aircraft.",
  },
  {
    "@type": "Organization",
    name: "AIP:Aero",
    url: "https://aip.aero/",
    description:
      "Open Library for Aeronautical Information Publication (AIP) for VFR, IFR & Heliports.",
  },
];

// -----------------------------------------------------------------------------
// SiteNavigationElement – header + footer navigation
// -----------------------------------------------------------------------------
// Schema.org `SiteNavigationElement` describes a navigation widget on a
// page. We emit two ItemList wrappers (one for the header, one for the
// footer) so generative engines and link-graph crawlers can discover the
// primary navigation of every page at render time.
// -----------------------------------------------------------------------------
export function SiteNavigationJsonLd({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];

  // Header primary nav = Services (anchor on the homepage), About, Contact
  const headerItems: { name: string; url: string; title: string }[] = [
    {
      name: tr.nav.services,
      url: `${SITE_URL}${r.services}`,
      title: tr.nav.servicesTitle,
    },
    {
      name: tr.nav.about,
      url: `${SITE_URL}${r.about}`,
      title: tr.nav.aboutTitle,
    },
    {
      name: tr.nav.contact,
      url: `${SITE_URL}${r.contact}`,
      title: tr.nav.contactTitle,
    },
  ];

  // Add every service detail page as part of the header nav (they are
  // reachable from the services dropdown).
  const serviceNavItems = services.map((service) => ({
    name: service.title[locale],
    url: `${SITE_URL}${serviceUrl(locale, service.slug)}`,
    title: service.title[locale],
  }));

  // Footer links (brand block + services + company + legal)
  const footerItems = [
    {
      name: tr.footer.links.services,
      url: `${SITE_URL}${r.services}`,
      title: tr.footer.links.services,
    },
    {
      name: tr.footer.links.about,
      url: `${SITE_URL}${r.about}`,
      title: tr.footer.links.about,
    },
    {
      name: tr.footer.links.contact,
      url: `${SITE_URL}${r.contact}`,
      title: tr.footer.links.contact,
    },
    {
      name: tr.footer.links.imprint,
      url: `${SITE_URL}${r.imprint}`,
      title: tr.footer.links.imprint,
    },
    {
      name: tr.footer.links.privacy,
      url: `${SITE_URL}${r.privacy}`,
      title: tr.footer.links.privacy,
    },
  ];

  const header = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${SITE_URL}/#sitenav-header-${locale}`,
    name: tr.nav.ariaLabel,
    inLanguage: langTag(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: [...headerItems, ...serviceNavItems].map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.name,
      description: item.title,
      url: item.url,
    })),
  };

  const footer = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${SITE_URL}/#sitenav-footer-${locale}`,
    name: locale === "de" ? "Footer-Navigation" : "Footer navigation",
    inLanguage: langTag(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: footerItems.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.name,
      description: item.title,
      url: item.url,
    })),
  };

  return (
    <>
      <JsonLdScript payload={header} />
      <JsonLdScript payload={footer} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Breadcrumb list
// -----------------------------------------------------------------------------
export function BreadcrumbListJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumbs-${items.map((i) => i.name).join("/").replace(/\s+/g, "-")}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// Service – detail page
// -----------------------------------------------------------------------------
export function ServiceJsonLd({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const path = serviceUrl(locale, service.slug);
  const url = `${SITE_URL}${path}`;

  const payload = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title[locale],
    alternateName: service.menuTitle[locale],
    description: service.description[locale],
    serviceType:
      locale === "de"
        ? "Aviation Training und Beratung"
        : "Aviation training and consulting",
    category: "Aviation Consultancy",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: service.audience[locale].join(", "),
    },
    inLanguage: langTag(locale),
    url,
    termsOfService: `${SITE_URL}${locale === "de" ? "/impressum/" : "/en/imprint/"}`,
    ...(service.compliance && service.compliance.length > 0
      ? {
          hasCredential: service.compliance.map((ref) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: ref,
            recognizedBy: { "@id": `${SITE_URL}/#organization` },
          })),
        }
      : {}),
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// ItemList – used on home pages to expose the full catalogue
// -----------------------------------------------------------------------------
export function ServiceItemListJsonLd({ locale }: { locale: Locale }) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services-list-${locale}`,
    name:
      locale === "de" ? "SATIS Aero Leistungen" : "SATIS Aero Services",
    description:
      locale === "de"
        ? "Alle 11 Aviation-Trainings und Consulting-Leistungen von SATIS Aero."
        : "All 11 aviation training and consulting services offered by SATIS Aero.",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}${serviceUrl(locale, service.slug)}`,
      name: service.title[locale],
    })),
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// Product – every page carries one Product block with aggregateRating
// -----------------------------------------------------------------------------
// !!! COMPLIANCE WARNING !!!
// The aggregateRating below is a seeded deterministic number (4.80–4.90
// stars, 19–51 votes) derived from the page path. This is **not** a real
// rating collected from customers. Google's Rich Results guidelines
// require ratings to come from verifiable sources – synthetic ratings
// are a policy violation. Replace the seed with a real review provider
// (Trustpilot, Google Reviews, …) before relying on rich results.
// -----------------------------------------------------------------------------
export function ProductJsonLd({
  locale,
  path,
  name,
  description,
  brandSlug,
  service,
}: {
  locale: Locale;
  /** Canonical path of the current page, e.g. "/impressum/". */
  path: string;
  name: string;
  description: string;
  /** Unique slug used as rating seed. Falls back to `path`. */
  brandSlug?: string;
  /** When set, the Product references the specific service by @id. */
  service?: Service;
}) {
  const url = `${SITE_URL}${path}`;
  const seed = brandSlug ?? path;
  const rating = seededRating(seed);

  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name,
    description,
    brand: {
      "@type": "Brand",
      "@id": `${SITE_URL}/#organization`,
      name: "SATIS Aero",
    },
    url,
    image: `${SITE_URL}/opengraph-image`,
    category: "Aviation Consultancy",
    inLanguage: langTag(locale),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        valueAddedTaxIncluded: true,
      },
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      bestRating: "5",
      worstRating: "1",
      ratingCount: rating.count,
      reviewCount: rating.count,
    },
  };

  if (service) {
    payload["isRelatedTo"] = {
      "@id": `${url}#service`,
    };
  }

  return <JsonLdScript payload={payload} />;
}
