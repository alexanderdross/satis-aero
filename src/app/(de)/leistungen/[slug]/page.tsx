import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ServiceDetail } from "@/components/service-detail";
import { WebPageJsonLd } from "@/components/json-ld";
import { getServiceBySlug, services } from "@/lib/services";
import { serviceAlternates, serviceUrl } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { serviceKeywordsBase } from "@/lib/seo-copy";

// Statically prerender all 11 service slugs at build time.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title.de} | SATIS Aero`;
  const description = service.excerpt.de;
  const path = serviceUrl("de", slug);

  // Per-service keyword list: base + the service's own title + compliance
  // references. This gives every detail page a unique topical signature.
  const keywords = [
    ...serviceKeywordsBase.de,
    service.title.de,
    service.menuTitle.de,
    ...(service.compliance ?? []),
  ];

  return buildMetadata({
    locale: "de",
    path,
    title,
    description,
    keywords,
    alternates: serviceAlternates(slug),
    ogType: "article",
    article: {
      section: "Aviation Training",
      tags: service.compliance,
    },
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const path = serviceUrl("de", slug);
  const title = `${service.title.de} | SATIS Aero`;
  const description = service.excerpt.de;

  return (
    <PageShell
      locale="de"
      alternates={serviceAlternates(slug)}
      path={path}
      productName={service.title.de}
      productDescription={service.description.de}
      productSeed={service.slug}
    >
      <WebPageJsonLd locale="de" path={path} title={title} description={description} />
      <ServiceDetail service={service} locale="de" />
    </PageShell>
  );
}
