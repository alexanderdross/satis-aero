import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

// =============================================================================
// SATIS Aero – Root Layout
// =============================================================================
// The root layout is intentionally minimal. Locale-specific metadata is set
// per page (German pages at /, English pages under /en/). The <html lang="de">
// attribute reflects the default locale; English pages override the lang on
// their content wrapper via lang="en".
//
// Font: Liberation Sans is the planned self-hosted font (konzept.md §5.3),
// but the woff2 files are not yet in public/fonts/. Until they are added, we
// fall back to the system Arial stack defined in globals.css. To wire
// next/font/local later, replace the fallback with:
//
//   import localFont from "next/font/local";
//   const liberationSans = localFont({
//     src: [
//       { path: "../../public/fonts/LiberationSans-Regular.woff2", weight: "400", style: "normal" },
//       { path: "../../public/fonts/LiberationSans-Italic.woff2",  weight: "400", style: "italic" },
//       { path: "../../public/fonts/LiberationSans-Bold.woff2",    weight: "700", style: "normal" },
//       { path: "../../public/fonts/LiberationSans-BoldItalic.woff2", weight: "700", style: "italic" },
//     ],
//     display: "swap",
//     preload: true,
//     adjustFontFallback: "Arial",
//     variable: "--font-sans",
//   });
//
// =============================================================================

const siteUrl = "https://satis.aero";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    template: "%s | SATIS Aero",
  },
  description:
    "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality Trainings.",
  applicationName: "SATIS Aero",
  authors: [{ name: "SATIS Aero" }],
  keywords: [
    "Aviation Consultancy",
    "Flughafenfeuerwehr",
    "EASA Compliance",
    "ICAO Training",
    "CAT 9 Mock-Up",
    "Communication Training",
    "121.555 MHz",
    "Just Culture",
    "ICAO Language Proficiency",
    "VR Training Aviation",
  ],
  alternates: {
    canonical: siteUrl,
    languages: { de: "/", en: "/en" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "SATIS Aero",
    title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    description:
      "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungen, CAT 9 Mock-Up und VR.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#255685",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-cloud font-sans text-runway">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
