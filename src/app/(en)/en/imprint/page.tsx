import type { Metadata } from "next";
import { ImprintContent } from "@/components/imprint-content";
import { PageShell } from "@/components/page-shell";
import { WebPageJsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.imprint.en;

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/en/imprint/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.imprint,
  nofollow: true,
});

export default function ImprintPage() {
  return (
    <PageShell locale="en" alternates={pageAlternates.imprint}>
      <WebPageJsonLd
        locale="en"
        path="/en/imprint/"
        title={seo.title}
        description={seo.description}
      />
      <ImprintContent locale="en" />
    </PageShell>
  );
}
