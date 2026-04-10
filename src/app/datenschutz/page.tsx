import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzinformationen von SATIS Aero – Smart Aviation Training Innovative Solutions.",
  alternates: {
    canonical: "/datenschutz/",
    languages: { de: "/datenschutz/", en: "/en/privacy/" },
  },
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return <PrivacyContent locale="de" />;
}
