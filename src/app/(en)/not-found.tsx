import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { NotFoundContent } from "@/components/not-found-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://satis.aero"),
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageShell locale="en" alternates={pageAlternates.home}>
      <NotFoundContent locale="en" />
    </PageShell>
  );
}
