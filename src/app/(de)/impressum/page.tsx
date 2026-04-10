import type { Metadata } from "next";
import { ImprintContent } from "@/components/imprint-content";
import { PageShell } from "@/components/page-shell";
import { pageAlternates } from "@/lib/i18n";

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
  return (
    <PageShell locale="de" alternates={pageAlternates.imprint}>
      <ImprintContent locale="de" />
    </PageShell>
  );
}
