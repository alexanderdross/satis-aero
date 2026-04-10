import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbListJsonLd } from "@/components/json-ld";
import { type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Breadcrumbs (Server Component)
// =============================================================================
// Accessible breadcrumb trail. Renders an ordered list inside a <nav> with
// `aria-label`, inline schema.org microdata AND a JSON-LD BreadcrumbList
// script for maximum compatibility. Items without an `href` are the
// current page (last item) and get `aria-current="page"`.
// =============================================================================

export type BreadcrumbItem = {
  href?: string;
  label: string;
  title?: string;
};

export function Breadcrumbs({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: Locale;
}) {
  const ariaLabel =
    locale === "de" ? "Brotkrumen-Navigation" : "Breadcrumb navigation";

  // Emit a structured BreadcrumbList. Skip items without an href (e.g.
  // the current page) from the JSON-LD because they'd need the full URL
  // and we already track them via the inline microdata.
  const jsonLdItems = items.map((item, index) => ({
    name: item.label,
    url:
      item.href ??
      // Fallback URL for the current item: use the previous href +
      // suffix. Since the current page is always the last entry we
      // just reuse an empty string and let BreadcrumbListJsonLd prefix
      // the SITE_URL.
      (items[index - 1]?.href ?? "/"),
  }));

  return (
    <nav aria-label={ariaLabel} className="border-b border-sky bg-white/60">
      <BreadcrumbListJsonLd items={jsonLdItems} />
      <ol
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-runway-mute sm:gap-2 sm:px-6 sm:text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5 sm:gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 text-runway-mute/60"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  title={item.title ?? item.label}
                  itemProp="item"
                  className="rounded transition-colors hover:text-primary"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  itemProp="name"
                  className={isLast ? "font-medium text-runway" : undefined}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
