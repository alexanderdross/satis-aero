import { Header } from "@/components/header";
import {
  ProductJsonLd,
  ProfessionalServiceJsonLd,
  SiteNavigationJsonLd,
} from "@/components/json-ld";
import { t, type Locale, type PageAlternates } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – PageShell
// =============================================================================
// Wraps every page with its own Header. The Header is page-aware: it knows
// the current locale and the URL of the equivalent page in the other
// locale, so the language switcher can navigate cross-page (e.g. from
// /impressum/ to /en/imprint/).
//
// `alternates` is passed in directly so dynamic routes (service detail
// pages) can build their own DE/EN URL pairs without needing a static
// pageKey lookup.
//
// PageShell also emits the three site-wide JSON-LD blocks that every
// page should carry:
//
//   - SiteNavigationElement (header + footer navigation)
//   - ProfessionalService (standalone block with priceRange, rating)
//   - Product (brand-level Product with aggregateRating)
//
// Pages that sell a specific Service (the /leistungen/[slug]/ detail
// pages) can add their own ServiceJsonLd and override the Product via
// the `product` prop to point at the specific service instead of the
// SATIS Aero brand.
//
// Footer lives in the root layout because it has no per-page state.
// =============================================================================

export function PageShell({
  locale,
  alternates,
  path,
  productName,
  productDescription,
  productSeed,
  children,
}: {
  locale: Locale;
  alternates: PageAlternates;
  /** Canonical path of the current page, used for Product @id and seed. */
  path?: string;
  /** Override the brand Product name for service-specific pages. */
  productName?: string;
  /** Override the brand Product description for service-specific pages. */
  productDescription?: string;
  /** Override the seed used for aggregateRating (usually a service slug). */
  productSeed?: string;
  children: React.ReactNode;
}) {
  const tr = t[locale];
  const resolvedPath = path ?? alternates[locale];
  const defaultProductName =
    locale === "de" ? "SATIS Aero Aviation Consultancy" : "SATIS Aero Aviation Consultancy";
  const defaultProductDescription =
    locale === "de"
      ? "Aviation Consultancy mit EASA-konformen Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality für Flughafenfeuerwehren, Piloten und Flughafenbetreiber."
      : "Aviation consultancy offering EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training for airport fire services, pilots and airport operators.";

  return (
    <>
      <SiteNavigationJsonLd locale={locale} />
      <ProfessionalServiceJsonLd locale={locale} />
      <ProductJsonLd
        locale={locale}
        path={resolvedPath}
        name={productName ?? defaultProductName}
        description={productDescription ?? defaultProductDescription}
        brandSlug={productSeed ?? tr.siteName}
      />
      <Header locale={locale} alternates={alternates} />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
