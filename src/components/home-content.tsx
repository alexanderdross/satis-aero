import Image from "next/image";
import Link from "next/link";
import { Plane, ShieldCheck, Award, Sparkles, ArrowRight, Mail } from "lucide-react";
import { services } from "@/lib/services";
import { anchors, routes, serviceUrl, t, type Locale } from "@/lib/i18n";
import logo from "../../public/images/brand/satis-logo.png";

// =============================================================================
// SATIS Aero – Home Content
// =============================================================================
// Locale-agnostic homepage. Each instance receives the locale and pulls its
// strings from src/lib/i18n.ts. Section ids and in-page anchors are taken
// from `anchors[locale]` so the German version uses German hashes
// (#leistungen, #ueber-uns, #kontakt) and the English version uses English
// hashes (#services, #about, #contact).
// =============================================================================

export function HomeContent({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const a = anchors[locale];
  const r = routes[locale];

  // Tailwind sees only fully-spelled class strings, so we keep static
  // class lists rather than building them dynamically. The html lang
  // attribute is set by the surrounding root layout (/(de) or /(en)),
  // so no extra <div lang> wrapper is needed.
  return (
    <>
      {/* ===================================================================
       *  HERO
       * =================================================================== */}
      <section
        aria-labelledby="hero-heading"
        className="from-sky to-cloud relative overflow-hidden bg-gradient-to-b"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_top_right,rgba(37,86,133,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="border-primary/25 text-primary inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                <Plane className="h-3.5 w-3.5" aria-hidden="true" />
                {tr.hero.badge}
              </p>
              <h1
                id="hero-heading"
                className="text-runway mt-6 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {tr.hero.titlePrefix} <span className="text-primary">{tr.hero.titleAccent}</span>
              </h1>
              <p className="text-runway-soft mt-5 max-w-xl text-base leading-relaxed sm:mt-6 sm:text-lg">
                {tr.hero.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href={`#${a.services}`}
                  title={tr.hero.ctaPrimaryTitle}
                  className="bg-primary hover:bg-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors sm:text-base"
                >
                  {tr.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`#${a.contact}`}
                  title={tr.hero.ctaSecondaryTitle}
                  className="border-primary/30 text-primary hover:bg-sky inline-flex items-center justify-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors sm:text-base"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {tr.hero.ctaSecondary}
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="border-primary/10 shadow-primary/10 rounded-2xl border bg-white/90 p-8 shadow-xl backdrop-blur sm:p-10">
                <Image
                  src={logo}
                  alt={tr.hero.logoAlt}
                  title={tr.nav.logoTitle}
                  height={108}
                  width={321}
                  placeholder="blur"
                  preload
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 321px"
                  className="h-20 w-auto sm:h-24 md:h-28"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
       *  USP / VALUE PROPS
       * =================================================================== */}
      <section aria-labelledby="usp-heading" className="border-sky border-y bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="usp-heading"
              className="text-runway text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {tr.usp.heading}
            </h2>
            <p className="text-runway-mute mt-3 text-sm sm:text-base">{tr.usp.subheading}</p>
          </div>

          <ul className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-3">
            {tr.usp.items.map((item, idx) => {
              const Icon = [ShieldCheck, Award, Sparkles][idx];
              return (
                <li key={item.title}>
                  <div className="bg-sky text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-runway text-lg font-semibold sm:text-xl">{item.title}</h3>
                  <p className="text-runway-soft mt-2 text-sm leading-relaxed sm:text-base">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===================================================================
       *  SERVICES
       * =================================================================== */}
      <section
        id={a.services}
        aria-labelledby="services-heading"
        className="bg-cloud py-16 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-primary text-xs font-semibold tracking-wider uppercase">
              {tr.services.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="text-runway mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {tr.services.heading}
            </h2>
            <p className="text-runway-mute mt-4 text-sm sm:text-base">{tr.services.sub}</p>
          </div>

          <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              const title = service.title[locale];
              const excerpt = service.excerpt[locale];
              const href = serviceUrl(locale, service.slug);
              return (
                <li
                  key={service.slug}
                  className="group border-runway-mute/25 shadow-primary/10 ring-runway-mute/5 hover:border-primary/40 hover:shadow-primary/15 flex flex-col rounded-xl border bg-white shadow-md ring-1 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Link href={href} title={title} className="flex h-full flex-col p-5 sm:p-6">
                    <div className="bg-sky text-primary group-hover:bg-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-runway group-hover:text-primary text-base leading-snug font-semibold transition-colors sm:text-lg">
                      {title}
                    </h3>
                    <p className="text-runway-soft mt-2 flex-1 text-sm leading-relaxed">
                      {excerpt}
                    </p>
                    {service.compliance && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {service.compliance.map((item) => (
                          <li
                            key={item}
                            className="bg-sky text-primary-dark inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===================================================================
       *  ABOUT
       * =================================================================== */}
      <section
        id={a.about}
        aria-labelledby="about-heading"
        className="bg-white py-16 sm:py-20 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-primary text-xs font-semibold tracking-wider uppercase">
              {tr.about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="text-runway mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            >
              {tr.about.heading}
            </h2>
            <p className="text-runway-soft mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg">
              {tr.about.p1}
            </p>
            <p className="text-runway-soft mt-4 text-base leading-relaxed sm:text-lg">
              {tr.about.p2}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {tr.about.stats.map((stat) => (
              <li
                key={stat.label}
                className="border-runway-mute/25 shadow-primary/10 ring-runway-mute/5 rounded-xl border bg-white p-5 shadow-md ring-1 sm:p-6"
              >
                <div className="text-primary text-2xl font-bold sm:text-3xl">{stat.number}</div>
                <div className="text-runway-mute mt-1 text-sm">{stat.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================================================================
       *  CTA / CONTACT
       * =================================================================== */}
      <section
        id={a.contact}
        aria-labelledby="contact-heading"
        className="bg-primary text-on-primary py-16 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2
            id="contact-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {tr.contact.heading}
          </h2>
          <p className="text-on-primary-soft mt-4 text-base sm:text-lg">{tr.contact.sub}</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href={r.contact}
              title={tr.nav.contactTitle}
              className="text-primary hover:bg-sky inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold transition-colors sm:text-base"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {tr.nav.contact}
            </Link>
            <Link
              href={r.imprint}
              title={tr.contact.imprintTitle}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
            >
              {tr.contact.imprintLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
