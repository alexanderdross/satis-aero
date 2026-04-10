import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/brand/satis-logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sky bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src={logo}
            alt="SATIS Aero Logo"
            title="SATIS Aero"
            height={32}
            width={95}
            placeholder="blur"
            className="mb-4 h-8 w-auto brightness-0 invert"
          />
          <p className="text-sm text-white/70">
            Smart Aviation Training Innovative Solutions. Aviation Consultancy
            für Flughafenfeuerwehren, Piloten und Flughafenbetreiber.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Leistungen
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/#services" className="hover:text-white">
                EASA Compliance Training
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white">
                ICAO-Übungen
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white">
                CAT 9 Mock-Up Training
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white">
                Virtual Reality Trainings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Unternehmen
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/#about" className="hover:text-white">
                Über uns
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/legal/imprint" className="hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Kontakt
          </h2>
          <address className="space-y-2 text-sm not-italic text-white/80">
            <p>Hans-Christoph Peter Grunwald</p>
            <p>
              Im Kranzfeld 39
              <br />
              52538 Gangelt
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-white/60 sm:flex-row">
          <p>© {year} SATIS Aero – Hans-Christoph Peter Grunwald</p>
          <p>Hosted on Vercel · Made in Germany</p>
        </div>
      </div>
    </footer>
  );
}
