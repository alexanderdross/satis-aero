import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/services";
import { routes, serviceUrl, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Services Dropdown (Server Component, JS-free)
// =============================================================================
// Native HTML <details>/<summary> dropdown listing all 11 services. Same
// pattern as the language switcher: zero JavaScript, browser handles
// open/close, navigation closes the dropdown automatically.
// =============================================================================

export function ServicesDropdown({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];

  return (
    <details className="group relative">
      <summary
        title={tr.nav.servicesTitle}
        className="inline-flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-runway transition-colors hover:bg-sky hover:text-primary [&::-webkit-details-marker]:hidden"
      >
        {tr.nav.services}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div
        className="absolute left-1/2 z-50 mt-2 w-80 -translate-x-1/2 overflow-hidden rounded-xl border border-sky bg-white shadow-xl ring-1 ring-black/5 sm:w-96"
        role="menu"
        aria-label={tr.nav.servicesDropdownLabel}
      >
        <ul className="max-h-[70vh] overflow-y-auto py-2">
          {services.map((service) => {
            const Icon = service.icon;
            const href = serviceUrl(locale, service.slug);
            const title = service.title[locale];
            return (
              <li key={service.slug} role="none">
                <Link
                  href={href}
                  title={title}
                  role="menuitem"
                  className="flex items-start gap-3 px-4 py-2.5 text-sm text-runway transition-colors hover:bg-sky hover:text-primary"
                >
                  <span
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="leading-snug">{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-sky bg-cloud px-4 py-3">
          <Link
            href={r.services}
            title={tr.nav.servicesTitle}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
          >
            {tr.nav.servicesAll} →
          </Link>
        </div>
      </div>
    </details>
  );
}
