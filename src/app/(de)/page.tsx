import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
  description:
    "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality.",
  alternates: {
    canonical: "/",
    languages: { de: "/", en: "/en/" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://satis.aero/",
    siteName: "SATIS Aero",
    title: "SATIS Aero – Smart Aviation Training Innovative Solutions",
    description:
      "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungen, CAT 9 Mock-Up und VR.",
  },
};

export default function HomePage() {
  return (
    <PageShell locale="de" pageKey="home">
      <HomeContent locale="de" />
    </PageShell>
  );
}
