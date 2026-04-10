import {
  Users,
  ShieldCheck,
  ClipboardCheck,
  Siren,
  Radio,
  Headphones,
  Flame,
  Building2,
  LayoutDashboard,
  Glasses,
  Languages,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Service Catalogue
// =============================================================================
// Single source for all 11 services. Mirrors konzept.md §3.
// Each service holds bilingual content (title, excerpt, description,
// audience list, outcomes list, optional format note) keyed by locale.
// When adding or editing a service, keep this file and konzept.md in sync.
// =============================================================================

type Localized<T> = Record<Locale, T>;

export type ServiceCategory = "coaching" | "compliance" | "practice" | "tools";

export type Service = {
  slug: string;
  category: ServiceCategory;
  /** Full, SEO-relevant title used on detail pages and service cards. */
  title: Localized<string>;
  /** Short title used in the navigation dropdown and mobile menu.
   *  Kept intentionally short (≤ ~30 chars) so the dropdown stays
   *  scannable. Falls back to `title` when rendering detail pages. */
  menuTitle: Localized<string>;
  excerpt: Localized<string>;
  description: Localized<string>;
  audience: Localized<string[]>;
  outcomes: Localized<string[]>;
  format?: Localized<string>;
  icon: LucideIcon;
  compliance?: string[];
};

export const categoryLabels: Record<ServiceCategory, Localized<string>> = {
  coaching: { de: "Coaching & Kommunikation", en: "Coaching & Communication" },
  compliance: { de: "Compliance & Audit", en: "Compliance & Audit" },
  practice: { de: "Praxis & Ausbildung", en: "Practice & Training" },
  tools: { de: "Tools & Innovation", en: "Tools & Innovation" },
};

export const categoryOrder: ServiceCategory[] = [
  "coaching",
  "compliance",
  "practice",
  "tools",
];

export const services: Service[] = [
  {
    slug: "coaching-crm-ccc",
    category: "coaching",
    title: {
      de: "Coaching, CRM & Crisis Communication",
      en: "Coaching, CRM & Crisis Communication",
    },
    menuTitle: {
      de: "Coaching & CRM",
      en: "Coaching & CRM",
    },
    excerpt: {
      de: "Crew Resource Management und Crisis & Communication Coaching für Cockpit- und Bodenpersonal. Verbessert Teamarbeit, Entscheidungsfindung und Kommunikation in Stresssituationen.",
      en: "Crew Resource Management and Crisis & Communication coaching for cockpit and ground crews. Improves teamwork, decision-making and communication under pressure.",
    },
    description: {
      de: "Crew Resource Management (CRM) und Crisis & Communication Coaching (CCC) sind die Grundpfeiler effektiver Teamarbeit unter Stress. Wir trainieren Cockpit- und Bodencrews darin, wie Kommunikation, Entscheidungsfindung und gegenseitige Unterstützung im Notfall funktionieren – nach EASA-Vorgaben und ICAO-Best-Practices. Unsere Coaches bringen jahrelange Praxis aus dem operativen Flugbetrieb mit und kennen die Realität an der Schnittstelle Cockpit/Boden.",
      en: "Crew Resource Management (CRM) and Crisis & Communication Coaching (CCC) are the foundation of effective teamwork under pressure. We train cockpit and ground crews in how communication, decision-making and mutual support work in emergencies — aligned with EASA requirements and ICAO best practice. Our coaches bring years of active flight-operations experience and know the cockpit-to-ground interface from the inside.",
    },
    audience: {
      de: ["Cockpit-Crews", "Bodenpersonal", "CRM-Trainer", "Safety Manager"],
      en: ["Cockpit crews", "Ground staff", "CRM trainers", "Safety managers"],
    },
    outcomes: {
      de: [
        "Verbesserte Crew-Koordination im Normal- und Notfallbetrieb",
        "Klare Phraseologie und Eskalationswege",
        "Reflexion eigener Entscheidungsmuster",
        "Auditfeste Trainingsdokumentation",
      ],
      en: [
        "Improved crew coordination in normal and emergency operations",
        "Clear phraseology and escalation paths",
        "Reflection on personal decision-making patterns",
        "Audit-proof training documentation",
      ],
    },
    format: {
      de: "1- bis 2-tägige Workshops, optional mit Refresher nach 12 Monaten",
      en: "1 to 2 day workshops, optional 12-month refresher",
    },
    icon: Users,
    compliance: ["EASA Part-ORO.FC.115", "ICAO Doc 9683"],
  },
  {
    slug: "just-culture-awareness",
    category: "coaching",
    title: {
      de: "Just Culture Awareness",
      en: "Just Culture Awareness",
    },
    menuTitle: {
      de: "Just Culture",
      en: "Just Culture",
    },
    excerpt: {
      de: "Sensibilisierungs- und Schulungsprogramm zu Just Culture als Grundlage einer offenen Sicherheitskultur. Für Führungskräfte und operatives Personal.",
      en: "Awareness and training programme on Just Culture as the foundation of an open safety culture. For leadership and operational staff.",
    },
    description: {
      de: "Just Culture ist die Grundlage jeder funktionierenden Sicherheitskultur in der Aviation. Wer Fehler bestraft, statt sie zu verstehen, verliert wichtige Reports und damit die Chance, kritische Trends zu erkennen. Unser Programm vermittelt Führungskräften und Operations-Personal, wie sie eine Kultur etablieren, in der Mitarbeitende offen über Fehler sprechen, ohne Angst vor unfairen Konsequenzen.",
      en: "Just Culture is the foundation of every working safety culture in aviation. Punishing mistakes instead of understanding them costs an organisation the reports it depends on to spot critical trends. Our programme teaches leaders and operations staff how to establish a culture in which employees speak openly about errors without fear of unfair consequences.",
    },
    audience: {
      de: [
        "Führungskräfte",
        "Safety Manager",
        "Compliance Officer",
        "Teamleiter im operativen Betrieb",
      ],
      en: [
        "Leaders and management",
        "Safety managers",
        "Compliance officers",
        "Operational team leads",
      ],
    },
    outcomes: {
      de: [
        "Verständnis für die Abgrenzung von menschlichem Versagen, Risikoverhalten und Vorsatz",
        "Tools für faire Reaktionen auf Vorfälle",
        "Höhere Reporting-Quote",
        "Compliance mit EU 376/2014",
      ],
      en: [
        "Understanding the line between human error, risk-taking and recklessness",
        "Tools for fair responses to incidents",
        "Higher reporting rates",
        "Compliance with EU 376/2014",
      ],
    },
    format: {
      de: "1-tägiger Workshop, ergänzbar durch ein Coaching-Programm für die Führungsebene",
      en: "1-day workshop, optionally extended by a coaching programme for the leadership level",
    },
    icon: ShieldCheck,
    compliance: ["EU 376/2014", "ICAO Annex 19"],
  },
  {
    slug: "easa-compliance-training",
    category: "compliance",
    title: {
      de: "EASA Compliance Training für Flughafenfeuerwehren",
      en: "EASA Compliance Training for Airport Fire Services",
    },
    menuTitle: {
      de: "EASA Compliance",
      en: "EASA Compliance",
    },
    excerpt: {
      de: "Strukturierte EASA-Compliance-Schulung für Flughafenfeuerwehren inklusive Dokumentation, Auditvorbereitung und Refresher-Konzepten.",
      en: "Structured EASA compliance training for airport fire services including documentation, audit preparation and refresher concepts.",
    },
    description: {
      de: "Die EASA-Anforderungen an Flughafenfeuerwehren werden regelmäßig verschärft und auditiert. Wir helfen Flughafenbetreibern, ihre Trainingsprogramme so aufzubauen, dass sie nicht nur den Buchstaben der Verordnung erfüllen, sondern auch im Audit bestehen. Von der Curriculum-Entwicklung über die Trainingsdurchführung bis zur Dokumentation – alles aus einer Hand.",
      en: "EASA requirements for airport fire services are tightened and audited on a regular basis. We help airport operators build training programmes that meet not only the letter of the regulation but also pass real audits — from curriculum development through training delivery to documentation, all from a single partner.",
    },
    audience: {
      de: [
        "Flughafenbetreiber",
        "Leiter Flughafenfeuerwehr",
        "Compliance Manager",
        "Ausbildungsverantwortliche",
      ],
      en: [
        "Airport operators",
        "Airport fire service leadership",
        "Compliance managers",
        "Training managers",
      ],
    },
    outcomes: {
      de: [
        "Strukturierter Compliance-Trainingsplan",
        "Audit-feste Dokumentation aller Trainings",
        "Reduktion des Vorbereitungsaufwands für externe Audits",
        "Klarheit über Refresher-Intervalle und Nachweispflichten",
      ],
      en: [
        "Structured compliance training plan",
        "Audit-proof documentation of every training session",
        "Reduced effort for external audit preparation",
        "Clarity on refresher intervals and proof obligations",
      ],
    },
    icon: ClipboardCheck,
    compliance: ["EASA ADR.OPS.B.010", "EU 139/2014"],
  },
  {
    slug: "icao-uebungen-coaching",
    category: "compliance",
    title: {
      de: "ICAO-Übungen – Coaching, Vorbereitung & Durchführung",
      en: "ICAO Exercises – Coaching, Preparation & Delivery",
    },
    menuTitle: {
      de: "ICAO-Übungen",
      en: "ICAO Exercises",
    },
    excerpt: {
      de: "Coaching, Vorbereitung und Durchführungsunterstützung der 2-jährlichen ICAO-Notfallübungen am Flughafen. Von Szenario-Entwicklung bis Debriefing.",
      en: "Coaching, preparation and on-site support for the biennial ICAO emergency exercises at airports. From scenario design to debrief.",
    },
    description: {
      de: "Alle zwei Jahre verpflichtet die ICAO Flughäfen zu einer großangelegten Notfallübung, die Behörden, Feuerwehr, Rettungsdienst, Polizei und Flughafenpersonal einbindet. Wir begleiten Flughafenbetreiber von der Szenario-Entwicklung über die Stakeholder-Abstimmung bis zur Durchführung und dem Debriefing. Unsere Erfahrung aus zahlreichen Übungen sorgt dafür, dass Sie die Auflagen erfüllen und gleichzeitig echten Lerngewinn erzielen.",
      en: "Every two years ICAO requires airports to run a large-scale emergency exercise involving authorities, fire service, EMS, police and airport staff. We support airport operators from scenario design through stakeholder coordination to delivery and debrief. Our experience from numerous exercises ensures you meet the regulatory requirement while extracting real learning value.",
    },
    audience: {
      de: [
        "Flughafenbetreiber",
        "Behörden und Aufsicht",
        "Flughafenfeuerwehr",
        "Rettungsdienste und Polizei",
      ],
      en: [
        "Airport operators",
        "Regulators and authorities",
        "Airport fire services",
        "EMS and police",
      ],
    },
    outcomes: {
      de: [
        "Realistisches, aber sicheres Übungs-Szenario",
        "Strukturiertes Debriefing mit konkreten Maßnahmen",
        "Auditfeste Dokumentation der Übung",
        "Stärkere Vernetzung aller beteiligten Stellen",
      ],
      en: [
        "Realistic but safe exercise scenario",
        "Structured debrief with concrete action items",
        "Audit-proof documentation of the exercise",
        "Stronger network between all involved agencies",
      ],
    },
    format: {
      de: "Vorbereitung über mehrere Monate, Übungstag vor Ort, Debriefing-Workshop",
      en: "Multi-month preparation, on-site exercise day, debrief workshop",
    },
    icon: Siren,
    compliance: ["ICAO Annex 14, Vol. I §9.1", "EASA ADR.OPS.B.005"],
  },
  {
    slug: "communication-training-fire-services",
    category: "coaching",
    title: {
      de: "Communication Training für Flughafenfeuerwehren (121.555)",
      en: "Communication Training for Airport Fire Services (121.555)",
    },
    menuTitle: {
      de: "Funk Feuerwehr (121.555)",
      en: "Radio Fire Service (121.555)",
    },
    excerpt: {
      de: "Funk- und Phraseologie-Training für Flughafenfeuerwehren auf der Notfrequenz 121.555 MHz. Standardphrasen, Englischkompetenz, Crew-Coordination.",
      en: "Radio and phraseology training for airport fire services on the 121.555 MHz emergency frequency. Standard phrases, English proficiency and crew coordination.",
    },
    description: {
      de: "Die internationale Notfrequenz 121.555 MHz ist die direkte Kommunikationslinie zwischen Cockpit und Flughafenfeuerwehr in der kritischsten Phase eines Einsatzes. Klare, standardisierte Phraseologie und solide Englischkenntnisse entscheiden hier über Sekunden. Wir trainieren Feuerwehrcrews praxisnah – mit realistischen Szenarien, Rollenspielen und Echtzeit-Funkverkehr.",
      en: "The international emergency frequency 121.555 MHz is the direct line between cockpit and airport fire service during the most critical phase of an incident. Clear, standardised phraseology and solid English skills can decide seconds. We train fire-service crews in a hands-on way — with realistic scenarios, role plays and real-time radio traffic.",
    },
    audience: {
      de: ["Flughafenfeuerwehrcrews", "Einsatzleiter", "Funkwarte"],
      en: ["Airport fire-service crews", "Incident commanders", "Radio operators"],
    },
    outcomes: {
      de: [
        "Sichere Beherrschung der Standardphraseologie",
        "Englischkompetenz unter Stress",
        "Strukturierte Funkdisziplin",
        "Selbstvertrauen bei der Kommunikation mit dem Cockpit",
      ],
      en: [
        "Confident command of standard phraseology",
        "English proficiency under stress",
        "Structured radio discipline",
        "Confidence in cockpit communication",
      ],
    },
    icon: Radio,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 9432"],
  },
  {
    slug: "communication-training-pilots",
    category: "coaching",
    title: {
      de: "Communication Training für Piloten (121.555)",
      en: "Communication Training for Pilots (121.555)",
    },
    menuTitle: {
      de: "Funk Piloten (121.555)",
      en: "Radio Pilots (121.555)",
    },
    excerpt: {
      de: "Funktraining für Piloten auf der Emergency-Frequenz 121.555 MHz. Realistische Szenarien, Phraseologie, Stress-Communication.",
      en: "Radio communication training for pilots on the 121.555 MHz emergency frequency. Realistic scenarios, phraseology, stress communication.",
    },
    description: {
      de: "Piloten haben jahrelange Erfahrung mit der Standard-Funkkommunikation, aber die Emergency-Frequenz 121.555 MHz wird selten genutzt – und genau dann, wenn jede Sekunde zählt. Unser Training simuliert realistische Notfallszenarien und schult Piloten darin, mit der Flughafenfeuerwehr klar, präzise und unter Zeitdruck zu kommunizieren.",
      en: "Pilots have years of experience with standard radio communication, but the 121.555 MHz emergency frequency is rarely used — and exactly when every second matters. Our training simulates realistic emergency scenarios and teaches pilots to communicate with the airport fire service clearly, precisely and under time pressure.",
    },
    audience: {
      de: ["Linienpiloten", "Business-Aviation-Piloten", "Flugschulen"],
      en: ["Airline pilots", "Business aviation pilots", "Flight schools"],
    },
    outcomes: {
      de: [
        "Sicherer Umgang mit der Notfrequenz",
        "Standardphraseologie für Emergency-Szenarien",
        "Effektives Briefing der Flughafenfeuerwehr",
        "Ruhige, strukturierte Kommunikation unter Stress",
      ],
      en: [
        "Confident handling of the emergency frequency",
        "Standard phraseology for emergency scenarios",
        "Effective briefing of the airport fire service",
        "Calm, structured communication under stress",
      ],
    },
    icon: Headphones,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 4444"],
  },
  {
    slug: "grundausbildung",
    category: "practice",
    title: {
      de: "Flughafenfeuerwehr Grundausbildung",
      en: "Airport Fire Service Basic Training",
    },
    menuTitle: {
      de: "Grundausbildung",
      en: "Basic Training",
    },
    excerpt: {
      de: "Modulare Grundausbildung für neue Mitglieder von Flughafenfeuerwehren. Theorie, Praxis und Examen nach EASA-Vorgaben.",
      en: "Modular basic training for new members of airport fire services. Theory, practice and examination according to EASA requirements.",
    },
    description: {
      de: "Die Grundausbildung legt das Fundament für jede Karriere in der Flughafenfeuerwehr. Unser modulares Programm vermittelt Theorie und Praxis nach EASA-Standards – von Brandphysik und Atemschutz über Fahrzeugkunde bis zu spezifischen Aviation-Themen wie Flugzeugrettung und Treibstoffbrände. Abgeschlossen wird die Ausbildung mit einer dokumentierten Prüfung.",
      en: "Basic training is the foundation of every career in the airport fire service. Our modular programme delivers theory and practice to EASA standards — from fire dynamics and breathing apparatus through vehicle handling to aviation-specific topics such as aircraft rescue and fuel fires. Training concludes with a documented examination.",
    },
    audience: {
      de: ["Neue Mitglieder von Flughafenfeuerwehren", "Quereinsteiger"],
      en: ["New airport fire service members", "Career changers"],
    },
    outcomes: {
      de: [
        "Solides Theorie- und Praxisfundament",
        "Praktische Übung am CAT-9-Mock-Up möglich",
        "Bestandene EASA-konforme Abschlussprüfung",
        "Auditfeste Trainingsdokumentation",
      ],
      en: [
        "Solid theory and practice foundation",
        "Hands-on training at the CAT 9 mock-up available",
        "Passing the EASA-compliant final examination",
        "Audit-proof training documentation",
      ],
    },
    format: {
      de: "Modulares Programm über mehrere Wochen, Theorie + Praxis",
      en: "Modular programme spanning several weeks, theory + practice",
    },
    icon: Building2,
    compliance: ["EASA ADR.OPS.B.010"],
  },
  {
    slug: "cat9-mockup-training",
    category: "practice",
    title: {
      de: "Training am CAT 9 Mock-Up (Brandübungsanlage)",
      en: "CAT 9 Mock-Up Training (Live-Fire Facility)",
    },
    menuTitle: {
      de: "CAT 9 Mock-Up",
      en: "CAT 9 Mock-Up",
    },
    excerpt: {
      de: "Praktisches Live-Fire-Training an einem Mock-Up der Kategorie 9. Realistische Szenarien für Großflugzeug-Brände, Innenangriff und Rescue.",
      en: "Hands-on live-fire training at a Category 9 mock-up. Realistic scenarios for large-aircraft fires, interior attack and rescue.",
    },
    description: {
      de: "Theorie ist wichtig, aber im Ernstfall zählt die Erfahrung. Unsere Trainings am CAT-9-Mock-Up bieten echtes Live-Fire-Training in einer kontrollierten Umgebung. Crews üben Innenangriff, Rescue, Fahrwerksbrände und Großflugzeug-Szenarien an einer Anlage, die der Kategorie 9 entspricht – also den größten Verkehrsmaschinen.",
      en: "Theory matters, but in real incidents experience counts. Our CAT 9 mock-up trainings offer genuine live-fire training in a controlled environment. Crews practise interior attack, rescue, landing-gear fires and large-aircraft scenarios at a facility rated to Category 9 — the largest commercial aircraft.",
    },
    audience: {
      de: [
        "Flughafenfeuerwehrcrews",
        "Einsatzleiter",
        "Werkfeuerwehren mit Aviation-Bezug",
      ],
      en: [
        "Airport fire-service crews",
        "Incident commanders",
        "Industrial fire services with aviation links",
      ],
    },
    outcomes: {
      de: [
        "Praxiserfahrung mit realen Großbränden",
        "Sichere Anwendung von Innenangriff und Rescue-Verfahren",
        "Stress-Inokulation in kontrollierter Umgebung",
        "Dokumentierte Übungseinheiten für die Personalakte",
      ],
      en: [
        "Hands-on experience with realistic large-scale fires",
        "Confident application of interior-attack and rescue procedures",
        "Stress inoculation in a controlled environment",
        "Documented training units for personnel records",
      ],
    },
    format: {
      de: "1- bis 3-tägige Trainings, individuell oder als Crew",
      en: "1 to 3 day trainings, individually or as a crew",
    },
    icon: Flame,
    compliance: ["ICAO Annex 14 Vol. I §9.2"],
  },
  {
    slug: "training-management-system",
    category: "tools",
    title: {
      de: "Training Management System",
      en: "Training Management System",
    },
    menuTitle: {
      de: "Training Management",
      en: "Training Management",
    },
    excerpt: {
      de: "Software-gestütztes Trainingsmanagement zur Planung, Dokumentation und Audit-Nachweisführung aller Schulungen einer Flughafenfeuerwehr.",
      en: "Software-supported training management for planning, documentation and audit evidence of all airport fire service training.",
    },
    description: {
      de: "Wer EASA-konform schulen will, braucht eine lückenlose Dokumentation aller Trainings, Refresher und Qualifikationen. Unser Training Management System (TMS) ist auf die Bedürfnisse von Flughafenfeuerwehren zugeschnitten und ersetzt die Excel-Tabellen, mit denen die meisten Organisationen arbeiten. Planung, Durchführung, Nachweis – alles an einem Ort.",
      en: "Anyone who wants to train EASA-compliant needs complete documentation of every training, refresher and qualification. Our Training Management System (TMS) is purpose-built for airport fire services and replaces the spreadsheets most organisations are still juggling. Planning, delivery, evidence — all in one place.",
    },
    audience: {
      de: [
        "Leiter Flughafenfeuerwehr",
        "Ausbildungsverantwortliche",
        "Compliance Manager",
      ],
      en: [
        "Airport fire service leadership",
        "Training managers",
        "Compliance managers",
      ],
    },
    outcomes: {
      de: [
        "Lückenlose Dokumentation aller Qualifikationen",
        "Automatische Erinnerungen an Refresher",
        "Audit-Reports auf Knopfdruck",
        "Zeitersparnis im Verwaltungsalltag",
      ],
      en: [
        "Complete documentation of every qualification",
        "Automatic refresher reminders",
        "Audit reports at the push of a button",
        "Time saved in everyday administration",
      ],
    },
    icon: LayoutDashboard,
    compliance: ["EASA Part-ADR Record-Keeping"],
  },
  {
    slug: "vr-training",
    category: "tools",
    title: {
      de: "Virtual Reality Trainings",
      en: "Virtual Reality Training",
    },
    menuTitle: {
      de: "VR Training",
      en: "VR Training",
    },
    excerpt: {
      de: "Immersive VR-Szenarien für sicherheitskritische Trainings – Brandbekämpfung, Notfallkommunikation, Entscheidungsfindung. Skalierbar und reproduzierbar.",
      en: "Immersive VR scenarios for safety-critical training – fire fighting, emergency communication, decision-making. Scalable and reproducible.",
    },
    description: {
      de: "VR-Training ergänzt klassische Trainingsformate um eine dritte Dimension: Crews üben in immersiven, exakt reproduzierbaren Szenarien, die in der echten Welt zu teuer oder zu gefährlich wären. Unsere VR-Module decken Brandbekämpfung, Notfallkommunikation und Entscheidungsfindung ab – ortsunabhängig und beliebig oft wiederholbar.",
      en: "VR training adds a third dimension to classic training formats: crews practise in immersive, perfectly reproducible scenarios that would be too expensive or too dangerous in the real world. Our VR modules cover fire fighting, emergency communication and decision-making — location-independent and infinitely repeatable.",
    },
    audience: {
      de: [
        "Flughafenfeuerwehrcrews",
        "Piloten und Crew-Trainer",
        "Ausbildungsverantwortliche",
      ],
      en: [
        "Airport fire-service crews",
        "Pilots and crew trainers",
        "Training managers",
      ],
    },
    outcomes: {
      de: [
        "Skalierbares Training ohne Standortbindung",
        "Reproduzierbare Szenarien für faire Bewertungen",
        "Schnellere Lernkurven durch wiederholbare Übung",
        "Reduktion von Reise- und Anlagenkosten",
      ],
      en: [
        "Scalable training with no location constraint",
        "Reproducible scenarios for fair assessment",
        "Faster learning through repeatable practice",
        "Reduction in travel and facility cost",
      ],
    },
    icon: Glasses,
  },
  {
    slug: "icao-language-proficiency",
    category: "practice",
    title: {
      de: "ICAO Language Proficiency 4/5 inkl. Prüfung",
      en: "ICAO Language Proficiency 4/5 incl. Examination",
    },
    menuTitle: {
      de: "ICAO Language 4/5",
      en: "ICAO Language 4/5",
    },
    excerpt: {
      de: "Vorbereitungskurse für ICAO Language Proficiency Level 4 und 5 mit anschließender Prüfung. Speziell für Piloten, Lotsen und Funkpersonal.",
      en: "Preparation courses for ICAO Language Proficiency Levels 4 and 5 including the final examination. Designed for pilots, controllers and radio operators.",
    },
    description: {
      de: "Ohne ICAO Language Proficiency Level 4 dürfen Piloten und Lotsen international nicht funken – Level 5 ist mehrere Jahre länger gültig und damit der eigentliche Komfort-Standard. Unsere Vorbereitungskurse sind auf Aviation-Englisch zugeschnitten und schließen mit einer offiziellen Prüfung ab. Wir kennen die Prüfungsformate und bereiten gezielt auf alle sechs Bewertungskriterien vor.",
      en: "Without ICAO Language Proficiency Level 4, pilots and controllers are not allowed to communicate internationally — Level 5 is valid several years longer and therefore the genuine comfort standard. Our preparation courses are tailored to aviation English and conclude with an official examination. We know the test formats and prepare candidates specifically for all six rating criteria.",
    },
    audience: {
      de: [
        "Linienpiloten",
        "Business-Aviation-Piloten",
        "Lotsen",
        "Funkpersonal",
      ],
      en: [
        "Airline pilots",
        "Business aviation pilots",
        "Controllers",
        "Radio operators",
      ],
    },
    outcomes: {
      de: [
        "Gezielte Vorbereitung auf alle sechs ICAO-Kriterien",
        "Realistische Prüfungssimulationen",
        "Offizielle Prüfung am Ende des Kurses",
        "Höhere Bestehens- und Level-5-Rate",
      ],
      en: [
        "Targeted preparation for all six ICAO criteria",
        "Realistic exam simulations",
        "Official examination at the end of the course",
        "Higher pass and Level 5 rates",
      ],
    },
    icon: Languages,
    compliance: ["ICAO Annex 1", "ICAO Doc 9835"],
  },
];

// Quick lookup helpers ========================================================

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs: string[] = services.map((service) => service.slug);
