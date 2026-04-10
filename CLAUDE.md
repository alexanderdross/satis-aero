@AGENTS.md

# SATIS Aero – Projekt-Leitplanken

**SATIS** = **S**mart **A**viation **T**raining **I**nnovative **S**olutions
Aviation Consultancy mit Fokus auf Flughafenfeuerwehren, ICAO-Compliance und
Pilot-Communication. Diese Datei enthält die technischen Konventionen für
Claude. Inhaltliche und gestalterische Entscheidungen stehen in
[`konzept.md`](./konzept.md) – diese Datei ist die Single Source of Truth für
das Fachkonzept.

## Stack

- Next.js **16.2.3** (App Router, Turbopack)
- React 19 / TypeScript 5
- Tailwind CSS **v4** (`@tailwindcss/postcss`) – Konfiguration via
  `@theme inline` in `src/app/globals.css`, **keine** `tailwind.config.ts`
- ESLint 9 + Prettier + `prettier-plugin-tailwindcss`
- `lucide-react`, `clsx`, `tailwind-merge` (cn-Helper in `src/lib/utils.ts`)
- Hosting: Vercel (siehe `vercel.json`)

## Architektur

### Server-Only / Edge-First

> **Hard rule:** Die gesamte Site rendert serverseitig. Es gibt **keine**
> Client Components im Layout-Shell. Vor dem Hinzufügen von `"use client"`
> immer prüfen, ob das Feature mit nativen HTML-Elementen oder einem
> Server Component möglich ist.

- Alle Routen sind `○ (Static)` – statisch prerendered, ausgeliefert vom
  Vercel Edge-Cache. `npm run build` muss diesen Status nach jedem Change
  beibehalten.
- Sprachumschalter: `<details>`/`<summary>`-basiert (Server Component,
  ohne JS).
- Header / Footer / LanguageSwitcher / HomeContent / ImprintContent /
  PrivacyContent sind Server Components und akzeptieren `locale` als Prop.
- `usePathname()`, `useState`, `useEffect` etc. sind im Layout-Shell
  verboten. Wenn Interaktivität nötig wird (z. B. Kontaktformular),
  bekommt das Feature seine eigene kleine Client-Insel und wird **nicht**
  im Layout gemountet.

### Multi-Root-Layout via Route Groups

```
src/app/
├── (de)/
│   ├── layout.tsx              # <html lang="de">, Header(de), Footer(de)
│   ├── page.tsx                # /
│   ├── impressum/page.tsx      # /impressum/
│   └── datenschutz/page.tsx    # /datenschutz/
├── (en)/
│   ├── layout.tsx              # <html lang="en">, Header(en), Footer(en)
│   └── en/
│       ├── page.tsx            # /en/
│       ├── imprint/page.tsx    # /en/imprint/
│       └── privacy/page.tsx    # /en/privacy/
├── globals.css                 # geteilt zwischen beiden Layouts
├── sitemap.ts                  # multilingual mit hreflang
└── robots.ts
```

- Es existiert **kein** zentrales `src/app/layout.tsx` mehr – Next.js 16
  erlaubt mehrere Root-Layouts via Route Groups.
- Beide Layouts importieren `../globals.css`.
- Sprachwechsel führt zu einem Full-Page-Reload (gewollt – andere
  Sprache, anderer Root-Layout-Tree).

### Trailing Slash

- `next.config.ts`: `trailingSlash: true`
- Alle Routen, alle internen Links und alle `alternates.canonical`-Werte
  haben einen Trailing Slash. Variante ohne Slash → 308 Redirect.

## Next.js 16 Reminder

> Diese Version hat Breaking Changes ggü. älteren Next.js-Versionen.
> Vor jedem nicht-trivialen Change die lokalen Docs unter
> `node_modules/next/dist/docs/` lesen.

- `params` und `searchParams` sind **`Promise<T>`** (BREAKING) –
  siehe `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `next/image`: `priority` ist **deprecated** → `preload={true|false}`
  bevorzugen, siehe
  `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`
- Statische Metadaten via `export const metadata` / dynamisch via
  `generateMetadata` – siehe
  `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- Multi-Root-Layouts: `src/app/(de)/layout.tsx` und
  `src/app/(en)/layout.tsx` haben jeweils `<html>` und `<body>` und
  importieren `globals.css`.

## Design-Tokens (siehe `konzept.md` §5.2 für die volle Palette)

| Token             | Hex       | Nutzung                                 |
| ----------------- | --------- | --------------------------------------- |
| `primary`         | `#255685` | Logo, CTAs, Headlines                   |
| `primary-dark`    | `#173a5c` | Hover, Footer                           |
| `primary-light`   | `#3d7bb3` | Links, Akzente                          |
| `sky`             | `#e8f1f9` | Section-BG                              |
| `cloud`           | `#f7f9fc` | Page-BG                                 |
| `runway`          | `#0f172a` | Body-Text                               |
| `runway-soft`     | `#334155` | Sekundär-Text (≥ 7:1 auf cloud, AAA)    |
| `runway-mute`     | `#475569` | Tertiär-Text (≥ 6.5:1 auf cloud, AAA)   |
| `on-primary-soft` | `#e6edf5` | Sekundär-Text auf primary-dark (≥ 12:1) |
| `on-primary-mute` | `#c7d4e3` | Tertiär-Text auf primary-dark (≥ 7.5:1) |
| `signal`          | `#c1272d` | Emergency / Feuerwehr-Bezug             |
| `success`         | `#1f8a7a` | Bestätigungen                           |

Tokens werden in `src/app/globals.css` über `@theme inline` als CSS-Variablen
definiert und sind dann als Tailwind-Klassen verfügbar (z. B. `bg-primary`).
Statt opacity-basierter Abdunkelung (`text-runway/70`) **immer** die soliden
Tokens (`text-runway-soft`, `text-runway-mute`) verwenden – Lighthouse / axe
berechnen Opacity-Kontraste oft falsch.

## Font-Regeln

- **Self-hosted only.** Niemals `next/font/google` oder externe Font-CDNs.
- Font: **Liberation Sans** (OFL-Lizenz, metrisch kompatibel zu Arial)
- Files in `public/fonts/LiberationSans-{Regular,Bold,Italic,BoldItalic}.woff2`
- Setup über `next/font/local` in **beiden** Root-Layouts mit:
  - `display: "swap"`
  - `preload: true`
  - `adjustFontFallback: "Arial"`
- Fallback-Stack: `Arial, Helvetica, sans-serif` (aktuell aktiv, weil die
  woff2-Files noch fehlen)

## Image-Regeln

- **Immer `next/image`** – nie native `<img>`.
- Statische `width` und `height` setzen (außer bei `fill`) → CLS-Optimierung.
- Bei `fill` und responsiven Bildern **immer** `sizes` setzen,
  z. B. `sizes="(max-width: 768px) 100vw, 50vw"`.
- Lazy Loading ist Default. Above-the-fold Bilder erhalten `priority`
  (Hinweis: in Next.js 16 ist `priority` deprecated zugunsten von
  `preload={true}`, beide funktionieren noch).
- Formate: AVIF/WebP automatisch über Image Optimization. In `next.config.ts`:
  `images.formats: ["image/avif", "image/webp"]`, `minimumCacheTTL: 30 Tage`.
- **Static Imports** wo möglich – sie liefern `width`, `height` und
  `blurDataURL` automatisch.
- Hero-Bilder: `placeholder="blur"`.
- `alt` und `title` sind Pflicht und müssen beschreibend sein.
- Quellbilder vor Commit komprimieren (Ziel: < 200 KB pro Hero).
- Verzeichnis: `public/images/{brand,hero,services,team,references}/`.

## Static Asset Cache (vercel.json)

| Pfad                    | Cache-Control                                    |
| ----------------------- | ------------------------------------------------ |
| `/icons/*`              | `public, max-age=31536000, immutable` (1 Jahr)   |
| `/images/*`             | `public, max-age=31536000, immutable` (1 Jahr)   |
| `/fonts/*`              | `public, max-age=31536000, immutable` (1 Jahr)   |
| `/favicon.ico`          | `public, max-age=86400, must-revalidate` (1 Tag) |
| `/manifest.webmanifest` | `public, max-age=86400, must-revalidate` (1 Tag) |
| `/browserconfig.xml`    | `public, max-age=86400, must-revalidate` (1 Tag) |

Zusätzlich global gesetzt für `/(.*)`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' challenges.cloudflare.com; frame-src challenges.cloudflare.com; …`
  (Turnstile-Whitelist; sonst restriktiv)

## SEO, GEO & strukturierte Daten

### Zentrale Helpers

- **`src/lib/seo.ts`** – `buildMetadata()` baut einheitliche `Metadata`-
  Objekte inkl. Title-Template, Description, Keywords, hreflang-
  Alternates, OpenGraph (mit alternate Locale), Twitter Cards und
  Robots-Flags. **Jede Page** ruft das auf.
- **`src/lib/seo-copy.ts`** – Per-Page-SEO-Wörterbuch (Title,
  Description, Keywords) pro Locale. Einzige Quelle für
  Home/Contact/Imprint/Privacy.
- **`src/components/json-ld.tsx`** – alle JSON-LD-Helpers:
  - `OrganizationJsonLd` – `Organization` + `ProfessionalService`,
    inkl. `knowsAbout`, `hasOfferCatalog` (referenziert alle Services),
    `contactPoint`, `areaServed`. Gerendert in beiden Root-Layouts.
  - `WebSiteJsonLd` – `WebSite` mit Publisher-Referenz. Auf den
    Home-Pages.
  - `WebPageJsonLd` – `WebPage` / `ContactPage` / `AboutPage`
    per Route. Auf **jeder** Page.
  - `BreadcrumbListJsonLd` – auf jeder Nicht-Home-Page (gerendert via
    `Breadcrumbs`-Component).
  - `ServiceJsonLd` – auf jeder Service-Detailseite, inkl.
    `hasCredential` für Compliance-Referenzen und
    `provider`-Referenz zum Organization-`@id`.
  - `ServiceItemListJsonLd` – auf den Home-Pages mit allen 11 Services.

### Twitter Cards

- Alle Pages setzen `twitter.card: "summary_large_image"` mit
  `site`/`creator: "@satis_aero"`. Automatisch von `buildMetadata()`.

### Open Graph

- Statische Default-OG-Image über `src/app/opengraph-image.tsx`
  (Next.js File-Convention). Wird via `next/og` `ImageResponse`
  generiert, 1200×630, brand-coloured.
- `buildMetadata()` setzt `openGraph.locale` + `alternateLocale`
  (z. B. `de_DE` + `en_US`) automatisch pro Locale.
- **Wichtig:** In ImageResponse keine Emoji verwenden – `@vercel/og`
  versucht sonst, Twemoji-SVGs von cdn.jsdelivr.net zu laden, was im
  Build fehlschlagen kann. Außerdem muss jeder `<div>` mit mehr als
  einem Kind explizit `display: flex` setzen (satori-Constraint).

### Generative Engine Optimization (GEO)

- **`src/app/llms.txt/route.ts`** – statischer Markdown-Dump, erreichbar
  unter `/llms.txt`. Enthält Firmenprofil, alle 11 Services mit
  Canonical-URLs, Kontaktdaten und kurze Editorial-Guidance für
  LLM-Assistants. Spec: https://llmstxt.org/
- **`src/app/robots.ts`** – erlaubt explizit alle bekannten AI-Crawler:
  `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `anthropic-ai`,
  `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`,
  `Amazonbot`, `Applebot-Extended`, `YouBot` u. a. Das ist der
  positive Opt-in für GEO.
- `OrganizationJsonLd.knowsAbout` listet explizit unsere Fachgebiete
  (Flughafenfeuerwehr, EASA, ICAO Annex 14, CAT 9, …) – hilft
  generativen Engines bei "Was macht SATIS Aero?"-Queries.

## Open Graph

- Statische Default-OG-Image über `src/app/opengraph-image.tsx`
  (Next.js File-Convention). Wird via `next/og` `ImageResponse`
  generiert, 1200×630, brand-coloured.
- **Wichtig:** In ImageResponse keine Emoji verwenden – `@vercel/og`
  versucht sonst, Twemoji-SVGs von cdn.jsdelivr.net zu laden, was im
  Build fehlschlagen kann. Außerdem muss jeder `<div>` mit mehr als
  einem Kind explizit `display: flex` setzen (satori-Constraint).

## Custom 404

- `src/app/(de)/not-found.tsx` und `src/app/(en)/not-found.tsx`
- Gemeinsame `NotFoundContent` Komponente, locale-aware
- `robots: { index: false, follow: false }`

## i18n

- Zweisprachig **DE / EN**, DE als Default am Root, EN unter `/en/`.
- **Keine** `[locale]`-Route-Group, sondern Multi-Root-Layouts (siehe
  Architektur-Section oben).
- Alle UI-Strings, Routen und In-Page-Anker liegen zentral in
  `src/lib/i18n.ts`.
- DE-Anker: `#leistungen`, `#ueber-uns`, `#kontakt`.
  EN-Anker: `#services`, `#about`, `#contact`.
- Header / Footer bekommen die Locale per Prop (kein `usePathname`).
- Sprachumschalter: server-side `<details>`-Dropdown mit SVG-Flaggen
  (Deutschland / Union Jack), Inline-SVG, ohne Asset-Request.

## SEO

- Jede Page setzt `alternates.canonical` (mit Trailing Slash) und
  `alternates.languages: { de: …, en: … }`.
- Multilingual Sitemap: `src/app/sitemap.ts` – generiert je 1
  `<url>`-Eintrag pro Locale mit `xhtml:link rel="alternate"`
  `hreflang="de"`, `hreflang="en"` und `hreflang="x-default"` (DE).
- `src/app/robots.ts`: `User-agent: *`, allow `/`, Sitemap-Pointer.
- Jeder `<Link>` und jedes `<a>` hat ein descriptives `title`-Attribut
  aus `src/lib/i18n.ts`.

## Kontaktformular & Spam-Schutz

- Spam-Schutz: **Cloudflare Turnstile** + **Honeypot** + **zod**-Validierung
  (volle Spec in `konzept.md` §9.1).
- **Turnstile-Script** wird **nur** auf `/kontakt/` und `/en/contact/`
  geladen, **niemals** im Root-Layout.
- Loading: `next/script` mit `strategy="lazyOnload"` + `render=explicit`.
- Widget-Render erst beim ersten `onFocusCapture` auf dem Form
  (Lazy Mount). 65 px Min-Height-Container reserviert (CLS).
- **Server-seitige Verifikation gegen `siteverify` ist Pflicht** – der
  Client-Token darf nie alleine vertraut werden.
- **Honeypot-Feld** `name="website"`, off-screen, `tabIndex={-1}`,
  `autoComplete="off"`. Server Action wirft den Submit, wenn das Feld
  gefüllt ist.
- **zod-Schema** in `src/app/actions/submit-contact.ts` validiert alle
  Felder serverseitig (Required, Length-Caps, Email-Format).
- **Mail-Versand** über **Resend** (`src/app/actions/submit-contact.ts`).
  Fällt graceful auf Server-Logging zurück, wenn `RESEND_API_KEY` fehlt
  (Dev/Preview), schlägt aber in Production fehl, wenn die Mail nicht
  rausgeht.
- Env-Vars (siehe `.env.example`):
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client)
  - `TURNSTILE_SECRET_KEY` (server-only)
  - `RESEND_API_KEY` (server-only, Production-Pflicht)
  - `CONTACT_TO_EMAIL` (Empfänger, Default `info@satis.aero`)
  - `CONTACT_FROM_EMAIL` (Absender, Default `noreply@satis.aero`,
    muss in der Resend-Domain verifiziert sein)

## Coding-Konventionen

- TypeScript strict, keine `any`.
- **Server Components als Default.** `"use client"` ist verboten im
  Layout-Shell und benötigt Begründung.
- Klassen-Komposition über `cn()` aus `src/lib/utils.ts`.
- Dateinamen: kebab-case für Routes, PascalCase für Components.
- Keine neuen Files ohne Bezug zum Konzept – Single Source of Truth ist
  `konzept.md`.
- Nach jedem Change: `npm run build` muss grün bleiben **und** die
  Build-Tabelle muss alle Routes als `○ (Static)` ausweisen.
