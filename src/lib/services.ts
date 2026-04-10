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
// Each service holds bilingual title and excerpt strings keyed by locale.
// When adding or editing a service, keep this file and konzept.md in sync.
// =============================================================================

type Localized<T> = Record<Locale, T>;

export type Service = {
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  icon: LucideIcon;
  compliance?: string[];
};

export const services: Service[] = [
  {
    slug: "coaching-crm-ccc",
    title: {
      de: "Coaching, CRM & Crisis Communication",
      en: "Coaching, CRM & Crisis Communication",
    },
    excerpt: {
      de: "Crew Resource Management und Crisis & Communication Coaching für Cockpit- und Bodenpersonal. Verbessert Teamarbeit, Entscheidungsfindung und Kommunikation in Stresssituationen.",
      en: "Crew Resource Management and Crisis & Communication coaching for cockpit and ground crews. Improves teamwork, decision-making and communication under pressure.",
    },
    icon: Users,
    compliance: ["EASA Part-ORO.FC.115", "ICAO Doc 9683"],
  },
  {
    slug: "just-culture-awareness",
    title: {
      de: "Just Culture Awareness",
      en: "Just Culture Awareness",
    },
    excerpt: {
      de: "Sensibilisierungs- und Schulungsprogramm zu Just Culture als Grundlage einer offenen Sicherheitskultur. Für Führungskräfte und operatives Personal.",
      en: "Awareness and training programme on Just Culture as the foundation of an open safety culture. For leadership and operational staff.",
    },
    icon: ShieldCheck,
    compliance: ["EU 376/2014", "ICAO Annex 19"],
  },
  {
    slug: "easa-compliance-training",
    title: {
      de: "EASA Compliance Training für Flughafenfeuerwehren",
      en: "EASA Compliance Training for Airport Fire Services",
    },
    excerpt: {
      de: "Strukturierte EASA-Compliance-Schulung für Flughafenfeuerwehren inklusive Dokumentation, Auditvorbereitung und Refresher-Konzepten.",
      en: "Structured EASA compliance training for airport fire services including documentation, audit preparation and refresher concepts.",
    },
    icon: ClipboardCheck,
    compliance: ["EASA ADR.OPS.B.010", "EU 139/2014"],
  },
  {
    slug: "icao-uebungen-coaching",
    title: {
      de: "ICAO-Übungen – Coaching, Vorbereitung & Durchführung",
      en: "ICAO Exercises – Coaching, Preparation & Delivery",
    },
    excerpt: {
      de: "Coaching, Vorbereitung und Durchführungsunterstützung der 2-jährlichen ICAO-Notfallübungen am Flughafen. Von Szenario-Entwicklung bis Debriefing.",
      en: "Coaching, preparation and on-site support for the biennial ICAO emergency exercises at airports. From scenario design to debrief.",
    },
    icon: Siren,
    compliance: ["ICAO Annex 14, Vol. I §9.1", "EASA ADR.OPS.B.005"],
  },
  {
    slug: "communication-training-fire-services",
    title: {
      de: "Communication Training für Flughafenfeuerwehren (121.555)",
      en: "Communication Training for Airport Fire Services (121.555)",
    },
    excerpt: {
      de: "Funk- und Phraseologie-Training für Flughafenfeuerwehren auf der Notfrequenz 121.555 MHz. Standardphrasen, Englischkompetenz, Crew-Coordination.",
      en: "Radio and phraseology training for airport fire services on the 121.555 MHz emergency frequency. Standard phrases, English proficiency and crew coordination.",
    },
    icon: Radio,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 9432"],
  },
  {
    slug: "communication-training-pilots",
    title: {
      de: "Communication Training für Piloten (121.555)",
      en: "Communication Training for Pilots (121.555)",
    },
    excerpt: {
      de: "Funktraining für Piloten auf der Emergency-Frequenz 121.555 MHz. Realistische Szenarien, Phraseologie, Stress-Communication.",
      en: "Radio communication training for pilots on the 121.555 MHz emergency frequency. Realistic scenarios, phraseology, stress communication.",
    },
    icon: Headphones,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 4444"],
  },
  {
    slug: "grundausbildung",
    title: {
      de: "Flughafenfeuerwehr Grundausbildung",
      en: "Airport Fire Service Basic Training",
    },
    excerpt: {
      de: "Modulare Grundausbildung für neue Mitglieder von Flughafenfeuerwehren. Theorie, Praxis und Examen nach EASA-Vorgaben.",
      en: "Modular basic training for new members of airport fire services. Theory, practice and examination according to EASA requirements.",
    },
    icon: Building2,
    compliance: ["EASA ADR.OPS.B.010"],
  },
  {
    slug: "cat9-mockup-training",
    title: {
      de: "Training am CAT 9 Mock-Up (Brandübungsanlage)",
      en: "CAT 9 Mock-Up Training (Live-Fire Facility)",
    },
    excerpt: {
      de: "Praktisches Live-Fire-Training an einem Mock-Up der Kategorie 9. Realistische Szenarien für Großflugzeug-Brände, Innenangriff und Rescue.",
      en: "Hands-on live-fire training at a Category 9 mock-up. Realistic scenarios for large-aircraft fires, interior attack and rescue.",
    },
    icon: Flame,
    compliance: ["ICAO Annex 14 Vol. I §9.2"],
  },
  {
    slug: "training-management-system",
    title: {
      de: "Training Management System",
      en: "Training Management System",
    },
    excerpt: {
      de: "Software-gestütztes Trainingsmanagement zur Planung, Dokumentation und Audit-Nachweisführung aller Schulungen einer Flughafenfeuerwehr.",
      en: "Software-supported training management for planning, documentation and audit evidence of all airport fire service training.",
    },
    icon: LayoutDashboard,
    compliance: ["EASA Part-ADR Record-Keeping"],
  },
  {
    slug: "vr-training",
    title: {
      de: "Virtual Reality Trainings",
      en: "Virtual Reality Training",
    },
    excerpt: {
      de: "Immersive VR-Szenarien für sicherheitskritische Trainings – Brandbekämpfung, Notfallkommunikation, Entscheidungsfindung. Skalierbar und reproduzierbar.",
      en: "Immersive VR scenarios for safety-critical training – fire fighting, emergency communication, decision-making. Scalable and reproducible.",
    },
    icon: Glasses,
  },
  {
    slug: "icao-language-proficiency",
    title: {
      de: "ICAO Language Proficiency 4/5 inkl. Prüfung",
      en: "ICAO Language Proficiency 4/5 incl. Examination",
    },
    excerpt: {
      de: "Vorbereitungskurse für ICAO Language Proficiency Level 4 und 5 mit anschließender Prüfung. Speziell für Piloten, Lotsen und Funkpersonal.",
      en: "Preparation courses for ICAO Language Proficiency Levels 4 and 5 including the final examination. Designed for pilots, controllers and radio operators.",
    },
    icon: Languages,
    compliance: ["ICAO Annex 1", "ICAO Doc 9835"],
  },
];
