import type { Metadata } from "next";
import { ImprintContent } from "@/components/imprint-content";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Imprint of SATIS Aero – Smart Aviation Training Innovative Solutions. Owner: Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt, Germany.",
  alternates: {
    canonical: "/en/imprint/",
    languages: { de: "/impressum/", en: "/en/imprint/" },
  },
  robots: { index: true, follow: false },
};

export default function ImprintPage() {
  return (
    <PageShell locale="en" pageKey="imprint">
      <ImprintContent locale="en" />
    </PageShell>
  );
}
