import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { routes, t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Privacy Notice (Server Component)
// =============================================================================
// General-purpose privacy notice covering the data we actually process on
// this site:
//   - Vercel hosting access logs (Frankfurt fra1)
//   - Cloudflare Turnstile (only on /kontakt/ and /en/contact/)
//   - Contact form submissions (Resend mail dispatch)
//   - First-party storage (none — no analytics, no third-party tracking)
//
// !!! Wichtig: Das ist eine **technische Datenschutzerklärung**, die alle
// Datenflüsse abdeckt, die unser Code aktuell auslöst. Vor dem Go-Live
// **muss ein Anwalt** den Text auf landes- und unternehmensspezifische
// Pflichten prüfen. Aktualisiert bei jedem neuen Datenfluss (z. B. wenn
// Analytics dazu kommt). Letzte Code-Aktualisierung: siehe git blame.
// =============================================================================

const SECTIONS_DE = [
  {
    heading: "1. Verantwortlicher",
    body: (
      <>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
          ist:
        </p>
        <address className="not-italic">
          Hans-Christoph Peter Grunwald
          <br />
          Im Kranzfeld 39
          <br />
          52538 Gangelt
          <br />
          Deutschland
          <br />
          E-Mail:{" "}
          <a
            href="mailto:info@satis.aero"
            title="E-Mail an SATIS Aero senden"
            className="font-semibold text-primary hover:underline"
          >
            info@satis.aero
          </a>
        </address>
      </>
    ),
  },
  {
    heading: "2. Hosting (Vercel)",
    body: (
      <>
        <p>
          Diese Website wird auf der Edge-Plattform von Vercel Inc. (440 N
          Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Wir nutzen die
          europäische Region Frankfurt (fra1). Beim Aufruf einer Seite erhebt
          Vercel automatisch technische Zugriffsdaten in Server-Logs:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>IP-Adresse (gekürzt verarbeitet)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Aufgerufene URL</li>
          <li>Übertragene Datenmenge</li>
          <li>Browser-Typ und Betriebssystem (User-Agent)</li>
          <li>Referrer (verweisende Seite)</li>
        </ul>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – unser
          berechtigtes Interesse an einem stabilen, sicheren und
          funktionsfähigen Webauftritt. Die Logs werden von Vercel
          automatisch nach maximal 30 Tagen gelöscht. Datenverarbeitungs­
          vereinbarung: vercel.com/legal/dpa.
        </p>
      </>
    ),
  },
  {
    heading: "3. Cookies",
    body: (
      <p>
        Diese Website setzt **keine Cookies** zu Tracking- oder Analyse­zwecken
        und verwendet **keine** Dienste für Webanalyse oder Re-Targeting. Es
        existiert daher auch kein Cookie-Banner. Lediglich der unter Ziffer 4
        beschriebene Spamschutz auf der Kontaktseite kann technisch
        notwendige Daten an Cloudflare übermitteln.
      </p>
    ),
  },
  {
    heading: "4. Spam-Schutz für das Kontaktformular (Cloudflare Turnstile)",
    body: (
      <>
        <p>
          Auf der Seite{" "}
          <a
            href="/kontakt/"
            title="Zum Kontaktformular"
            className="font-semibold text-primary hover:underline"
          >
            /kontakt/
          </a>{" "}
          (sowie der englischen Variante{" "}
          <a
            href="/en/contact/"
            title="Open the contact form"
            className="font-semibold text-primary hover:underline"
          >
            /en/contact/
          </a>
          ) setzen wir Cloudflare Turnstile als Spam-Schutz ein. Anbieter ist
          Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
        </p>
        <p>
          Turnstile prüft beim Absenden des Formulars über kryptografische
          Signale, ob die Anfrage von einem echten Menschen stammt. Dabei
          werden Browser-Eigenschaften, Maus- und Tastaturmuster und die
          IP-Adresse an Cloudflare übertragen und ausschließlich zum Zweck
          der Bot-Erkennung verarbeitet. Cloudflare setzt dafür **keine
          Cookies** und nutzt die Daten nach eigenen Angaben nicht für
          Werbezwecke (siehe Cloudflare Privacy Policy).
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – unser
          berechtigtes Interesse, Spam-Anfragen abzuwehren. Cloudflare ist
          unter dem EU-US Data Privacy Framework zertifiziert.
        </p>
      </>
    ),
  },
  {
    heading: "5. Kontaktformular und Mail-Versand (Resend)",
    body: (
      <>
        <p>
          Wenn Sie das Kontaktformular ausfüllen, verarbeiten wir die von
          Ihnen freiwillig angegebenen Daten (Name, E-Mail, optional
          Organisation, Betreff, Nachricht), um Ihre Anfrage zu beantworten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines
          Vertragsverhältnisses) bzw. Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an effektiver Kommunikation).
        </p>
        <p>
          Der Versand der Nachricht erfolgt über den Dienstleister Resend
          (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114,
          USA). Resend speichert die zugestellten E-Mails und Metadaten
          temporär zum Zweck der Zustellung und Fehleranalyse. Mit Resend
          besteht ein Auftragsverarbeitungsvertrag.
        </p>
        <p>
          Wir speichern Ihre Anfrage so lange, wie es zur Bearbeitung
          erforderlich ist, sowie für die gesetzlichen Aufbewahrungsfristen.
          Eine Weitergabe an Dritte erfolgt nicht.
        </p>
      </>
    ),
  },
  {
    heading: "6. Statische Assets und CDN",
    body: (
      <p>
        Bilder, Schriftarten und Icons werden vom selben Vercel Edge-Cache
        ausgeliefert, der auch die HTML-Seiten ausliefert. Es werden keine
        Drittanbieter-CDNs eingebunden. Schriftarten werden self-hosted
        ausgeliefert und stellen keine Verbindung zu Google Fonts oder
        anderen Dritten her.
      </p>
    ),
  },
  {
    heading: "7. Ihre Rechte",
    body: (
      <>
        <p>
          Ihnen stehen nach DSGVO unter anderem folgende Rechte zu:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>Recht auf Auskunft (Art. 15)</li>
          <li>Recht auf Berichtigung (Art. 16)</li>
          <li>Recht auf Löschung (Art. 17)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20)</li>
          <li>Widerspruchsrecht (Art. 21)</li>
          <li>
            Beschwerderecht bei einer Aufsichtsbehörde (Art. 77) – zuständig
            ist die Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen.
          </li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{" "}
          <a
            href="mailto:info@satis.aero"
            title="Datenschutzanfrage per E-Mail"
            className="font-semibold text-primary hover:underline"
          >
            info@satis.aero
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "8. Stand und Änderungen",
    body: (
      <p>
        Diese Datenschutzerklärung beschreibt den aktuellen Stand der
        technischen Implementierung. Wenn wir die Website oder die
        eingesetzten Dienste ändern, passen wir diese Erklärung
        entsprechend an. Es gilt jeweils die hier veröffentlichte Fassung.
      </p>
    ),
  },
];

const SECTIONS_EN = [
  {
    heading: "1. Controller",
    body: (
      <>
        <p>
          Controller in the sense of the General Data Protection Regulation
          (GDPR) is:
        </p>
        <address className="not-italic">
          Hans-Christoph Peter Grunwald
          <br />
          Im Kranzfeld 39
          <br />
          52538 Gangelt
          <br />
          Germany
          <br />
          Email:{" "}
          <a
            href="mailto:info@satis.aero"
            title="Send an email to SATIS Aero"
            className="font-semibold text-primary hover:underline"
          >
            info@satis.aero
          </a>
        </address>
      </>
    ),
  },
  {
    heading: "2. Hosting (Vercel)",
    body: (
      <>
        <p>
          This website is hosted on the edge platform of Vercel Inc. (440 N
          Barranca Ave #4133, Covina, CA 91723, USA). We use the European
          region Frankfurt (fra1). When a page is requested, Vercel
          automatically collects technical access data in server logs:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>IP address (processed in shortened form)</li>
          <li>Date and time of the request</li>
          <li>Requested URL</li>
          <li>Amount of data transferred</li>
          <li>Browser type and operating system (user agent)</li>
          <li>Referrer (originating page)</li>
        </ul>
        <p>
          The legal basis is Art. 6(1)(f) GDPR – our legitimate interest in
          a stable, secure and operational website. Vercel automatically
          deletes the logs after at most 30 days. Data Processing Agreement:
          vercel.com/legal/dpa.
        </p>
      </>
    ),
  },
  {
    heading: "3. Cookies",
    body: (
      <p>
        This website does **not** set cookies for tracking or analytics
        purposes and does **not** use any web analytics or re-targeting
        services. Therefore there is also no cookie banner. Only the spam
        protection on the contact page (see section 4) may transmit
        technically necessary data to Cloudflare.
      </p>
    ),
  },
  {
    heading: "4. Spam protection on the contact form (Cloudflare Turnstile)",
    body: (
      <>
        <p>
          On the page{" "}
          <a
            href="/en/contact/"
            title="Open the contact form"
            className="font-semibold text-primary hover:underline"
          >
            /en/contact/
          </a>{" "}
          (and the German variant{" "}
          <a
            href="/kontakt/"
            title="Zum Kontaktformular"
            className="font-semibold text-primary hover:underline"
          >
            /kontakt/
          </a>
          ) we use Cloudflare Turnstile for spam protection. Provider is
          Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
        </p>
        <p>
          Turnstile uses cryptographic signals to verify when the form is
          submitted that the request comes from a real human. Browser
          characteristics, mouse and keyboard patterns and the IP address
          are transmitted to Cloudflare and processed exclusively for the
          purpose of bot detection. According to Cloudflare, Turnstile does
          **not set cookies** and the data is not used for advertising
          purposes (see Cloudflare Privacy Policy).
        </p>
        <p>
          The legal basis is Art. 6(1)(f) GDPR – our legitimate interest in
          rejecting spam submissions. Cloudflare is certified under the
          EU-US Data Privacy Framework.
        </p>
      </>
    ),
  },
  {
    heading: "5. Contact form and mail dispatch (Resend)",
    body: (
      <>
        <p>
          When you fill in the contact form, we process the data you
          voluntarily provide (name, email, optional organisation, subject,
          message) in order to respond to your enquiry. The legal basis is
          Art. 6(1)(b) GDPR (initiation of a contractual relationship) or
          Art. 6(1)(f) GDPR (legitimate interest in effective communication).
        </p>
        <p>
          Mail dispatch is handled by the service provider Resend (Resend,
          Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA).
          Resend stores the delivered emails and their metadata temporarily
          for the purpose of delivery and error analysis. A data processing
          agreement is in place with Resend.
        </p>
        <p>
          We retain your enquiry only as long as necessary for handling it
          and for any statutory retention periods. The data is not shared
          with third parties.
        </p>
      </>
    ),
  },
  {
    heading: "6. Static assets and CDN",
    body: (
      <p>
        Images, fonts and icons are served from the same Vercel edge cache
        that delivers the HTML pages. No third-party CDNs are loaded.
        Fonts are self-hosted and do not establish any connection to Google
        Fonts or other third parties.
      </p>
    ),
  },
  {
    heading: "7. Your rights",
    body: (
      <>
        <p>Under GDPR you have, among others, the following rights:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Right of access (Art. 15)</li>
          <li>Right to rectification (Art. 16)</li>
          <li>Right to erasure (Art. 17)</li>
          <li>Right to restriction of processing (Art. 18)</li>
          <li>Right to data portability (Art. 20)</li>
          <li>Right to object (Art. 21)</li>
          <li>
            Right to lodge a complaint with a supervisory authority
            (Art. 77) – the responsible authority is the State Commissioner
            for Data Protection and Freedom of Information of North
            Rhine-Westphalia.
          </li>
        </ul>
        <p>
          To exercise your rights, an informal email to{" "}
          <a
            href="mailto:info@satis.aero"
            title="Privacy request via email"
            className="font-semibold text-primary hover:underline"
          >
            info@satis.aero
          </a>{" "}
          is sufficient.
        </p>
      </>
    ),
  },
  {
    heading: "8. Status and changes",
    body: (
      <p>
        This privacy notice describes the current state of our technical
        implementation. If we change the website or the services we use, we
        will update this notice accordingly. The version published here at
        any given time applies.
      </p>
    ),
  },
];

export function PrivacyContent({ locale }: { locale: Locale }) {
  const tr = t[locale].privacy;
  const r = routes[locale];
  const sections = locale === "de" ? SECTIONS_DE : SECTIONS_EN;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: r.home,
      label: t[locale].breadcrumbs.home,
      title: t[locale].breadcrumbs.homeTitle,
    },
    { label: tr.title },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} locale={locale} />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {tr.eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-runway sm:text-4xl lg:text-5xl">
            {tr.title}
          </h1>
          <p className="mt-3 text-sm text-runway-mute">{tr.sub}</p>
        </header>

        <div className="space-y-12 text-runway-soft">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="space-y-3 leading-relaxed"
            >
              <h2 className="text-lg font-semibold text-runway sm:text-xl">
                {section.heading}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
