import Image from "next/image";
import Link from "next/link";
import { routes, t, type Locale } from "@/lib/i18n";
import logo from "../../public/images/brand/satis-logo.png";

// =============================================================================
// SATIS Aero – Footer (Server Component)
// =============================================================================
// Pure server component, no JavaScript shipped to the client. The locale is
// passed in by the route-group root layout (DE or EN).
// =============================================================================

export function Footer({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const r = routes[locale];
  const year = new Date().getFullYear();
  const copy = tr.footer.copy.replace("{year}", String(year));

  return (
    <footer className="border-t border-sky bg-primary-dark text-on-primary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div>
          <Image
            src={logo}
            alt={`${tr.siteName} ${tr.siteTagline} Logo`}
            title={tr.siteName}
            height={32}
            width={95}
            placeholder="blur"
            sizes="95px"
            className="mb-4 h-8 w-auto brightness-0 invert"
          />
          <p className="text-sm leading-relaxed text-on-primary-soft">
            {tr.footer.tagline}
          </p>
        </div>

        <nav aria-label={tr.footer.colServices}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-primary">
            {tr.footer.colServices}
          </h2>
          <ul className="space-y-2 text-sm text-on-primary-soft">
            <li>
              <Link
                href={r.services}
                title={tr.footer.links.services}
                className="hover:text-on-primary"
              >
                {tr.footer.links.services}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={tr.footer.colCompany}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-primary">
            {tr.footer.colCompany}
          </h2>
          <ul className="space-y-2 text-sm text-on-primary-soft">
            <li>
              <Link
                href={r.about}
                title={tr.footer.links.about}
                className="hover:text-on-primary"
              >
                {tr.footer.links.about}
              </Link>
            </li>
            <li>
              <Link
                href={r.contact}
                title={tr.footer.links.contact}
                className="hover:text-on-primary"
              >
                {tr.footer.links.contact}
              </Link>
            </li>
            <li>
              <Link
                href={r.imprint}
                title={tr.footer.links.imprint}
                className="hover:text-on-primary"
              >
                {tr.footer.links.imprint}
              </Link>
            </li>
            <li>
              <Link
                href={r.privacy}
                title={tr.footer.links.privacy}
                className="hover:text-on-primary"
              >
                {tr.footer.links.privacy}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-primary">
            {tr.footer.colContact}
          </h2>
          <address className="space-y-2 text-sm not-italic leading-relaxed text-on-primary-soft">
            <p>Hans-Christoph Peter Grunwald</p>
            <p>
              Im Kranzfeld 39
              <br />
              52538 Gangelt
            </p>
            <p>
              <a
                href="mailto:info@satis.aero"
                title={tr.contact.mailTitle}
                className="hover:text-on-primary"
              >
                info@satis.aero
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-on-primary-mute sm:flex-row sm:px-8">
          <p>{copy}</p>
          <p>{tr.footer.hosting}</p>
        </div>
      </div>
    </footer>
  );
}
