import { Header } from "@/components/header";
import { type Locale, type PageAlternates } from "@/lib/i18n";

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
// Footer lives in the root layout because it has no per-page state.
// =============================================================================

export function PageShell({
  locale,
  alternates,
  children,
}: {
  locale: Locale;
  alternates: PageAlternates;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header locale={locale} alternates={alternates} />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
