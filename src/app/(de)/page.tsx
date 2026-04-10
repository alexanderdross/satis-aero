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

const seo = pageSeo.home.de;

export const metadata: Metadata = buildMetadata({
  locale: "de",
  path: "/",
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: pageAlternates.home,
});

export default function HomePage() {
  return (
    <PageShell locale="de" alternates={pageAlternates.home}>
      <WebSiteJsonLd locale="de" />
      <WebPageJsonLd
        locale="de"
        path="/"
        title={seo.title}
        description={seo.description}
      />
      <ServiceItemListJsonLd locale="de" />
      <HomeContent locale="de" />
    </PageShell>
  );
}
