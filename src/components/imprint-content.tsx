import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { routes, t, type Locale } from "@/lib/i18n";

export function ImprintContent({ locale }: { locale: Locale }) {
  const tr = t[locale].imprint;
  const r = routes[locale];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: r.home,
      label: t[locale].breadcrumbs.home,
      title: t[locale].breadcrumbs.homeTitle,
    },
    { label: tr.title },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} locale={locale} />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="mb-10">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            {tr.eyebrow}
          </span>
          <h1 className="text-runway mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {tr.title}
          </h1>
          <p className="text-runway-mute mt-3 text-sm">{tr.sub}</p>
        </header>

        <section className="text-runway-soft space-y-10">
          <div>
            <h2 className="text-runway text-lg font-semibold sm:text-xl">{tr.providerHeading}</h2>
            <address className="mt-3 leading-relaxed not-italic">
              Hans-Christoph Peter Grunwald
              <br />
              Im Kranzfeld 39
              <br />
              52538 Gangelt
              <br />
              {locale === "de" ? "Deutschland" : "Germany"}
            </address>
          </div>

          <div>
            <h2 className="text-runway text-lg font-semibold sm:text-xl">
              {tr.responsibleHeading}
            </h2>
            <address className="mt-3 leading-relaxed not-italic">
              Hans-Christoph Peter Grunwald
              <br />
              Im Kranzfeld 39
              <br />
              52538 Gangelt
            </address>
          </div>

          <div>
            <h2 className="text-runway text-lg font-semibold sm:text-xl">{tr.disclaimerHeading}</h2>
            <p className="mt-3 leading-relaxed">{tr.disclaimerText}</p>
          </div>

          <div>
            <h2 className="text-runway text-lg font-semibold sm:text-xl">{tr.copyrightHeading}</h2>
            <p className="mt-3 leading-relaxed">{tr.copyrightText}</p>
          </div>
        </section>
      </article>
    </>
  );
}
