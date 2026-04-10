import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactContent } from "@/components/contact-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie mit SATIS Aero. Wir erstellen ein maßgeschneidertes Aviation-Trainingskonzept für Ihre Flughafenfeuerwehr, Ihre Crew oder Ihr Trainingsprogramm.",
  alternates: {
    canonical: "/kontakt/",
    languages: { de: "/kontakt/", en: "/en/contact/" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://satis.aero/kontakt/",
    siteName: "SATIS Aero",
    title: "Kontakt | SATIS Aero",
    description:
      "Sprechen Sie mit SATIS Aero. Wir erstellen ein maßgeschneidertes Aviation-Trainingskonzept.",
  },
};

export default function KontaktPage() {
  return (
    <PageShell locale="de" alternates={pageAlternates.contact}>
      <ContactContent locale="de" />
    </PageShell>
  );
}
