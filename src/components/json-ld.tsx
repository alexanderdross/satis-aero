import { type Locale } from "@/lib/i18n";
import { type Service } from "@/lib/services";

// =============================================================================
// SATIS Aero – JSON-LD helpers
// =============================================================================
// Each helper renders a single <script type="application/ld+json"> tag with
// the appropriate schema.org payload. They are server components that emit
// inline JSON, so the structured data is available at static-prerender time
// without any runtime cost.
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

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const url = locale === "de" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const description =
    locale === "de"
      ? "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality Trainings."
      : "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.";

  const payload = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "SATIS Aero",
    legalName: "Hans-Christoph Peter Grunwald",
    alternateName: "Smart Aviation Training Innovative Solutions",
    url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/brand/satis-logo.png`,
      width: 321,
      height: 108,
    },
    image: `${SITE_URL}/images/brand/satis-logo.png`,
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Im Kranzfeld 39",
      postalCode: "52538",
      addressLocality: "Gangelt",
      addressCountry: "DE",
    },
    email: "info@satis.aero",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@satis.aero",
      contactType: "customer support",
      areaServed: ["DE", "EU"],
      availableLanguage: ["de", "en"],
    },
    sameAs: [],
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };

  return <JsonLdScript payload={payload} />;
}

export function ServiceJsonLd({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const path =
    locale === "de"
      ? `/leistungen/${service.slug}/`
      : `/en/services/${service.slug}/`;

  const payload = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: service.title[locale],
    description: service.description[locale],
    serviceType: "Aviation training and consulting",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["DE", "EU"],
    audience: {
      "@type": "Audience",
      audienceType: service.audience[locale].join(", "),
    },
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    url: `${SITE_URL}${path}`,
  };

  return <JsonLdScript payload={payload} />;
}
