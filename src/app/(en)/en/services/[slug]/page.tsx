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

  const title = `${service.title.en} | SATIS Aero`;
  const description = service.excerpt.en;
  const path = serviceUrl("en", slug);

  const keywords = [
    ...serviceKeywordsBase.en,
    service.title.en,
    service.menuTitle.en,
    ...(service.compliance ?? []),
  ];

  return buildMetadata({
    locale: "en",
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

  const path = serviceUrl("en", slug);
  const title = `${service.title.en} | SATIS Aero`;
  const description = service.excerpt.en;

  return (
    <PageShell
      locale="en"
      alternates={serviceAlternates(slug)}
      path={path}
      productName={service.title.en}
      productDescription={service.description.en}
      productSeed={service.slug}
    >
      <WebPageJsonLd
        locale="en"
        path={path}
        title={title}
        description={description}
      />
      <ServiceDetail service={service} locale="en" />
    </PageShell>
  );
}
