// =============================================================================
// SATIS Aero – i18n Content
// =============================================================================
// Single source of truth for all UI strings, anchors and route paths per
// locale. DE is the default and lives at /, EN lives under /en.
// =============================================================================

export type Locale = "de" | "en";

export const locales: Locale[] = ["de", "en"];
export const defaultLocale: Locale = "de";

// Route paths per locale. The German imprint lives at /impressum/, the
// German privacy at /datenschutz/. The English equivalents live under
// /en/. All routes end with a trailing slash so they match the
// `trailingSlash: true` setting in next.config.ts and avoid 308
// redirects on internal navigation.
export const routes = {
  de: {
    home: "/",
    imprint: "/impressum/",
    privacy: "/datenschutz/",
    services: "/#leistungen",
    about: "/#ueber-uns",
    contact: "/#kontakt",
  },
  en: {
    home: "/en/",
    imprint: "/en/imprint/",
    privacy: "/en/privacy/",
    services: "/en/#services",
    about: "/en/#about",
    contact: "/en/#contact",
  },
} as const;

// Section IDs used as in-page anchors. German page uses German slugs,
// English page uses English slugs.
export const anchors = {
  de: {
    services: "leistungen",
    about: "ueber-uns",
    contact: "kontakt",
  },
  en: {
    services: "services",
    about: "about",
    contact: "contact",
  },
} as const;

export const t = {
  de: {
    siteName: "SATIS Aero",
    siteTagline: "Smart Aviation Training Innovative Solutions",
    siteDescription:
      "Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber. EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality Trainings.",
    nav: {
      services: "Leistungen",
      about: "Über uns",
      contact: "Kontakt",
      cta: "Anfrage",
      ctaTitle: "Jetzt unverbindliche Anfrage stellen",
      home: "Startseite",
      ariaLabel: "Hauptnavigation",
      logoTitle:
        "SATIS Aero – Smart Aviation Training Innovative Solutions, Startseite",
      langSwitch: "EN",
      langSwitchTitle: "Switch to English version",
    },
    hero: {
      badge: "Aviation Consultancy",
      titlePrefix: "Smart Aviation Training",
      titleAccent: "Innovative Solutions",
      subtitle:
        "EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up und Virtual Reality für Flughafenfeuerwehren, Piloten und Flughafenbetreiber – aus einer Hand.",
      ctaPrimary: "Leistungen ansehen",
      ctaPrimaryTitle: "Zu unseren Aviation Trainings und Services",
      ctaSecondary: "Kontakt aufnehmen",
      ctaSecondaryTitle: "Direkt mit SATIS Aero in Kontakt treten",
      logoAlt:
        "SATIS Aero Logo – Smart Aviation Training Innovative Solutions",
    },
    usp: {
      heading: "Warum SATIS Aero?",
      subheading: "Drei Gründe für unsere Aviation Consultancy",
      items: [
        {
          title: "EASA & ICAO konform",
          text: "Alle Trainings entsprechen den geltenden EASA- und ICAO-Vorgaben. Audit-ready Dokumentation inklusive.",
        },
        {
          title: "Praxiserprobt",
          text: "Live-Fire-Training am CAT 9 Mock-Up und Coaching bei den 2-jährlichen ICAO-Notfallübungen.",
        },
        {
          title: "Innovativ",
          text: "Virtual Reality, eigenes Training Management System und moderne Methodik für nachhaltigen Lernerfolg.",
        },
      ],
    },
    services: {
      eyebrow: "Unsere Leistungen",
      heading: "Trainings & Coaching für die Aviation-Industrie",
      sub: "Elf spezialisierte Services für Flughafenfeuerwehren, Piloten und Flughafenbetreiber.",
      cardTitleSuffix: "– mehr erfahren",
    },
    about: {
      eyebrow: "Über SATIS Aero",
      heading: "Aviation-Expertise auf höchstem Niveau",
      p1: "SATIS Aero ist eine spezialisierte Aviation Consultancy mit Fokus auf Flughafenfeuerwehren, ICAO-Compliance und Pilot-Communication. Wir unterstützen Flughäfen, Behörden und Airlines bei Konzeption, Durchführung und Dokumentation sicherheitskritischer Trainings.",
      p2: "Unser Anspruch: messbarer Lernerfolg, audit-feste Dokumentation und moderne Trainingsmethodik – von der klassischen Grundausbildung bis zur immersiven VR-Simulation.",
      stats: [
        { number: "11", label: "Spezialisierte Services" },
        { number: "EASA", label: "& ICAO konform" },
        { number: "CAT 9", label: "Mock-Up Training" },
        { number: "VR", label: "Innovative Methodik" },
      ],
    },
    contact: {
      heading: "Bereit für das nächste Training?",
      sub: "Sprechen wir über Ihre Anforderungen. Wir erstellen ein maßgeschneidertes Konzept für Ihre Flughafenfeuerwehr, Ihre Crew oder Ihr Trainingsprogramm.",
      mailLabel: "info@satis.aero",
      mailTitle: "E-Mail an SATIS Aero senden",
      imprintLabel: "Impressum",
      imprintTitle: "Zum Impressum von SATIS Aero",
    },
    footer: {
      tagline:
        "Smart Aviation Training Innovative Solutions. Aviation Consultancy für Flughafenfeuerwehren, Piloten und Flughafenbetreiber.",
      colServices: "Leistungen",
      colCompany: "Unternehmen",
      colContact: "Kontakt",
      links: {
        services: "Leistungen ansehen",
        about: "Über uns",
        contact: "Kontakt",
        imprint: "Impressum",
        privacy: "Datenschutz",
      },
      copy: "© {year} SATIS Aero – Hans-Christoph Peter Grunwald",
      hosting: "Hosted on Vercel · Made in Germany",
    },
    imprint: {
      title: "Impressum",
      eyebrow: "Rechtliches",
      sub: "Angaben gemäß § 5 TMG",
      providerHeading: "Diensteanbieter",
      responsibleHeading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      disclaimerHeading: "Haftungsausschluss",
      disclaimerText:
        "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
      copyrightHeading: "Urheberrecht",
      copyrightText:
        "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    },
    privacy: {
      title: "Datenschutz",
      eyebrow: "Rechtliches",
      sub: "Informationen zum Datenschutz",
      pendingHeading: "Datenschutzerklärung in Vorbereitung",
      pendingText:
        "Die ausführliche Datenschutzerklärung wird in Kürze hier veröffentlicht. Bei dringenden Fragen zum Datenschutz wenden Sie sich bitte direkt an uns.",
      contactLabel: "info@satis.aero",
      contactTitle: "Datenschutzanfrage per E-Mail",
    },
  },
  en: {
    siteName: "SATIS Aero",
    siteTagline: "Smart Aviation Training Innovative Solutions",
    siteDescription:
      "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.",
    nav: {
      services: "Services",
      about: "About",
      contact: "Contact",
      cta: "Enquiry",
      ctaTitle: "Send us a non-binding enquiry",
      home: "Home",
      ariaLabel: "Main navigation",
      logoTitle:
        "SATIS Aero – Smart Aviation Training Innovative Solutions, home",
      langSwitch: "DE",
      langSwitchTitle: "Zur deutschen Version wechseln",
    },
    hero: {
      badge: "Aviation Consultancy",
      titlePrefix: "Smart Aviation Training",
      titleAccent: "Innovative Solutions",
      subtitle:
        "EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality – for airport fire services, pilots and airport operators, all from a single partner.",
      ctaPrimary: "Explore services",
      ctaPrimaryTitle: "View our aviation training and services",
      ctaSecondary: "Contact us",
      ctaSecondaryTitle: "Get in touch with SATIS Aero",
      logoAlt:
        "SATIS Aero logo – Smart Aviation Training Innovative Solutions",
    },
    usp: {
      heading: "Why SATIS Aero?",
      subheading: "Three reasons to choose our aviation consultancy",
      items: [
        {
          title: "EASA & ICAO compliant",
          text: "All training meets current EASA and ICAO requirements. Audit-ready documentation included.",
        },
        {
          title: "Hands-on",
          text: "Live-fire training at the CAT 9 mock-up and coaching for the biennial ICAO emergency exercises.",
        },
        {
          title: "Innovative",
          text: "Virtual Reality, our own Training Management System and modern methodology for sustainable learning.",
        },
      ],
    },
    services: {
      eyebrow: "Our services",
      heading: "Training & coaching for the aviation industry",
      sub: "Eleven specialised services for airport fire services, pilots and airport operators.",
      cardTitleSuffix: "– learn more",
    },
    about: {
      eyebrow: "About SATIS Aero",
      heading: "Aviation expertise at the highest level",
      p1: "SATIS Aero is a specialised aviation consultancy focused on airport fire services, ICAO compliance and pilot communication. We support airports, authorities and airlines in the design, delivery and documentation of safety-critical training.",
      p2: "Our promise: measurable learning outcomes, audit-proof documentation and modern training methodology – from classic basic training to immersive VR simulation.",
      stats: [
        { number: "11", label: "Specialised services" },
        { number: "EASA", label: "& ICAO compliant" },
        { number: "CAT 9", label: "Mock-up training" },
        { number: "VR", label: "Innovative methodology" },
      ],
    },
    contact: {
      heading: "Ready for your next training?",
      sub: "Let's talk about your requirements. We design tailored programmes for your airport fire service, your crew or your training operation.",
      mailLabel: "info@satis.aero",
      mailTitle: "Send an email to SATIS Aero",
      imprintLabel: "Imprint",
      imprintTitle: "View the SATIS Aero imprint",
    },
    footer: {
      tagline:
        "Smart Aviation Training Innovative Solutions. Aviation consultancy for airport fire services, pilots and airport operators.",
      colServices: "Services",
      colCompany: "Company",
      colContact: "Contact",
      links: {
        services: "Browse services",
        about: "About us",
        contact: "Contact",
        imprint: "Imprint",
        privacy: "Privacy",
      },
      copy: "© {year} SATIS Aero – Hans-Christoph Peter Grunwald",
      hosting: "Hosted on Vercel · Made in Germany",
    },
    imprint: {
      title: "Imprint",
      eyebrow: "Legal",
      sub: "Information according to § 5 TMG (German Telemedia Act)",
      providerHeading: "Service provider",
      responsibleHeading:
        "Responsible for the content according to § 18 Abs. 2 MStV",
      disclaimerHeading: "Disclaimer",
      disclaimerText:
        "The content of this website has been compiled with the greatest possible care. However, no guarantee can be given for the accuracy, completeness or timeliness of the content. As a service provider we are responsible for our own content on these pages according to general law (§ 7 paragraph 1 TMG).",
      copyrightHeading: "Copyright",
      copyrightText:
        "Content and works on these pages created by the site operator are subject to German copyright law. Reproduction, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator.",
    },
    privacy: {
      title: "Privacy",
      eyebrow: "Legal",
      sub: "Privacy information",
      pendingHeading: "Privacy notice in preparation",
      pendingText:
        "The detailed privacy notice will be published here shortly. For urgent privacy questions please contact us directly.",
      contactLabel: "info@satis.aero",
      contactTitle: "Privacy request via email",
    },
  },
} as const;
