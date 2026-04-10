import type { Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Per-Page SEO Copy
// =============================================================================
// Single source of truth for every SEO-relevant string that is **unique
// per page**. Every route imports its entry here and passes it to
// `buildMetadata()` in `src/lib/seo.ts`. That keeps the page files thin
// and guarantees that DE/EN remain in sync (missing a key is a type
// error because every entry satisfies the `PageSeo` record shape).
//
// Keyword lists follow SEO best practice: between 6 and 12 terms, mix of
// brand + topic + geography + modifier, no keyword stuffing.
// =============================================================================

export type PageSeo = {
  title: string;
  description: string;
  keywords: readonly string[];
};

export type PageSeoKey =
  | "home"
  | "contact"
  | "imprint"
  | "privacy";

export const pageSeo: Record<PageSeoKey, Record<Locale, PageSeo>> = {
  home: {
    de: {
      title:
        "SATIS Aero | Aviation Consultancy & Training für Flughäfen, Piloten und Feuerwehren",
      description:
        "SATIS Aero – Smart Aviation Training Innovative Solutions. Aviation Consultancy mit EASA-konformen Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality für Flughafenfeuerwehren, Piloten und Flughafenbetreiber in Deutschland und Europa.",
      keywords: [
        "Aviation Consultancy",
        "Flughafenfeuerwehr Training",
        "EASA Compliance Training",
        "ICAO Notfallübung",
        "CAT 9 Mock-Up Training",
        "Just Culture Awareness",
        "Communication Training Pilot",
        "121.555 MHz Training",
        "ICAO Language Proficiency",
        "VR Training Aviation",
        "Aviation Training Deutschland",
      ],
    },
    en: {
      title:
        "SATIS Aero | Aviation Consultancy & Training for Airports, Pilots and Fire Services",
      description:
        "SATIS Aero – Smart Aviation Training Innovative Solutions. Aviation consultancy offering EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training for airport fire services, pilots and airport operators in Germany and Europe.",
      keywords: [
        "Aviation Consultancy",
        "Airport Fire Service Training",
        "EASA Compliance Training",
        "ICAO Emergency Exercise",
        "CAT 9 Mock-Up Training",
        "Just Culture Awareness",
        "Pilot Communication Training",
        "121.555 MHz Training",
        "ICAO Language Proficiency",
        "VR Aviation Training",
        "Aviation Training Germany",
      ],
    },
  },

  contact: {
    de: {
      title:
        "Kontakt | SATIS Aero – Anfrage für Aviation Training & Consultancy",
      description:
        "Kontaktieren Sie SATIS Aero für eine unverbindliche Beratung zu Flughafenfeuerwehr-Trainings, EASA Compliance, ICAO-Übungen, CAT 9 Mock-Up und VR-Training. Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt.",
      keywords: [
        "SATIS Aero Kontakt",
        "Aviation Consultancy Anfrage",
        "Flughafenfeuerwehr Training Beratung",
        "EASA Training anfragen",
        "ICAO Übung planen",
        "Training Gangelt",
        "Aviation Beratung Deutschland",
      ],
    },
    en: {
      title: "Contact | SATIS Aero – Aviation Training & Consultancy Enquiry",
      description:
        "Contact SATIS Aero for a non-binding consultation on airport fire service training, EASA compliance, ICAO exercises, CAT 9 mock-up and VR training. Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt, Germany.",
      keywords: [
        "SATIS Aero contact",
        "Aviation consultancy enquiry",
        "Airport fire service training contact",
        "EASA training enquiry",
        "ICAO exercise planning",
        "Aviation consulting Germany",
      ],
    },
  },

  imprint: {
    de: {
      title: "Impressum | SATIS Aero",
      description:
        "Impressum von SATIS Aero – Smart Aviation Training Innovative Solutions. Diensteanbieter: Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt, Deutschland. Angaben gemäß § 5 TMG.",
      keywords: [
        "SATIS Aero Impressum",
        "Hans-Christoph Peter Grunwald",
        "Gangelt",
        "TMG",
        "Diensteanbieter",
      ],
    },
    en: {
      title: "Imprint | SATIS Aero",
      description:
        "Imprint of SATIS Aero – Smart Aviation Training Innovative Solutions. Service provider: Hans-Christoph Peter Grunwald, Im Kranzfeld 39, 52538 Gangelt, Germany. Information according to § 5 TMG.",
      keywords: [
        "SATIS Aero imprint",
        "Hans-Christoph Peter Grunwald",
        "Gangelt",
        "German TMG",
        "Service provider",
      ],
    },
  },

  privacy: {
    de: {
      title: "Datenschutz | SATIS Aero",
      description:
        "Datenschutzerklärung von SATIS Aero nach DSGVO: keine Cookies, kein Tracking, Hosting bei Vercel (Frankfurt), Cloudflare Turnstile als Spam-Schutz, Resend für Mail-Versand. Ihre Rechte als Betroffener.",
      keywords: [
        "SATIS Aero Datenschutz",
        "DSGVO",
        "Datenschutzerklärung",
        "Cloudflare Turnstile",
        "Vercel Hosting",
        "Resend",
      ],
    },
    en: {
      title: "Privacy | SATIS Aero",
      description:
        "GDPR-compliant privacy notice for SATIS Aero: no cookies, no tracking, hosting on Vercel (Frankfurt), Cloudflare Turnstile for spam protection, Resend for mail dispatch, your rights as a data subject.",
      keywords: [
        "SATIS Aero privacy",
        "GDPR",
        "Privacy notice",
        "Cloudflare Turnstile",
        "Vercel hosting",
        "Resend",
      ],
    },
  },
};

// Service-page keyword templates. The page title and description are
// generated from the service itself, but these extra keywords give
// every service detail page a distinct, topic-specific signal.
export const serviceKeywordsBase: Record<Locale, readonly string[]> = {
  de: [
    "SATIS Aero",
    "Aviation Training Deutschland",
    "Flughafenfeuerwehr",
    "EASA Training",
    "ICAO Compliance",
  ],
  en: [
    "SATIS Aero",
    "Aviation Training Germany",
    "Airport Fire Service",
    "EASA Training",
    "ICAO Compliance",
  ],
};
