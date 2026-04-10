import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Mail,
} from "lucide-react";
import { services } from "@/lib/services";
import logo from "../../public/images/brand/satis-logo.png";

export default function Home() {
  return (
    <>
      {/* ===================================================================
       *  HERO
       * =================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky to-cloud">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_top_right,rgba(37,86,133,0.15),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Plane className="h-3.5 w-3.5" aria-hidden="true" />
                Aviation Consultancy
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-runway sm:text-5xl lg:text-6xl">
                Smart Aviation Training{" "}
                <span className="text-primary">Innovative Solutions</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-runway/80">
                EASA-konforme Trainings, ICAO-Übungs-Coaching, CAT 9 Mock-Up
                und Virtual Reality für Flughafenfeuerwehren, Piloten und
                Flughafenbetreiber – aus einer Hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
                >
                  Leistungen ansehen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-sky"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="rounded-2xl border border-primary/10 bg-white/80 p-10 shadow-xl shadow-primary/5 backdrop-blur">
                <Image
                  src={logo}
                  alt="SATIS Aero Logo – Smart Aviation Training Innovative Solutions"
                  title="SATIS Aero"
                  height={108}
                  width={321}
                  placeholder="blur"
                  priority
                  className="h-24 w-auto sm:h-28"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
       *  USP / VALUE PROPS
       * =================================================================== */}
      <section className="border-y border-sky bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <UspBlock
              icon={ShieldCheck}
              title="EASA & ICAO konform"
              text="Alle Trainings entsprechen den geltenden EASA- und ICAO-Vorgaben. Audit-ready Dokumentation inklusive."
            />
            <UspBlock
              icon={Award}
              title="Praxiserprobt"
              text="Live-Fire-Training am CAT 9 Mock-Up und Coaching bei den 2-jährlichen ICAO-Notfallübungen."
            />
            <UspBlock
              icon={Sparkles}
              title="Innovativ"
              text="Virtual Reality, eigenes Training Management System und moderne Methodik für nachhaltigen Lernerfolg."
            />
          </div>
        </div>
      </section>

      {/* ===================================================================
       *  SERVICES
       * =================================================================== */}
      <section id="services" className="bg-cloud py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Unsere Leistungen
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-runway sm:text-4xl">
              Trainings & Coaching für die Aviation-Industrie
            </h2>
            <p className="mt-4 text-base text-runway/70">
              Elf spezialisierte Services für Flughafenfeuerwehren, Piloten und
              Flughafenbetreiber.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li
                  key={service.slug}
                  className="group flex flex-col rounded-xl border border-sky bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-runway">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-runway/70">
                    {service.excerpt}
                  </p>
                  {service.compliance && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.compliance.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-md bg-sky px-2 py-0.5 text-xs font-medium text-primary-dark"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===================================================================
       *  ABOUT
       * =================================================================== */}
      <section id="about" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Über SATIS Aero
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-runway sm:text-4xl">
              Aviation-Expertise auf höchstem Niveau
            </h2>
            <p className="mt-6 text-base leading-relaxed text-runway/80">
              SATIS Aero ist eine spezialisierte Aviation Consultancy mit
              Fokus auf Flughafenfeuerwehren, ICAO-Compliance und Pilot-
              Communication. Wir unterstützen Flughäfen, Behörden und Airlines
              bei Konzeption, Durchführung und Dokumentation
              sicherheitskritischer Trainings.
            </p>
            <p className="mt-4 text-base leading-relaxed text-runway/80">
              Unser Anspruch: messbarer Lernerfolg, audit-feste Dokumentation
              und moderne Trainingsmethodik – von der klassischen
              Grundausbildung bis zur immersiven VR-Simulation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Stat number="11" label="Spezialisierte Services" />
            <Stat number="EASA" label="& ICAO konform" />
            <Stat number="CAT 9" label="Mock-Up Training" />
            <Stat number="VR" label="Innovative Methodik" />
          </div>
        </div>
      </section>

      {/* ===================================================================
       *  CTA / CONTACT
       * =================================================================== */}
      <section id="contact" className="bg-primary py-20 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bereit für das nächste Training?
          </h2>
          <p className="mt-4 text-lg text-white/85">
            Sprechen wir über Ihre Anforderungen. Wir erstellen ein
            maßgeschneidertes Konzept für Ihre Flughafenfeuerwehr, Ihre Crew
            oder Ihr Trainingsprogramm.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@satis-aero.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-sky"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              info@satis-aero.com
            </a>
            <Link
              href="/legal/imprint"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Impressum
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function UspBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-runway">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-runway/70">{text}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-sky bg-cloud p-6">
      <div className="text-3xl font-bold text-primary">{number}</div>
      <div className="mt-1 text-sm text-runway/70">{label}</div>
    </div>
  );
}
