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

      <section className="from-sky to-cloud bg-gradient-to-b">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <p className="text-primary text-xs font-semibold tracking-wider uppercase">
            {tr.eyebrow}
          </p>
          <h1 className="text-runway mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            {tr.title}
          </h1>
          <p className="text-runway-soft mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            {tr.sub}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[2fr_1fr] lg:gap-16">
          {/* Form ====================================================== */}
          <div>
            <h2 className="text-runway mb-6 text-xl font-bold sm:text-2xl">{tr.formHeading}</h2>
            <ContactForm locale={locale} />
          </div>

          {/* Address ================================================== */}
          <aside className="space-y-8">
            <div>
              <h2 className="text-runway flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <MapPin className="text-primary h-5 w-5" aria-hidden="true" />
                {tr.addressHeading}
              </h2>
              <address className="text-runway-soft mt-4 space-y-1 text-sm leading-relaxed not-italic sm:text-base">
                <p className="text-runway font-semibold">{tr.addressName}</p>
                <p>{tr.addressStreet}</p>
                <p>{tr.addressCity}</p>
                <p>{tr.addressCountry}</p>
              </address>
            </div>

            <div>
              <h2 className="text-runway flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <Mail className="text-primary h-5 w-5" aria-hidden="true" />
                {tr.mailHeading}
              </h2>
              <p className="mt-4 text-sm sm:text-base">
                <a
                  href={`mailto:${tr.mailValue}`}
                  title={tr.mailTitle}
                  className="text-primary font-semibold underline-offset-4 hover:underline"
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
