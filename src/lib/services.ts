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

// =============================================================================
// SATIS Aero – Service Catalogue
// =============================================================================
// Single source for all 11 services. Mirrors konzept.md §3. When adding or
// editing a service, keep this file and konzept.md in sync.
// =============================================================================

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  icon: LucideIcon;
  compliance?: string[];
};

export const services: Service[] = [
  {
    slug: "coaching-crm-ccc",
    shortTitle: "Coaching / CRM / CCC",
    title: "Coaching, CRM & Crisis Communication",
    excerpt:
      "Crew Resource Management und Crisis & Communication Coaching für Cockpit- und Bodenpersonal. Verbessert Teamarbeit, Entscheidungsfindung und Kommunikation in Stresssituationen.",
    icon: Users,
    compliance: ["EASA Part-ORO.FC.115", "ICAO Doc 9683"],
  },
  {
    slug: "just-culture-awareness",
    shortTitle: "Just Culture Awareness",
    title: "Just Culture Awareness",
    excerpt:
      "Sensibilisierungs- und Schulungsprogramm zu Just Culture als Grundlage einer offenen Sicherheitskultur. Für Führungskräfte und operatives Personal.",
    icon: ShieldCheck,
    compliance: ["EU 376/2014", "ICAO Annex 19"],
  },
  {
    slug: "easa-compliance-training",
    shortTitle: "EASA Compliance Training",
    title: "EASA Compliance Training für Flughafenfeuerwehren",
    excerpt:
      "Strukturierte EASA-Compliance-Schulung für Flughafenfeuerwehren inklusive Dokumentation, Auditvorbereitung und Refresher-Konzepten.",
    icon: ClipboardCheck,
    compliance: ["EASA ADR.OPS.B.010", "EU 139/2014"],
  },
  {
    slug: "icao-uebungen-coaching",
    shortTitle: "ICAO-Übungen",
    title: "ICAO-Übungen – Coaching, Vorbereitung & Durchführung",
    excerpt:
      "Coaching, Vorbereitung und Durchführungsunterstützung der 2-jährlichen ICAO-Notfallübungen am Flughafen. Von Szenario-Entwicklung bis Debriefing.",
    icon: Siren,
    compliance: ["ICAO Annex 14, Vol. I §9.1", "EASA ADR.OPS.B.005"],
  },
  {
    slug: "communication-training-fire-services",
    shortTitle: "Communication Training Feuerwehr",
    title: "Communication Training für Flughafenfeuerwehren (121.555)",
    excerpt:
      "Funk- und Phraseologie-Training für Flughafenfeuerwehren auf der Notfrequenz 121.555 MHz. Standardphrasen, Englischkompetenz, Crew-Coordination.",
    icon: Radio,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 9432"],
  },
  {
    slug: "communication-training-pilots",
    shortTitle: "Communication Training Piloten",
    title: "Communication Training für Piloten (121.555)",
    excerpt:
      "Funktraining für Piloten auf der Emergency-Frequenz 121.555 MHz. Realistische Szenarien, Phraseologie, Stress-Communication.",
    icon: Headphones,
    compliance: ["ICAO Annex 10 Vol. II", "ICAO Doc 4444"],
  },
  {
    slug: "grundausbildung",
    shortTitle: "Grundausbildung",
    title: "Flughafenfeuerwehr Grundausbildung",
    excerpt:
      "Modulare Grundausbildung für neue Mitglieder von Flughafenfeuerwehren. Theorie, Praxis und Examen nach EASA-Vorgaben.",
    icon: Building2,
    compliance: ["EASA ADR.OPS.B.010"],
  },
  {
    slug: "cat9-mockup-training",
    shortTitle: "CAT 9 Mock-Up",
    title: "Training am CAT 9 Mock-Up (Brandübungsanlage)",
    excerpt:
      "Praktisches Live-Fire-Training an einem Mock-Up der Kategorie 9. Realistische Szenarien für Großflugzeug-Brände, Innenangriff und Rescue.",
    icon: Flame,
    compliance: ["ICAO Annex 14 Vol. I §9.2"],
  },
  {
    slug: "training-management-system",
    shortTitle: "Training Management System",
    title: "Training Management System",
    excerpt:
      "Software-gestütztes Trainingsmanagement zur Planung, Dokumentation und Audit-Nachweisführung aller Schulungen einer Flughafenfeuerwehr.",
    icon: LayoutDashboard,
    compliance: ["EASA Part-ADR Record-Keeping"],
  },
  {
    slug: "vr-training",
    shortTitle: "VR Training",
    title: "Virtual Reality Trainings",
    excerpt:
      "Immersive VR-Szenarien für sicherheitskritische Trainings – Brandbekämpfung, Notfallkommunikation, Entscheidungsfindung. Skalierbar und reproduzierbar.",
    icon: Glasses,
  },
  {
    slug: "icao-language-proficiency",
    shortTitle: "ICAO Language Proficiency",
    title: "ICAO Language Proficiency 4/5 inkl. Prüfung",
    excerpt:
      "Vorbereitungskurse für ICAO Language Proficiency Level 4 und 5 mit anschließender Prüfung. Speziell für Piloten, Lotsen und Funkpersonal.",
    icon: Languages,
    compliance: ["ICAO Annex 1", "ICAO Doc 9835"],
  },
];
