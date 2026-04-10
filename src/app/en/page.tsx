import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
  description:
    "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.",
  alternates: {
    canonical: "/en/",
    languages: { de: "/", en: "/en/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satis.aero/en/",
    siteName: "SATIS Aero",
    title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    description:
      "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and VR.",
  },
};

export default function EnglishHomePage() {
  return <HomeContent locale="en" />;
}
