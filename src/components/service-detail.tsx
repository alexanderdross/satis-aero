import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Users } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { ServiceJsonLd } from "@/components/json-ld";
import { type Service } from "@/lib/services";
import { routes, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Service Detail (Server Component)
// =============================================================================
// Locale-agnostic detail page for a single service. Renders a hero with the
// service icon and title, the long description, target audience, learning
// outcomes, format, compliance badges and a CTA back to the contact page.
// =============================================================================

export function ServiceDetail({ service, locale }: { service: Service; locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];
  const sd = tr.serviceDetail;
  const Icon = service.icon;

  const breadcrumbs: BreadcrumbItem[] = [
    { href: r.home, label: tr.breadcrumbs.home, title: tr.breadcrumbs.homeTitle },
    {
      href: r.services,
      label: tr.breadcrumbs.services,
      title: tr.breadcrumbs.servicesTitle,
    },
    { label: service.title[locale] },
  ];

  return (
    <>
      <ServiceJsonLd service={service} locale={locale} />
      <Breadcrumbs items={breadcrumbs} locale={locale} />

      {/* HERO ============================================================ */}
      <section className="from-sky to-cloud bg-gradient-to-b">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <p className="text-primary text-xs font-semibold tracking-wider uppercase">
            {sd.eyebrow}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="text-primary ring-primary/10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="text-runway flex-1 text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl">
              {service.title[locale]}
            </h1>
          </div>
          <p className="text-runway-soft mt-6 text-base leading-relaxed sm:text-lg">
            {service.excerpt[locale]}
          </p>
          {service.compliance && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.compliance.map((item) => (
                <li
                  key={item}
                  className="text-primary-dark ring-primary/10 inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-medium ring-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CONTENT ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 md:py-20">
          {/* Description */}
          <div>
            <h2 className="text-runway text-xl font-bold sm:text-2xl">{sd.descriptionHeading}</h2>
            <p className="text-runway-soft mt-4 text-base leading-relaxed sm:text-lg">
              {service.description[locale]}
            </p>
          </div>

          {/* Audience + Outcomes */}
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-runway flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <Users className="text-primary h-5 w-5" aria-hidden="true" />
                {sd.audienceHeading}
              </h2>
              <ul className="text-runway-soft mt-4 space-y-2 text-sm sm:text-base">
                {service.audience[locale].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="bg-primary mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-runway flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <CheckCircle2 className="text-primary h-5 w-5" aria-hidden="true" />
                {sd.outcomesHeading}
              </h2>
              <ul className="text-runway-soft mt-4 space-y-2 text-sm sm:text-base">
                {service.outcomes[locale].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2
                      className="text-success mt-1 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Format */}
          {service.format && (
            <div>
              <h2 className="text-runway text-xl font-bold sm:text-2xl">{sd.formatHeading}</h2>
              <p className="text-runway-soft mt-4 text-base leading-relaxed sm:text-lg">
                {service.format[locale]}
              </p>
            </div>
          )}

          {/* Compliance long list */}
          {service.compliance && service.compliance.length > 0 && (
            <div>
              <h2 className="text-runway text-xl font-bold sm:text-2xl">{sd.complianceHeading}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.compliance.map((item) => (
                  <li
                    key={item}
                    className="bg-sky text-primary-dark inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA ============================================================= */}
      <section className="bg-primary text-on-primary">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{sd.ctaHeading}</h2>
          <p className="text-on-primary-soft mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            {sd.ctaText}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={r.contact}
              title={sd.ctaButtonTitle}
              className="text-primary hover:bg-sky inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold transition-colors sm:text-base"
            >
              {sd.ctaButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={r.services}
              title={sd.backTitle}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {sd.backLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
