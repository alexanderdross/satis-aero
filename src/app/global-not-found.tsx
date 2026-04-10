import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plane } from "lucide-react";
import { Flag } from "@/components/flag";
import logo from "../../public/images/brand/satis-logo.png";
import "./globals.css";

// =============================================================================
// SATIS Aero – Global 404
// =============================================================================
// Next.js 16 renders this file for any URL that does not match a route.
// `experimental.globalNotFound` must be enabled in next.config.ts.
//
// This file bypasses the route-group root layouts entirely – the docs are
// explicit:
//
// > The global-not-found.js file bypasses your app's normal rendering,
// > which means you'll need to import any global styles, fonts, or other
// > dependencies that your 404 page requires.
//
// That is why we:
//   1. Import ./globals.css directly.
//   2. Render our own <html>/<body>.
//   3. Ship a minimal standalone header + bilingual 404 body so users
//      get a clear escape route to either locale without us having to
//      guess which one they wanted.
// =============================================================================

export const metadata: Metadata = {
  metadataBase: new URL("https://satis.aero"),
  title: "404 – Seite nicht gefunden | SATIS Aero",
  description:
    "Die angeforderte Seite existiert nicht oder wurde verschoben. / The requested page does not exist or has been moved.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-icon-180x180.png",
  },
  alternates: {
    canonical: "https://satis.aero/",
    languages: { de: "/", en: "/en/" },
  },
};

export const viewport: Viewport = {
  themeColor: "#255685",
  width: "device-width",
  initialScale: 1,
};

export default function GlobalNotFound() {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="bg-cloud text-runway flex min-h-full flex-col font-sans">
        {/* Standalone minimal header. The full Header component lives in
            the route-group root layouts which are NOT applied to
            global-not-found, so we render a stripped-down variant here. */}
        <header className="border-sky border-b bg-white/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              title="SATIS Aero – Startseite / Home"
              aria-label="SATIS Aero – Startseite / Home"
              className="flex shrink-0 items-center"
            >
              <Image
                src={logo}
                alt="SATIS Aero Logo"
                title="SATIS Aero – Smart Aviation Training Innovative Solutions"
                height={40}
                width={119}
                placeholder="blur"
                sizes="(max-width: 640px) 96px, 119px"
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>
        </header>

        <main id="main" className="from-sky to-cloud flex flex-1 items-center bg-gradient-to-b">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
            <span className="border-primary/25 text-primary inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
              <Plane className="h-3.5 w-3.5" aria-hidden="true" />
              Fehler 404 · Error 404
            </span>

            <h1 className="text-runway mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span lang="de">Seite nicht gefunden</span>
              <br />
              <span lang="en" className="text-primary">
                Page not found
              </span>
            </h1>

            <p
              lang="de"
              className="text-runway-soft mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              Die angeforderte Seite existiert nicht oder wurde verschoben. Bitte prüfen Sie die URL
              oder kehren Sie zur Startseite zurück.
            </p>
            <p
              lang="en"
              className="text-runway-soft mx-auto mt-3 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              The requested page does not exist or has been moved. Please check the URL or return to
              the home page.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                hrefLang="de"
                title="Zur deutschen Startseite"
                className="bg-primary hover:bg-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors sm:text-base"
              >
                <Flag
                  locale="de"
                  className="h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10"
                  title="Flagge Deutschlands"
                />
                Zur Startseite
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/en/"
                hrefLang="en"
                title="Go to the English home page"
                className="border-primary/30 text-primary hover:bg-sky inline-flex items-center justify-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors sm:text-base"
              >
                <Flag
                  locale="en"
                  className="h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10"
                  title="Flag of the United Kingdom"
                />
                Back to home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-sky bg-primary-dark text-on-primary-soft border-t py-6 text-center text-xs">
          © {new Date().getFullYear()} SATIS Aero – Hans-Christoph Peter Grunwald
        </footer>
      </body>
    </html>
  );
}
