import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Breadcrumbs (Server Component)
// =============================================================================
// Accessible breadcrumb trail. Renders an ordered list inside a <nav> with
// `aria-label` and JSON-LD-friendly markup. Items without an `href` are the
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

  return (
    <nav aria-label={ariaLabel} className="border-b border-sky bg-white/60">
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
