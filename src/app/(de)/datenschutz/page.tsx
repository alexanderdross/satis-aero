import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";
import { PageShell } from "@/components/page-shell";
import { pageAlternates } from "@/lib/i18n";

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
  return (
    <PageShell locale="de" alternates={pageAlternates.privacy}>
      <PrivacyContent locale="de" />
    </PageShell>
  );
}
