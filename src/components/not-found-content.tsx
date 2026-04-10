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
    <section className="from-sky to-cloud flex min-h-[60vh] items-center bg-gradient-to-b">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <span className="border-primary/25 text-primary inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
          <Plane className="h-3.5 w-3.5" aria-hidden="true" />
          {tr.eyebrow}
        </span>
        <h1 className="text-runway mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {tr.title}
        </h1>
        <p className="text-runway-soft mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
          {tr.message}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href={r.home}
            title={tr.backHomeTitle}
            className="bg-primary hover:bg-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors sm:text-base"
          >
            {tr.backHome}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={r.services}
            title={tr.browseServicesTitle}
            className="border-primary/30 text-primary hover:bg-sky inline-flex items-center justify-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors sm:text-base"
          >
            {tr.browseServices}
          </Link>
        </div>
      </div>
    </section>
  );
}
