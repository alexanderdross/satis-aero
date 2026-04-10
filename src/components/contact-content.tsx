import { Mail, MapPin } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { routes, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Contact Content (Server Component)
// =============================================================================
// Wraps the ContactForm client island with breadcrumbs, page header and the
// physical contact information. Only the form itself is client-side.
// =============================================================================

export function ContactContent({ locale }: { locale: Locale }) {
  const tr = t[locale].contactPage;
  const tBreadcrumbs = t[locale].breadcrumbs;
  const r = routes[locale];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: r.home,
      label: tBreadcrumbs.home,
      title: tBreadcrumbs.homeTitle,
    },
    { label: t[locale].nav.contact },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} locale={locale} />

      <section className="bg-gradient-to-b from-sky to-cloud">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {tr.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-runway sm:text-4xl md:text-5xl">
            {tr.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-runway-soft sm:text-lg">
            {tr.sub}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[2fr_1fr] lg:gap-16">
          {/* Form ====================================================== */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-runway sm:text-2xl">
              {tr.formHeading}
            </h2>
            <ContactForm locale={locale} />
          </div>

          {/* Address ================================================== */}
          <aside className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-runway sm:text-2xl">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                {tr.addressHeading}
              </h2>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-runway-soft sm:text-base">
                <p className="font-semibold text-runway">{tr.addressName}</p>
                <p>{tr.addressStreet}</p>
                <p>{tr.addressCity}</p>
                <p>{tr.addressCountry}</p>
              </address>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-runway sm:text-2xl">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                {tr.mailHeading}
              </h2>
              <p className="mt-4 text-sm sm:text-base">
                <a
                  href={`mailto:${tr.mailValue}`}
                  title={tr.mailTitle}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {tr.mailValue}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
