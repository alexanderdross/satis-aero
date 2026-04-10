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

## Next.js 16 Reminder
> Diese Version hat Breaking Changes ggü. älteren Next.js-Versionen.
> Vor jedem nicht-trivialen Change die lokalen Docs unter
> `node_modules/next/dist/docs/` lesen.

- `params` und `searchParams` sind **`Promise<T>`** (BREAKING) –
  siehe `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `next/image`: `priority` ist **deprecated** → `preload={true|false}` verwenden –
  siehe `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`
- Statische Metadaten via `export const metadata` / dynamisch via
  `generateMetadata` – siehe
  `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`

## Design-Tokens (siehe `konzept.md` §2.5 für die volle Palette)
| Token | Hex | Nutzung |
|---|---|---|
| `primary` | `#255685` | Logo, CTAs, Headlines |
| `primary-dark` | `#173a5c` | Hover, Footer |
| `primary-light` | `#3d7bb3` | Links, Akzente |
| `sky` | `#e8f1f9` | Section-BG |
| `runway` | `#1a1a1a` | Body-Text dark |
| `cloud` | `#f8fafc` | Page-BG |
| `signal` | `#e63946` | Emergency / Feuerwehr-Bezug |
| `success` | `#2a9d8f` | Bestätigungen |

Tokens werden in `src/app/globals.css` über `@theme inline` als CSS-Variablen
definiert und sind dann als Tailwind-Klassen verfügbar (z. B. `bg-primary`).

## Font-Regeln
- **Self-hosted only.** Niemals `next/font/google` oder externe Font-CDNs.
- Font: **Liberation Sans** (OFL-Lizenz, metrisch kompatibel zu Arial)
- Files in `public/fonts/LiberationSans-{Regular,Bold,Italic,BoldItalic}.woff2`
- Setup über `next/font/local` in `src/app/layout.tsx` mit:
  - `display: "swap"`
  - `preload: true`
  - `adjustFontFallback: "Arial"`
- Fallback-Stack: `Arial, Helvetica, sans-serif`

## Image-Regeln
- **Immer `next/image`** – nie native `<img>`.
- Statische `width` und `height` setzen (außer bei `fill`) → CLS-Optimierung.
- Bei `fill` und responsiven Bildern **immer** `sizes` setzen,
  z. B. `sizes="(max-width: 768px) 100vw, 50vw"`.
- Lazy Loading ist Default. Above-the-fold Bilder erhalten `preload={true}`
  (Next.js 16 – `priority` ist deprecated).
- Formate: AVIF/WebP automatisch über Image Optimization. In `next.config.ts`:
  `images.formats: ["image/avif", "image/webp"]`.
- **Static Imports** wo möglich – sie liefern `width`, `height` und
  `blurDataURL` automatisch.
- Hero-Bilder: `placeholder="blur"`.
- `alt` und `title` sind Pflicht und müssen beschreibend sein.
- Quellbilder vor Commit komprimieren (Ziel: < 200 KB pro Hero).
- Verzeichnis: `public/images/{hero,services,team,references}/`.

## i18n
- Zweisprachig **DE / EN**, DE als Default.
- Routenstruktur: `src/app/[locale]/...`
- `params.locale` ist in Next.js 16 ein Promise → `await params`.
- Hreflang-Tags in `layout.tsx` setzen.

## Coding-Konventionen
- TypeScript strict, keine `any`.
- Klassen-Komposition über `cn()` aus `src/lib/utils.ts`.
- Server Components als Default; `"use client"` nur wenn nötig (Interaktivität,
  Hooks, Browser-APIs).
- Dateinamen: kebab-case für Routes, PascalCase für Components.
- Keine neuen Files ohne Bezug zum Konzept – Single Source of Truth ist
  `konzept.md`.
