import type { Metadata } from "next";
import { ImprintContent } from "@/components/imprint-content";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von SATIS Aero – Smart Aviation Training Innovative Solutions. Inhaber: Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt.",
  alternates: {
    canonical: "/impressum/",
    languages: { de: "/impressum/", en: "/en/imprint/" },
  },
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return <ImprintContent locale="de" />;
}
