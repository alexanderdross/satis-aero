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

export function Breadcrumbs({ items, locale }: { items: BreadcrumbItem[]; locale: Locale }) {
  const ariaLabel = locale === "de" ? "Brotkrumen-Navigation" : "Breadcrumb navigation";

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
      items[index - 1]?.href ??
      "/",
  }));

  return (
    <nav aria-label={ariaLabel} className="border-sky border-b bg-white/60">
      <BreadcrumbListJsonLd items={jsonLdItems} />
      {/*
        Horizontal-scroll container. On narrow viewports the trail stays
        on one line and the user swipes to reveal long labels (e.g.
        "Training am CAT 9 Mock-Up (Brandübungsanlage)"). On md+ there
        is enough room for the trail to fit naturally.

        - `overflow-x-auto` enables horizontal scrolling.
        - `whitespace-nowrap` on each label keeps items intact.
        - Scrollbar is hidden via the webkit pseudo + Firefox fallback,
          because the scroll affordance is obvious on touch screens
          and the visible scrollbar would clash with the thin nav bar.
        - `scroll-smooth` for a snappier interaction.
      */}
      <ol
        className="text-runway-mute mx-auto flex max-w-6xl items-center gap-1.5 overflow-x-auto scroll-smooth px-4 py-3 text-xs [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:px-6 sm:text-sm [&::-webkit-scrollbar]:hidden"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap sm:gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight
                  className="text-runway-mute/60 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  title={item.title ?? item.label}
                  itemProp="item"
                  className="hover:text-primary rounded transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  itemProp="name"
                  className={isLast ? "text-runway font-medium" : undefined}
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
