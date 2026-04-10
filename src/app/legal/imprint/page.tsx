import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von SATIS Aero – Smart Aviation Training Innovative Solutions. Inhaber: Hans-Christoph Peter Grunwald.",
  robots: { index: true, follow: false },
};

export default function ImprintPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Rechtliches
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-runway sm:text-4xl">
          Impressum
        </h1>
        <p className="mt-3 text-sm text-runway/60">
          Angaben gemäß § 5 TMG
        </p>
      </header>

      <section className="space-y-8 text-runway/85">
        <div>
          <h2 className="text-lg font-semibold text-runway">
            Diensteanbieter
          </h2>
          <address className="mt-2 not-italic leading-relaxed">
            Hans-Christoph Peter Grunwald
            <br />
            Im Kranzfeld 39
            <br />
            52538 Gangelt
            <br />
            Deutschland
          </address>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-runway">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <address className="mt-2 not-italic leading-relaxed">
            Hans-Christoph Peter Grunwald
            <br />
            Im Kranzfeld 39
            <br />
            52538 Gangelt
          </address>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-runway">Haftungsausschluss</h2>
          <p className="mt-2 leading-relaxed">
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
            erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
            Inhalte kann jedoch keine Gewähr übernommen werden. Als
            Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-runway">Urheberrecht</h2>
          <p className="mt-2 leading-relaxed">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </section>
    </article>
  );
}
