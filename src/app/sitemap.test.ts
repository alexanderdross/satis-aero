import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { services } from "@/lib/services";

describe("sitemap()", () => {
  const entries = sitemap();

  it("contains exactly one URL per page per locale", () => {
    // 4 static pages (home, contact, imprint, privacy) * 2 locales = 8
    // + 11 services * 2 locales = 22
    // = 30 total
    expect(entries.length).toBe(30);
  });

  it("lists both the German and English variant of every static page", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://satis.aero/");
    expect(urls).toContain("https://satis.aero/en/");
    expect(urls).toContain("https://satis.aero/kontakt/");
    expect(urls).toContain("https://satis.aero/en/contact/");
    expect(urls).toContain("https://satis.aero/impressum/");
    expect(urls).toContain("https://satis.aero/en/imprint/");
    expect(urls).toContain("https://satis.aero/datenschutz/");
    expect(urls).toContain("https://satis.aero/en/privacy/");
  });

  it("lists every service in both locales", () => {
    const urls = entries.map((e) => e.url);
    for (const service of services) {
      expect(urls).toContain(
        `https://satis.aero/leistungen/${service.slug}/`,
      );
      expect(urls).toContain(
        `https://satis.aero/en/services/${service.slug}/`,
      );
    }
  });

  it("ends every URL with a trailing slash", () => {
    for (const entry of entries) {
      expect(entry.url.endsWith("/")).toBe(true);
    }
  });

  it("emits hreflang de, en and x-default on every entry", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages;
      expect(languages).toBeDefined();
      expect(languages).toHaveProperty("de");
      expect(languages).toHaveProperty("en");
      expect(languages).toHaveProperty("x-default");
    }
  });

  it("points x-default at the German variant for every URL", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages as {
        de: string;
        en: string;
        "x-default": string;
      };
      expect(languages["x-default"]).toBe(languages.de);
    }
  });

  it("uses matching cross-references between the DE and EN entries of the same page", () => {
    // Find a German service page and its English counterpart and assert
    // that both list each other in their `languages` alternates.
    const de = entries.find(
      (e) =>
        e.url === "https://satis.aero/leistungen/cat9-mockup-training/",
    );
    const en = entries.find(
      (e) =>
        e.url === "https://satis.aero/en/services/cat9-mockup-training/",
    );
    expect(de).toBeDefined();
    expect(en).toBeDefined();
    expect(de?.alternates?.languages).toEqual(en?.alternates?.languages);
  });

  it("sets priority 1.0 for home, 0.8 for services, 0.7 for contact, 0.3 for legal", () => {
    const byUrl = (url: string) => entries.find((e) => e.url === url);
    expect(byUrl("https://satis.aero/")?.priority).toBe(1.0);
    expect(byUrl("https://satis.aero/en/")?.priority).toBe(1.0);
    expect(byUrl("https://satis.aero/kontakt/")?.priority).toBe(0.7);
    expect(byUrl("https://satis.aero/impressum/")?.priority).toBe(0.3);
    expect(byUrl("https://satis.aero/datenschutz/")?.priority).toBe(0.3);
    expect(
      byUrl("https://satis.aero/leistungen/vr-training/")?.priority,
    ).toBe(0.8);
  });
});
