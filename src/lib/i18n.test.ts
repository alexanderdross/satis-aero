import { describe, expect, it } from "vitest";
import {
  anchors,
  defaultLocale,
  locales,
  pageAlternates,
  routes,
  serviceAlternates,
  serviceUrl,
  t,
} from "./i18n";

describe("locale constants", () => {
  it("lists both locales with DE as default", () => {
    expect(locales).toEqual(["de", "en"]);
    expect(defaultLocale).toBe("de");
  });
});

describe("routes", () => {
  it("uses trailing slashes for every German route", () => {
    expect(routes.de.home).toBe("/");
    expect(routes.de.imprint).toBe("/impressum/");
    expect(routes.de.privacy).toBe("/datenschutz/");
    expect(routes.de.contact).toBe("/kontakt/");
  });

  it("uses trailing slashes for every English route", () => {
    expect(routes.en.home).toBe("/en/");
    expect(routes.en.imprint).toBe("/en/imprint/");
    expect(routes.en.privacy).toBe("/en/privacy/");
    expect(routes.en.contact).toBe("/en/contact/");
  });
});

describe("pageAlternates", () => {
  it("has symmetric DE/EN pairs for every static page", () => {
    for (const [key, entry] of Object.entries(pageAlternates)) {
      expect(entry.de, `de alternate for ${key}`).toMatch(/^\/[^ ]*\/?$/);
      expect(entry.en, `en alternate for ${key}`).toMatch(/^\/en\/?/);
    }
  });
});

describe("serviceUrl()", () => {
  it("returns the German leistungen URL with trailing slash", () => {
    expect(serviceUrl("de", "coaching-crm-ccc")).toBe(
      "/leistungen/coaching-crm-ccc/",
    );
  });

  it("returns the English services URL with trailing slash", () => {
    expect(serviceUrl("en", "coaching-crm-ccc")).toBe(
      "/en/services/coaching-crm-ccc/",
    );
  });
});

describe("serviceAlternates()", () => {
  it("builds matching DE/EN pairs for a given slug", () => {
    const pair = serviceAlternates("vr-training");
    expect(pair.de).toBe("/leistungen/vr-training/");
    expect(pair.en).toBe("/en/services/vr-training/");
  });
});

describe("anchors", () => {
  it("uses German anchors on the German home page", () => {
    expect(anchors.de.services).toBe("leistungen");
    expect(anchors.de.about).toBe("ueber-uns");
    expect(anchors.de.contact).toBe("kontakt");
  });

  it("uses English anchors on the English home page", () => {
    expect(anchors.en.services).toBe("services");
    expect(anchors.en.about).toBe("about");
    expect(anchors.en.contact).toBe("contact");
  });
});

describe("t (translations)", () => {
  it("has a full tree for both locales", () => {
    for (const locale of locales) {
      const tr = t[locale];
      expect(tr.siteName).toBe("SATIS Aero");
      expect(tr.nav.services).toBeTruthy();
      expect(tr.nav.ctaTitle).toBeTruthy();
      expect(tr.hero.titlePrefix).toBeTruthy();
      expect(tr.imprint.title).toBeTruthy();
      expect(tr.privacy.title).toBeTruthy();
      expect(tr.notFound.title).toBeTruthy();
    }
  });

  it("keeps structural parity between DE and EN", () => {
    // Walk both trees recursively and make sure every key exists on both
    // sides. Catches "forgot to translate a string" regressions.
    const walk = (a: unknown, b: unknown, path: string[]): string[] => {
      const missing: string[] = [];
      if (
        typeof a !== "object" ||
        typeof b !== "object" ||
        a === null ||
        b === null
      ) {
        return missing;
      }
      const aKeys = Object.keys(a as Record<string, unknown>);
      const bKeys = Object.keys(b as Record<string, unknown>);
      const allKeys = new Set([...aKeys, ...bKeys]);
      for (const key of allKeys) {
        const here = [...path, key];
        const aHas = Object.prototype.hasOwnProperty.call(a, key);
        const bHas = Object.prototype.hasOwnProperty.call(b, key);
        if (!aHas) missing.push(`de: ${here.join(".")}`);
        if (!bHas) missing.push(`en: ${here.join(".")}`);
        if (aHas && bHas) {
          const av = (a as Record<string, unknown>)[key];
          const bv = (b as Record<string, unknown>)[key];
          missing.push(...walk(av, bv, here));
        }
      }
      return missing;
    };

    const missing = walk(t.de, t.en, []);
    expect(missing).toEqual([]);
  });
});
