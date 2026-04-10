import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/brand/satis-logo.png";

const navItems = [
  { href: "/#services", label: "Leistungen" },
  { href: "/#about", label: "Über uns" },
  { href: "/#contact", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label="SATIS Aero – Startseite"
          className="flex items-center"
        >
          <Image
            src={logo}
            alt="SATIS Aero Logo"
            title="SATIS Aero – Smart Aviation Training Innovative Solutions"
            height={40}
            width={119}
            placeholder="blur"
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Hauptnavigation">
          <ul className="flex items-center gap-2 text-sm font-medium sm:gap-6 sm:text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-2 py-1 text-runway transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="ml-2 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Anfrage
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
