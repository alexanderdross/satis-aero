# SATIS Aero

**Smart Aviation Training Innovative Solutions** – Aviation Consultancy für
Flughafenfeuerwehren, Piloten und Flughafenbetreiber. Production-Site:
[satis.aero](https://satis.aero).

## Tech-Stack

- **Next.js 16.2.3** (App Router, Turbopack)
- **React 19** / **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`, theme via `@theme inline`)
- **ESLint 9** + **Prettier** (`prettier-plugin-tailwindcss`)
- **lucide-react**, `clsx`, `tailwind-merge`
- Hosting: **Vercel** (Frankfurt fra1, Edge-Cache)

Alle Routen sind statisch prerendered und werden direkt vom Vercel
Edge-Network ausgeliefert.

## Architektur in einem Satz

Multi-Root-Layout via Route Groups: `(de)` rendert die deutsche Site am Root,
`(en)` rendert die englische Site unter `/en/` – beide vollständig
serverseitig, **null Client-JavaScript** im Layout-Shell.

## Routen

| URL             | Locale | Inhalt                            |
| --------------- | ------ | --------------------------------- |
| `/`             | de     | Homepage                          |
| `/impressum/`   | de     | Impressum                         |
| `/datenschutz/` | de     | Datenschutz                       |
| `/en/`          | en     | Homepage                          |
| `/en/imprint/`  | en     | Imprint                           |
| `/en/privacy/`  | en     | Privacy                           |
| `/sitemap.xml`  | –      | Multilingual Sitemap mit hreflang |
| `/robots.txt`   | –      | robots                            |

URL-Policy: alle Pfade enden mit Trailing Slash (`trailingSlash: true`).

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000
```

## Skripte

```bash
npm run dev      # Dev-Server (Turbopack)
npm run build    # Production-Build
npm run start    # Production-Server lokal starten
npm run lint     # ESLint
```

## Projektstruktur

```
src/
├── app/
│   ├── (de)/                   # DE Root-Layout + Routen am /
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── impressum/page.tsx
│   │   └── datenschutz/page.tsx
│   ├── (en)/                   # EN Root-Layout + Routen unter /en/
│   │   ├── layout.tsx
│   │   └── en/
│   │       ├── page.tsx
│   │       ├── imprint/page.tsx
│   │       └── privacy/page.tsx
│   ├── globals.css             # Tailwind v4 + Aviation-Tokens
│   ├── sitemap.ts              # multilingual XML-Sitemap
│   └── robots.ts
├── components/
│   ├── header.tsx              # Server Component
│   ├── footer.tsx              # Server Component
│   ├── language-switcher.tsx   # Server Component (<details>-Dropdown)
│   ├── flag.tsx                # Inline-SVG DE / GB Flaggen
│   ├── home-content.tsx        # Server Component, locale-agnostic
│   ├── imprint-content.tsx     # Server Component, locale-agnostic
│   └── privacy-content.tsx     # Server Component, locale-agnostic
└── lib/
    ├── i18n.ts                 # Single source: locales, routes, anchors, t()
    ├── services.ts             # Service-Katalog (DE+EN pro Service)
    └── utils.ts                # cn() Helper

public/
├── favicon.ico                 # Browser-Auto-Discovery
├── manifest.webmanifest        # PWA-Manifest, absolute Pfade
├── browserconfig.xml           # MS-Tile Config
├── icons/                      # 24 Platform-Icons (android, apple, ms, favicon)
└── images/brand/
    ├── satis-logo.png          # Wortmarke
    └── satis-mark.png          # Icon-Mark
```

## Dokumentation

- **[`konzept.md`](./konzept.md)** – fachliches Konzept (Services,
  Sitemap, Design-System, SEO, Compliance, Roadmap)
- **[`CLAUDE.md`](./CLAUDE.md)** – technische Leitplanken / Konventionen
- **[`AGENTS.md`](./AGENTS.md)** – Reminder zur Next.js-16-Version

## Performance-Garantien

Bei jedem Change muss gelten:

1. `npm run build` läuft grün
2. **Alle** Routes erscheinen in der Build-Ausgabe als `○ (Static)`
3. **Kein** `"use client"` im Layout-Shell (Header, Footer, Layouts,
   LanguageSwitcher, Content-Komponenten)
4. `npm run lint` gibt keine Warnings aus

## Deployment

Vercel deployt automatisch bei jedem Push auf `main`. Preview-Deploys
für jeden PR. Konfiguration in [`vercel.json`](./vercel.json) (Cache-Header,
Security-Header).

Environment-Variablen für Cloudflare Turnstile (siehe `konzept.md` §9.1)
sind in den Vercel Project Settings hinterlegt – siehe
[`.env.example`](./.env.example) für die benötigten Keys.
