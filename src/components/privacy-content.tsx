import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { routes, t, type Locale } from "@/lib/i18n";

export function PrivacyContent({ locale }: { locale: Locale }) {
  const tr = t[locale].privacy;
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
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {tr.eyebrow}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-runway sm:text-4xl lg:text-5xl">
          {tr.title}
        </h1>
        <p className="mt-3 text-sm text-runway-mute">{tr.sub}</p>
      </header>

      <section className="space-y-6 text-runway-soft">
        <h2 className="text-lg font-semibold text-runway sm:text-xl">
          {tr.pendingHeading}
        </h2>
        <p className="leading-relaxed">{tr.pendingText}</p>
        <p>
          <a
            href="mailto:info@satis.aero"
            title={tr.contactTitle}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {tr.contactLabel}
          </a>
        </p>
      </section>
      </article>
    </>
  );
}
