import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { PageShell } from "@/components/page-shell";
import {
  ServiceItemListJsonLd,
  WebPageJsonLd,
  WebSiteJsonLd,
} from "@/components/json-ld";
import { pageAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

const seo = pageSeo.home.en;

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/en/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.home,
});

export default function EnglishHomePage() {
  return (
    <PageShell locale="en" alternates={pageAlternates.home}>
      <WebSiteJsonLd locale="en" />
      <WebPageJsonLd
        locale="en"
        path="/en/"
        title={seo.title}
        description={seo.description}
      />
      <ServiceItemListJsonLd locale="en" />
      <HomeContent locale="en" />
    </PageShell>
  );
}
