import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";
import { PageShell } from "@/components/page-shell";
import { WebPageJsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.privacy.de;

export const metadata: Metadata = buildMetadata({
  locale: "de",
  path: "/datenschutz/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.privacy,
  nofollow: true,
});

export default function DatenschutzPage() {
  return (
    <PageShell locale="de" alternates={pageAlternates.privacy}>
      <WebPageJsonLd
        locale="de"
        path="/datenschutz/"
        title={seo.title}
        description={seo.description}
      />
      <PrivacyContent locale="de" />
    </PageShell>
  );
}
