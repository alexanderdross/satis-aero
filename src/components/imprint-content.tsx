import { t, type Locale } from "@/lib/i18n";

export function ImprintContent({ locale }: { locale: Locale }) {
  const tr = t[locale].imprint;

  return (
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

      <section className="space-y-10 text-runway-soft">
        <div>
          <h2 className="text-lg font-semibold text-runway sm:text-xl">
            {tr.providerHeading}
          </h2>
          <address className="mt-3 not-italic leading-relaxed">
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
          <h2 className="text-lg font-semibold text-runway sm:text-xl">
            {tr.responsibleHeading}
          </h2>
          <address className="mt-3 not-italic leading-relaxed">
            Hans-Christoph Peter Grunwald
            <br />
            Im Kranzfeld 39
            <br />
            52538 Gangelt
          </address>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-runway sm:text-xl">
            {tr.disclaimerHeading}
          </h2>
          <p className="mt-3 leading-relaxed">{tr.disclaimerText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-runway sm:text-xl">
            {tr.copyrightHeading}
          </h2>
          <p className="mt-3 leading-relaxed">{tr.copyrightText}</p>
        </div>
      </section>
    </article>
  );
}
