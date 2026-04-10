import { Header } from "@/components/header";
import {
  pageAlternates,
  type Locale,
  type PageKey,
} from "@/lib/i18n";

// =============================================================================
// SATIS Aero – PageShell
// =============================================================================
// Wraps every page with its own Header. The Header is page-aware: it knows
// the current locale and the URL of the equivalent page in the other
// locale, so the language switcher can navigate cross-page (e.g. from
// /impressum/ to /en/imprint/).
//
// Footer lives in the root layout because it has no per-page state.
// =============================================================================

export function PageShell({
  locale,
  pageKey,
  children,
}: {
  locale: Locale;
  pageKey: PageKey;
  children: React.ReactNode;
}) {
  const alternates = pageAlternates[pageKey];

  return (
    <>
      <Header locale={locale} alternates={alternates} />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
