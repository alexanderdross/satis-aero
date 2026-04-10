import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { routes, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Not Found Content (Server Component)
// =============================================================================
// Branded 404 page used by both root layouts. Locale-aware via the prop.
// =============================================================================

export function NotFoundContent({ locale }: { locale: Locale }) {
  const tr = t[locale].notFound;
  const r = routes[locale];

  return (
    <section className="flex min-h-[60vh] items-center bg-gradient-to-b from-sky to-cloud">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Plane className="h-3.5 w-3.5" aria-hidden="true" />
          {tr.eyebrow}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-runway sm:text-5xl md:text-6xl">
          {tr.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-runway-soft sm:text-lg">
          {tr.message}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href={r.home}
            title={tr.backHomeTitle}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark sm:text-base"
          >
            {tr.backHome}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={r.services}
            title={tr.browseServicesTitle}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-sky sm:text-base"
          >
            {tr.browseServices}
          </Link>
        </div>
      </div>
    </section>
  );
}
