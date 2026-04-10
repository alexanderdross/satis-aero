import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactContent } from "@/components/contact-content";
import { WebPageJsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.contact.de;

export const metadata: Metadata = buildMetadata({
  locale: "de",
  path: "/kontakt/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.contact,
});

export default function KontaktPage() {
  return (
    <PageShell locale="de" alternates={pageAlternates.contact}>
      <WebPageJsonLd
        locale="de"
        path="/kontakt/"
        title={seo.title}
        description={seo.description}
        type="ContactPage"
      />
      <ContactContent locale="de" />
    </PageShell>
  );
}
