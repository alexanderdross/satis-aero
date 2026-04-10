import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactContent } from "@/components/contact-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SATIS Aero. We design tailored aviation training programmes for your airport fire service, your crew or your training operation.",
  alternates: {
    canonical: "/en/contact/",
    languages: { de: "/kontakt/", en: "/en/contact/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satis.aero/en/contact/",
    siteName: "SATIS Aero",
    title: "Contact | SATIS Aero",
    description:
      "Talk to SATIS Aero. We design tailored aviation training programmes.",
  },
};

export default function ContactPage() {
  return (
    <PageShell locale="en" alternates={pageAlternates.contact}>
      <ContactContent locale="en" />
    </PageShell>
  );
}
