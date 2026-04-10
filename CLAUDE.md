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
| Token | Hex | Nutzung |
|---|---|---|
| `primary` | `#255685` | Logo, CTAs, Headlines |
| `primary-dark` | `#173a5c` | Hover, Footer |
| `primary-light` | `#3d7bb3` | Links, Akzente |
| `sky` | `#e8f1f9` | Section-BG |
| `cloud` | `#f7f9fc` | Page-BG |
| `runway` | `#0f172a` | Body-Text |
| `runway-soft` | `#334155` | Sekundär-Text (≥ 7:1 auf cloud, AAA) |
| `runway-mute` | `#475569` | Tertiär-Text (≥ 6.5:1 auf cloud, AAA) |
| `on-primary-soft` | `#e6edf5` | Sekundär-Text auf primary-dark (≥ 12:1) |
| `on-primary-mute` | `#c7d4e3` | Tertiär-Text auf primary-dark (≥ 7.5:1) |
| `signal` | `#c1272d` | Emergency / Feuerwehr-Bezug |
| `success` | `#1f8a7a` | Bestätigungen |

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
| Pfad | Cache-Control |
|---|---|
| `/icons/*` | `public, max-age=31536000, immutable` (1 Jahr) |
| `/images/*` | `public, max-age=31536000, immutable` (1 Jahr) |
| `/fonts/*` | `public, max-age=31536000, immutable` (1 Jahr) |
| `/favicon.ico` | `public, max-age=86400, must-revalidate` (1 Tag) |
| `/manifest.webmanifest` | `public, max-age=86400, must-revalidate` (1 Tag) |
| `/browserconfig.xml` | `public, max-age=86400, must-revalidate` (1 Tag) |

Zusätzlich global gesetzt: `X-Content-Type-Options: nosniff`,
`X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`.

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

## Spam-Schutz / Cloudflare Turnstile
- Spam-Schutz für das Kontaktformular: **Cloudflare Turnstile**
  (Begründung & volle Implementierungs-Skizze siehe `konzept.md` §9.1)
- **Niemals** das Turnstile-Script global im Root-Layout laden – nur
  auf der Contact-Seite.
- Loading: `next/script` mit `strategy="lazyOnload"` + `render=explicit`.
- Widget-Render erst beim ersten `onFocus` eines Form-Felds (Lazy Mount).
- `<link rel="preconnect" href="https://challenges.cloudflare.com">` über
  Metadata API auf der Contact-Seite.
- Reservierter Platz `min-height: 65px` für den Widget-Container (CLS).
- Server-seitige Verifikation gegen `siteverify` ist **Pflicht** – Token
  niemals nur clientseitig vertrauen.
- Env-Vars: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client),
  `TURNSTILE_SECRET_KEY` (server-only). In `.env.example` listen,
  niemals committen.

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
