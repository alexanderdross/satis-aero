import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "../globals.css";

// =============================================================================
// SATIS Aero – English Root Layout
// =============================================================================
// Sister of src/app/(de)/layout.tsx. Routes inside this group live under
// /en/* and are rendered with <html lang="en"> and the English Header /
// Footer. Both root layouts share src/app/globals.css.
// =============================================================================

const siteUrl = "https://satis.aero";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    template: "%s | SATIS Aero",
  },
  description:
    "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.",
  applicationName: "SATIS Aero",
  authors: [{ name: "SATIS Aero" }],
  keywords: [
    "Aviation Consultancy",
    "Airport Fire Service",
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
    canonical: `${siteUrl}/en/`,
    languages: { de: "/", en: "/en/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/en/`,
    siteName: "SATIS Aero",
    title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    description:
      "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercises, CAT 9 mock-up and VR.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/icons/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/icons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      {
        url: "/icons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/apple-icon-precomposed.png",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#255685",
    "msapplication-TileImage": "/icons/ms-icon-144x144.png",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#255685",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-cloud font-sans text-runway">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header locale="en" />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
