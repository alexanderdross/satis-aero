import { describe, expect, it } from "vitest";
import {
  categoryLabels,
  categoryOrder,
  getServiceBySlug,
  services,
  type Service,
  type ServiceCategory,
} from "./services";
import { locales } from "./i18n";

describe("service catalogue", () => {
  it("contains exactly 11 services", () => {
    expect(services).toHaveLength(11);
  });

  it("has unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has bilingual title, menuTitle, excerpt, description, audience and outcomes on every service", () => {
    for (const service of services) {
      for (const locale of locales) {
        expect(service.title[locale], `${service.slug}.title.${locale}`).toBeTruthy();
        expect(
          service.menuTitle[locale],
          `${service.slug}.menuTitle.${locale}`,
        ).toBeTruthy();
        expect(
          service.excerpt[locale],
          `${service.slug}.excerpt.${locale}`,
        ).toBeTruthy();
        expect(
          service.description[locale],
          `${service.slug}.description.${locale}`,
        ).toBeTruthy();
        expect(
          service.audience[locale].length,
          `${service.slug}.audience.${locale}`,
        ).toBeGreaterThan(0);
        expect(
          service.outcomes[locale].length,
          `${service.slug}.outcomes.${locale}`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("keeps menuTitle short (<= 32 chars) for scannable menus", () => {
    for (const service of services) {
      for (const locale of locales) {
        expect(
          service.menuTitle[locale].length,
          `${service.slug}.menuTitle.${locale}="${service.menuTitle[locale]}"`,
        ).toBeLessThanOrEqual(32);
      }
    }
  });

  it("assigns each service to a known category", () => {
    const valid: ServiceCategory[] = [
      "coaching",
      "compliance",
      "practice",
      "tools",
    ];
    for (const service of services) {
      expect(valid).toContain(service.category);
    }
  });

  it("has every category referenced in categoryOrder", () => {
    for (const service of services) {
      expect(categoryOrder).toContain(service.category);
    }
  });

  it("has bilingual labels for every category", () => {
    for (const category of categoryOrder) {
      expect(categoryLabels[category].de).toBeTruthy();
      expect(categoryLabels[category].en).toBeTruthy();
    }
  });
});

describe("getServiceBySlug()", () => {
  it("finds an existing service", () => {
    const s = getServiceBySlug("vr-training");
    expect(s).toBeTruthy();
    expect(s?.slug).toBe("vr-training");
  });

  it("returns undefined for an unknown slug", () => {
    const s: Service | undefined = getServiceBySlug("does-not-exist");
    expect(s).toBeUndefined();
  });
});
