import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { NotFoundContent } from "@/components/not-found-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://satis.aero"),
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageShell locale="de" alternates={pageAlternates.home}>
      <NotFoundContent locale="de" />
    </PageShell>
  );
}
