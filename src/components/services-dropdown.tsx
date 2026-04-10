import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { categoryLabels, categoryOrder, services } from "@/lib/services";
import { routes, serviceUrl, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Services Dropdown (Server Component, JS-free)
// =============================================================================
// Native HTML <details>/<summary> dropdown listing all 11 services grouped
// by category. Same JS-free pattern as the language switcher.
// =============================================================================

export function ServicesDropdown({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];

  // Group services by their category once at render time.
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat][locale],
      items: services.filter((service) => service.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <details className="group relative">
      <summary
        title={tr.nav.servicesTitle}
        className="text-runway hover:bg-sky hover:text-primary inline-flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden"
      >
        {tr.nav.services}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div
        className="border-sky absolute left-1/2 z-50 mt-2 w-[22rem] -translate-x-1/2 overflow-hidden rounded-xl border bg-white shadow-xl ring-1 ring-black/5 sm:w-[26rem]"
        role="menu"
        aria-label={tr.nav.servicesDropdownLabel}
      >
        <div className="max-h-[70vh] overflow-y-auto py-2">
          {grouped.map((group) => (
            <CategoryGroup
              key={group.category}
              label={group.label}
              items={group.items}
              locale={locale}
            />
          ))}
        </div>
        <div className="border-sky bg-cloud border-t px-4 py-3">
          <Link
            href={r.services}
            title={tr.nav.servicesTitle}
            className="text-primary hover:text-primary-dark inline-flex items-center gap-1 text-xs font-semibold"
          >
            {tr.nav.servicesAll} →
          </Link>
        </div>
      </div>
    </details>
  );
}

function CategoryGroup({
  label,
  items,
  locale,
}: {
  label: string;
  items: typeof services;
  locale: Locale;
}) {
  return (
    <section className="px-2 py-1">
      <h3 className="text-runway-mute px-2 pt-2 pb-1 text-[10px] font-semibold tracking-wider uppercase">
        {label}
      </h3>
      <ul role="none">
        {items.map((service) => {
          const Icon = service.icon;
          const href = serviceUrl(locale, service.slug);
          const menuTitle = service.menuTitle[locale];
          const fullTitle = service.title[locale];
          return (
            <li key={service.slug} role="none">
              <Link
                href={href}
                title={fullTitle}
                role="menuitem"
                className="text-runway hover:bg-sky hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors"
              >
                <span
                  className="bg-sky text-primary inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate leading-tight font-medium">{menuTitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
