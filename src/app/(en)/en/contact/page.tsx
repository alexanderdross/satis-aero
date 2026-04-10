import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactContent } from "@/components/contact-content";
import { WebPageJsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.contact.en;

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/en/contact/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.contact,
});

export default function ContactPage() {
  return (
    <PageShell locale="en" alternates={pageAlternates.contact}>
      <WebPageJsonLd
        locale="en"
        path="/en/contact/"
        title={seo.title}
        description={seo.description}
        type="ContactPage"
      />
      <ContactContent locale="en" />
    </PageShell>
  );
}
