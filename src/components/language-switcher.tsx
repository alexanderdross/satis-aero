import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Flag } from "@/components/flag";
import { locales, routes, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Language Switcher (Server Component, JS-free)
// =============================================================================
// Built on the native HTML <details>/<summary> disclosure widget. The browser
// handles open/close on click and keyboard (Enter/Space). No JavaScript is
// shipped to the client. Once the user picks a language, navigation to the
// other locale closes the dropdown automatically because the page reloads
// (multi-root-layout pattern: /en/* lives under a different root layout
// than /, so React unmounts the entire tree).
//
// Native <details> does not support outside-click closing without JS, but
// for a 2-item dropdown that always navigates away the trade-off is fine.
// =============================================================================

const labels: Record<Locale, { native: string; flagTitle: string }> = {
  de: { native: "Deutsch", flagTitle: "Flagge Deutschlands" },
  en: { native: "English", flagTitle: "Flag of the United Kingdom" },
};

export function LanguageSwitcher({ current }: { current: Locale }) {
  const tr = t[current];

  return (
    <details className="lang-switcher group relative">
      <summary
        title={tr.nav.langSwitchTitle}
        className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-primary/30 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-sky [&::-webkit-details-marker]:hidden sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      >
        <Flag
          locale={current}
          className="h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10"
          title={labels[current].flagTitle}
        />
        <span className="uppercase">{current}</span>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <ul
        role="list"
        aria-label={tr.nav.langSwitchTitle}
        className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-sky bg-white shadow-lg ring-1 ring-black/5"
      >
        {locales.map((locale) => {
          const isCurrent = locale === current;
          const href = routes[locale].home;
          return (
            <li key={locale}>
              <Link
                href={href}
                hrefLang={locale}
                title={t[locale].nav.langSwitchTitle}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? "bg-sky font-semibold text-primary"
                    : "text-runway hover:bg-sky"
                }`}
              >
                <Flag
                  locale={locale}
                  className="h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10"
                  title={labels[locale].flagTitle}
                />
                <span className="flex-1">{labels[locale].native}</span>
                {isCurrent && (
                  <span className="text-xs text-primary" aria-hidden="true">
                    ●
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
