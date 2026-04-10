import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  categoryLabels,
  categoryOrder,
  services,
} from "@/lib/services";
import { routes, serviceUrl, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Mobile Menu (Server Component, JS-free)
// =============================================================================
// Native HTML <details>-based hamburger menu visible on screens below `md`
// (768px). Lists every nav item, the full grouped service catalogue, and
// the contact + legal links. Closes automatically when the user navigates
// (page reload) or by tapping the X icon.
// =============================================================================

export function MobileMenu({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];

  const grouped = categoryOrder
    .map((cat) => ({
      label: categoryLabels[cat][locale],
      items: services.filter((service) => service.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <details className="mobile-menu group md:hidden">
      <summary
        title={tr.nav.mobileMenuLabel}
        aria-label={tr.nav.mobileMenuLabel}
        className="inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md text-runway transition-colors hover:bg-sky [&::-webkit-details-marker]:hidden"
      >
        <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
        <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
      </summary>

      <nav
        aria-label={tr.nav.ariaLabel}
        className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-sky bg-white shadow-lg"
      >
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {/* Top-level nav links ===================================== */}
          <ul className="space-y-1 border-b border-sky pb-4">
            <li>
              <Link
                href={r.about}
                title={tr.nav.aboutTitle}
                className="block rounded-md px-3 py-2 text-base font-medium text-runway transition-colors hover:bg-sky hover:text-primary"
              >
                {tr.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={r.contact}
                title={tr.nav.contactTitle}
                className="block rounded-md px-3 py-2 text-base font-medium text-runway transition-colors hover:bg-sky hover:text-primary"
              >
                {tr.nav.contact}
              </Link>
            </li>
            <li>
              <Link
                href={r.services}
                title={tr.nav.servicesTitle}
                className="block rounded-md px-3 py-2 text-base font-medium text-runway transition-colors hover:bg-sky hover:text-primary"
              >
                {tr.nav.services}
              </Link>
            </li>
          </ul>

          {/* Service catalogue ====================================== */}
          <div className="space-y-4 py-4">
            {grouped.map((group) => (
              <section key={group.label}>
                <h3 className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-runway-mute">
                  {group.label}
                </h3>
                <ul>
                  {group.items.map((service) => {
                    const Icon = service.icon;
                    const href = serviceUrl(locale, service.slug);
                    const title = service.title[locale];
                    return (
                      <li key={service.slug}>
                        <Link
                          href={href}
                          title={title}
                          className="flex items-start gap-3 rounded-md px-3 py-2 text-sm text-runway transition-colors hover:bg-sky hover:text-primary"
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
              </section>
            ))}
          </div>

          {/* Legal links =========================================== */}
          <ul className="space-y-1 border-t border-sky pt-4 text-sm text-runway-soft">
            <li>
              <Link
                href={r.imprint}
                title={tr.footer.links.imprint}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-sky hover:text-primary"
              >
                {tr.footer.links.imprint}
              </Link>
            </li>
            <li>
              <Link
                href={r.privacy}
                title={tr.footer.links.privacy}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-sky hover:text-primary"
              >
                {tr.footer.links.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </details>
  );
}
