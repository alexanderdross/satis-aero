import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";
import { ServicesDropdown } from "@/components/services-dropdown";
import { routes, t, type Locale, type PageAlternates } from "@/lib/i18n";
import logo from "../../public/images/brand/satis-logo.png";

// =============================================================================
// SATIS Aero – Header (Server Component)
// =============================================================================
// Pure server component, no JavaScript shipped to the client. The page that
// renders the header passes its own `alternates` map so the language
// dropdown links to the equivalent page in the other locale (not the home
// page).
// =============================================================================

export function Header({ locale, alternates }: { locale: Locale; alternates: PageAlternates }) {
  const tr = t[locale];
  const r = routes[locale];

  // Trailing nav items (after the Services dropdown). The Services menu is
  // a server-side <details> dropdown rendered separately below.
  const navItems = [
    { href: r.about, label: tr.nav.about, title: tr.nav.about },
    {
      href: r.contact,
      label: tr.nav.contact,
      title: tr.nav.contactTitle,
    },
  ];

  return (
    <header className="satis-header border-sky sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <Link
          href={r.home}
          aria-label={`${tr.siteName} – ${tr.nav.home}`}
          title={tr.nav.logoTitle}
          className="flex shrink-0 items-center"
        >
          <Image
            src={logo}
            alt={`${tr.siteName} ${tr.siteTagline} Logo`}
            title={tr.nav.logoTitle}
            height={40}
            width={119}
            placeholder="blur"
            preload
            sizes="(max-width: 640px) 96px, 119px"
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label={tr.nav.ariaLabel} className="flex items-center">
          <ul className="flex items-center gap-1.5 text-sm font-medium sm:gap-2 md:gap-2 lg:gap-4">
            <li className="hidden md:block">
              <ServicesDropdown locale={locale} />
            </li>
            {navItems.map((item) => (
              <li key={item.href} className="hidden md:block">
                <Link
                  href={item.href}
                  title={item.title}
                  className="text-runway hover:bg-sky hover:text-primary focus-visible:bg-sky rounded-md px-3 py-2 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={r.contact}
                title={tr.nav.ctaTitle}
                className="bg-primary hover:bg-primary-dark inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors sm:px-5 sm:py-2 sm:text-sm"
              >
                {tr.nav.cta}
              </Link>
            </li>
            <li>
              <LanguageSwitcher current={locale} alternates={alternates} />
            </li>
            <li className="md:hidden">
              <MobileMenu locale={locale} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
