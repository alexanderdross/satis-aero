import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots()", () => {
  const data = robots();

  it("allows the general web crawler at the site root", () => {
    const rules = Array.isArray(data.rules) ? data.rules : [data.rules];
    const star = rules.find((r) => r.userAgent === "*");
    expect(star).toBeTruthy();
    expect(star?.allow).toBe("/");
  });

  it("disallows /_next/ chunks for every crawler", () => {
    const rules = Array.isArray(data.rules) ? data.rules : [data.rules];
    for (const rule of rules) {
      expect(rule.disallow).toContain("/_next/");
    }
  });

  it("includes explicit allow rules for major AI crawlers", () => {
    const rules = Array.isArray(data.rules) ? data.rules : [data.rules];
    const agents = rules.map((r) => r.userAgent).filter(Boolean);
    // Sanity-check a representative handful. The full list lives in
    // src/app/robots.ts.
    expect(agents).toContain("GPTBot");
    expect(agents).toContain("ClaudeBot");
    expect(agents).toContain("PerplexityBot");
    expect(agents).toContain("Google-Extended");
    expect(agents).toContain("Applebot-Extended");
  });

  it("points at the sitemap", () => {
    const sitemap = Array.isArray(data.sitemap) ? data.sitemap : [data.sitemap];
    expect(sitemap).toContain("https://satis.aero/sitemap.xml");
  });

  it("sets the canonical host", () => {
    expect(data.host).toBe("https://satis.aero");
  });
});
