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
// German privacy at /datenschutz/, the German services index at
// /leistungen/. The English equivalents live under /en/. All routes
// end with a trailing slash so they match the `trailingSlash: true`
// setting in next.config.ts and avoid 308 redirects on internal
// navigation.
export const routes = {
  de: {
    home: "/",
    imprint: "/impressum/",
    privacy: "/datenschutz/",
    contact: "/kontakt/",
    services: "/#leistungen", // anchor on the homepage
    servicesBase: "/leistungen", // base for service detail pages
    about: "/#ueber-uns",
  },
  en: {
    home: "/en/",
    imprint: "/en/imprint/",
    privacy: "/en/privacy/",
    contact: "/en/contact/",
    services: "/en/#services",
    servicesBase: "/en/services",
    about: "/en/#about",
  },
} as const;

// Build the URL of a service detail page in a given locale.
export function serviceUrl(locale: Locale, slug: string): string {
  return `${routes[locale].servicesBase}/${slug}/`;
}

// Cross-locale page alternates. Each entry maps a logical page to its
// concrete URL in every locale, so the language switcher can take you
// from /impressum/ directly to /en/imprint/ instead of dropping you on
// the home page. Add a new entry whenever a new translatable page is
// introduced.
export const pageAlternates = {
  home: { de: "/", en: "/en/" },
  imprint: { de: "/impressum/", en: "/en/imprint/" },
  privacy: { de: "/datenschutz/", en: "/en/privacy/" },
  contact: { de: "/kontakt/", en: "/en/contact/" },
} as const;

export type PageKey = keyof typeof pageAlternates;
export type PageAlternates = { de: string; en: string };

// Build cross-locale alternates for a service detail page (slug is shared
// across locales because they encode the same concept).
export function serviceAlternates(slug: string): PageAlternates {
  return {
    de: serviceUrl("de", slug),
    en: serviceUrl("en", slug),
  };
}

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
      servicesTitle: "Alle Leistungen anzeigen",
      servicesDropdownLabel: "Leistungen-Untermenü",
      servicesAll: "Alle Leistungen ansehen",
      about: "Über uns",
      aboutTitle: "Mehr über SATIS Aero erfahren",
      contact: "Kontakt",
      contactTitle: "Zum Kontaktformular",
      cta: "Anfrage",
      ctaTitle: "Jetzt unverbindliche Anfrage stellen",
      home: "Startseite",
      ariaLabel: "Hauptnavigation",
      mobileMenuLabel: "Menü öffnen",
      mobileMenuClose: "Menü schließen",
      logoTitle: "SATIS Aero – Smart Aviation Training Innovative Solutions, Startseite",
      langSwitch: "EN",
      langSwitchTitle: "Switch to English version",
    },
    breadcrumbs: {
      ariaLabel: "Brotkrumen-Navigation",
      home: "Startseite",
      homeTitle: "Zur Startseite",
      services: "Leistungen",
      servicesTitle: "Zur Leistungsübersicht",
      separator: "/",
    },
    serviceDetail: {
      eyebrow: "Leistung",
      backLabel: "Alle Leistungen ansehen",
      backTitle: "Zurück zur Leistungsübersicht",
      descriptionHeading: "Über diese Leistung",
      audienceHeading: "Für wen ist dieses Training?",
      outcomesHeading: "Lernergebnisse",
      formatHeading: "Format",
      complianceHeading: "Compliance & Regelwerke",
      ctaHeading: "Interesse an diesem Training?",
      ctaText: "Wir erstellen ein maßgeschneidertes Konzept für Ihr Team. Sprechen Sie uns an.",
      ctaButton: "Anfrage stellen",
      ctaButtonTitle: "Jetzt unverbindliche Anfrage stellen",
    },
    contactPage: {
      eyebrow: "Kontakt",
      title: "Sprechen Sie mit uns",
      sub: "Wir freuen uns auf Ihre Anfrage. Schreiben Sie uns ein paar Zeilen zu Ihrem Vorhaben – wir melden uns innerhalb von zwei Werktagen mit einem ersten Vorschlag.",
      addressHeading: "Anschrift",
      addressName: "Hans-Christoph Peter Grunwald",
      addressStreet: "Im Kranzfeld 39",
      addressCity: "52538 Gangelt",
      addressCountry: "Deutschland",
      mailHeading: "E-Mail",
      mailValue: "info@satis.aero",
      mailTitle: "E-Mail an SATIS Aero senden",
      formHeading: "Kontaktformular",
      formNameLabel: "Name",
      formNamePlaceholder: "Ihr Name",
      formEmailLabel: "E-Mail",
      formEmailPlaceholder: "ihre@email.de",
      formCompanyLabel: "Organisation (optional)",
      formCompanyPlaceholder: "Flughafen, Airline, Behörde …",
      formSubjectLabel: "Betreff",
      formSubjectPlaceholder: "Worum geht es?",
      formMessageLabel: "Nachricht",
      formMessagePlaceholder: "Beschreiben Sie kurz Ihr Vorhaben.",
      formSubmit: "Anfrage senden",
      formSubmitTitle: "Anfrage absenden",
      formSubmitting: "Wird gesendet …",
      formSuccess: "Vielen Dank! Wir haben Ihre Nachricht erhalten und melden uns in Kürze.",
      formError:
        "Beim Senden ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@satis.aero.",
      formTurnstileError:
        "Spam-Schutz konnte nicht verifiziert werden. Bitte laden Sie die Seite neu.",
      formRateLimitError:
        "Sie haben in kurzer Zeit zu viele Anfragen gesendet. Bitte warten Sie ein paar Minuten und versuchen Sie es erneut.",
      formPrivacyHint: "Mit dem Absenden akzeptieren Sie unsere Datenschutzbestimmungen.",
      formPrivacyLinkLabel: "Datenschutzbestimmungen",
      formPrivacyLinkTitle: "Datenschutzbestimmungen ansehen",
      turnstileLabel: "Spam-Schutz",
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
      logoAlt: "SATIS Aero Logo – Smart Aviation Training Innovative Solutions",
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
      sub: "Informationen zur Verarbeitung personenbezogener Daten",
      contactLabel: "info@satis.aero",
      contactTitle: "Datenschutzanfrage per E-Mail",
    },
    notFound: {
      eyebrow: "Fehler 404",
      title: "Seite nicht gefunden",
      message:
        "Die angeforderte Seite existiert nicht oder wurde verschoben. Bitte prüfen Sie die URL oder kehren Sie zur Startseite zurück.",
      backHome: "Zur Startseite",
      backHomeTitle: "Zurück zur Startseite",
      browseServices: "Leistungen ansehen",
      browseServicesTitle: "Zur Übersicht aller Leistungen",
    },
  },
  en: {
    siteName: "SATIS Aero",
    siteTagline: "Smart Aviation Training Innovative Solutions",
    siteDescription:
      "Aviation consultancy for airport fire services, pilots and airport operators. EASA-compliant training, ICAO exercise coaching, CAT 9 mock-up and Virtual Reality training.",
    nav: {
      services: "Services",
      servicesTitle: "View all services",
      servicesDropdownLabel: "Services submenu",
      servicesAll: "View all services",
      about: "About",
      aboutTitle: "Learn more about SATIS Aero",
      contact: "Contact",
      contactTitle: "Open the contact form",
      cta: "Enquiry",
      ctaTitle: "Send us a non-binding enquiry",
      home: "Home",
      ariaLabel: "Main navigation",
      mobileMenuLabel: "Open menu",
      mobileMenuClose: "Close menu",
      logoTitle: "SATIS Aero – Smart Aviation Training Innovative Solutions, home",
      langSwitch: "DE",
      langSwitchTitle: "Zur deutschen Version wechseln",
    },
    breadcrumbs: {
      ariaLabel: "Breadcrumb navigation",
      home: "Home",
      homeTitle: "Back to the home page",
      services: "Services",
      servicesTitle: "Back to the services overview",
      separator: "/",
    },
    serviceDetail: {
      eyebrow: "Service",
      backLabel: "View all services",
      backTitle: "Back to the services overview",
      descriptionHeading: "About this service",
      audienceHeading: "Who is this training for?",
      outcomesHeading: "Learning outcomes",
      formatHeading: "Format",
      complianceHeading: "Compliance & frameworks",
      ctaHeading: "Interested in this training?",
      ctaText: "We design tailored programmes for your team. Get in touch with us.",
      ctaButton: "Send enquiry",
      ctaButtonTitle: "Send a non-binding enquiry",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Talk to us",
      sub: "We look forward to hearing from you. Send us a few lines about your project — we will get back to you within two working days with an initial proposal.",
      addressHeading: "Address",
      addressName: "Hans-Christoph Peter Grunwald",
      addressStreet: "Im Kranzfeld 39",
      addressCity: "52538 Gangelt",
      addressCountry: "Germany",
      mailHeading: "Email",
      mailValue: "info@satis.aero",
      mailTitle: "Send an email to SATIS Aero",
      formHeading: "Contact form",
      formNameLabel: "Name",
      formNamePlaceholder: "Your name",
      formEmailLabel: "Email",
      formEmailPlaceholder: "you@email.com",
      formCompanyLabel: "Organisation (optional)",
      formCompanyPlaceholder: "Airport, airline, authority …",
      formSubjectLabel: "Subject",
      formSubjectPlaceholder: "What is it about?",
      formMessageLabel: "Message",
      formMessagePlaceholder: "Briefly describe your project.",
      formSubmit: "Send enquiry",
      formSubmitTitle: "Send the enquiry",
      formSubmitting: "Sending …",
      formSuccess: "Thank you! We have received your message and will be in touch shortly.",
      formError:
        "Something went wrong while sending. Please try again or email us directly at info@satis.aero.",
      formTurnstileError: "Spam protection could not be verified. Please reload the page.",
      formRateLimitError:
        "You have sent too many requests in a short period. Please wait a few minutes and try again.",
      formPrivacyHint: "By sending this form you accept our privacy policy.",
      formPrivacyLinkLabel: "privacy policy",
      formPrivacyLinkTitle: "Read the privacy policy",
      turnstileLabel: "Spam protection",
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
      logoAlt: "SATIS Aero logo – Smart Aviation Training Innovative Solutions",
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
    },
    imprint: {
      title: "Imprint",
      eyebrow: "Legal",
      sub: "Information according to § 5 TMG (German Telemedia Act)",
      providerHeading: "Service provider",
      responsibleHeading: "Responsible for the content according to § 18 Abs. 2 MStV",
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
      sub: "Information on the processing of personal data",
      contactLabel: "info@satis.aero",
      contactTitle: "Privacy request via email",
    },
    notFound: {
      eyebrow: "Error 404",
      title: "Page not found",
      message:
        "The requested page does not exist or has been moved. Please check the URL or return to the home page.",
      backHome: "Back to home",
      backHomeTitle: "Return to the home page",
      browseServices: "View services",
      browseServicesTitle: "Browse all services",
    },
  },
} as const;
