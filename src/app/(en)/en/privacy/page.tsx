import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy information for SATIS Aero – Smart Aviation Training Innovative Solutions.",
  alternates: {
    canonical: "/en/privacy/",
    languages: { de: "/datenschutz/", en: "/en/privacy/" },
  },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <PageShell locale="en" pageKey="privacy">
      <PrivacyContent locale="en" />
    </PageShell>
  );
}
