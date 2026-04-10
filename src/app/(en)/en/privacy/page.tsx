import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";
import { PageShell } from "@/components/page-shell";
import { WebPageJsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.privacy.en;

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/en/privacy/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.privacy,
  nofollow: true,
});

export default function PrivacyPage() {
  return (
    <PageShell locale="en" alternates={pageAlternates.privacy}>
      <WebPageJsonLd
        locale="en"
        path="/en/privacy/"
        title={seo.title}
        description={seo.description}
      />
      <PrivacyContent locale="en" />
    </PageShell>
  );
}
