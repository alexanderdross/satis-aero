import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ServiceDetail } from "@/components/service-detail";
import { getServiceBySlug, services } from "@/lib/services";
import { serviceAlternates, serviceUrl } from "@/lib/i18n";

// Statically prerender all 11 service slugs at build time.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = service.title.en;
  const description = service.excerpt.en;
  return {
    title,
    description,
    alternates: {
      canonical: serviceUrl("en", slug),
      languages: {
        de: serviceUrl("de", slug),
        en: serviceUrl("en", slug),
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://satis.aero${serviceUrl("en", slug)}`,
      siteName: "SATIS Aero",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <PageShell locale="en" alternates={serviceAlternates(slug)}>
      <ServiceDetail service={service} locale="en" />
    </PageShell>
  );
}
