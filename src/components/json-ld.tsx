import { serviceUrl, type Locale } from "@/lib/i18n";
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
//   OrganizationJsonLd       in both root layouts (DE + EN)
//   WebSiteJsonLd            on every home page
//   WebPageJsonLd            on every page (homepages, legal, contact,
//                             service detail)
//   BreadcrumbListJsonLd     on every non-home page
//   ServiceJsonLd            on every service detail page
//   ItemListJsonLd           on homepages (list of all services)
//   ContactPageJsonLd        on contact pages
//
// All @id values are hash-URIs so different nodes can reference each
// other (e.g. every Service has `provider: { @id: #organization }`).
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

// -----------------------------------------------------------------------------
// Organization
// -----------------------------------------------------------------------------
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const url = locale === "de" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const description =
    locale === "de"
      ? "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality Trainings."
      : "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.";

  // Topics we demonstrably know about – helps generative engines
  // answer "what does SATIS Aero do" queries with high confidence.
  const knowsAbout =
    locale === "de"
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
    slogan:
      locale === "de"
        ? "Smart Aviation Training Innovative Solutions"
        : "Smart Aviation Training Innovative Solutions",
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
    knowsAbout,
    knowsLanguage: ["de", "en"],
    sameAs: [],
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    hasOfferCatalog,
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
    locale === "de"
      ? "Aviation Consultancy – Smart Aviation Training Innovative Solutions"
      : "Aviation Consultancy – Smart Aviation Training Innovative Solutions";

  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url,
    name,
    alternateName: "Smart Aviation Training Innovative Solutions",
    description,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
    copyrightYear: new Date().getFullYear(),
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// WebPage – emit once per page so the knowledge graph knows about it
// -----------------------------------------------------------------------------
export function WebPageJsonLd({
  locale,
  path,
  title,
  description,
  type = "WebPage",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
}) {
  const url = `${SITE_URL}${path}`;
  const payload = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };

  return <JsonLdScript payload={payload} />;
}

// -----------------------------------------------------------------------------
// Breadcrumb list – structured variant to complement the inline microdata
// -----------------------------------------------------------------------------
export function BreadcrumbListJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
    category:
      locale === "de" ? "Aviation Consultancy" : "Aviation Consultancy",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: service.audience[locale].join(", "),
    },
    inLanguage: locale === "de" ? "de-DE" : "en-US",
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
