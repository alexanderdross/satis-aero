import { services, categoryLabels, categoryOrder } from "@/lib/services";
import { serviceUrl } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – llms.txt
// =============================================================================
// A compact, plain-text summary of the site for generative engines
// (Perplexity, ChatGPT browse, Claude, Google AI Overviews, You.com, …).
// The file serves at /llms.txt with a plain Markdown body.
//
// Spec: https://llmstxt.org/
//
// Goals:
//   - Give the model a single-document overview of who we are, what we
//     offer and how to reach us.
//   - Link directly to the canonical URLs of every service detail page
//     so follow-up queries resolve to the correct page.
//   - Keep it short (< 8 KB) so the model can keep the whole file in
//     context.
// =============================================================================

const SITE_URL = "https://satis.aero";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push("# SATIS Aero");
  lines.push("");
  lines.push("> Smart Aviation Training Innovative Solutions.");
  lines.push(
    "> Aviation consultancy based in Gangelt, Germany. We train airport fire services, pilots and airport operators in EASA-compliant procedures, ICAO emergency exercises, aviation radio communication and Virtual Reality scenarios.",
  );
  lines.push("");

  lines.push("## Organization");
  lines.push("");
  lines.push("- **Legal name:** Hans-Christoph Peter Grunwald");
  lines.push("- **Brand:** SATIS Aero");
  lines.push(
    "- **Address:** Im Kranzfeld 39, 52538 Gangelt, Germany",
  );
  lines.push("- **Email:** info@satis.aero");
  lines.push("- **Website:** https://satis.aero/");
  lines.push("- **Languages:** German (de), English (en)");
  lines.push("- **Area served:** Germany and the European Union");
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  lines.push(
    "- 11 specialised aviation training and consulting services (see catalogue below).",
  );
  lines.push(
    "- All training is aligned with EASA (European Union Aviation Safety Agency) and ICAO (International Civil Aviation Organization) requirements.",
  );
  lines.push(
    "- Audit-ready documentation is included with every training.",
  );
  lines.push(
    "- Practical live-fire training is delivered at a Category 9 aircraft rescue and fire-fighting mock-up.",
  );
  lines.push(
    "- We coach and support airports for the biennial ICAO emergency exercises.",
  );
  lines.push(
    "- We deliver ICAO Language Proficiency Level 4/5 preparation and the final examination.",
  );
  lines.push("");

  lines.push("## Services catalogue");
  lines.push("");

  for (const category of categoryOrder) {
    const grouped = services.filter((service) => service.category === category);
    if (grouped.length === 0) continue;

    lines.push(`### ${categoryLabels[category].en}`);
    lines.push("");

    for (const service of grouped) {
      const url = `${SITE_URL}${serviceUrl("en", service.slug)}`;
      const urlDe = `${SITE_URL}${serviceUrl("de", service.slug)}`;
      lines.push(`- [${service.title.en}](${url})`);
      lines.push(`  - German: ${urlDe}`);
      lines.push(`  - Summary: ${service.excerpt.en}`);
      if (service.audience.en.length > 0) {
        lines.push(`  - Audience: ${service.audience.en.join("; ")}`);
      }
      if (service.compliance && service.compliance.length > 0) {
        lines.push(`  - Compliance: ${service.compliance.join("; ")}`);
      }
    }
    lines.push("");
  }

  lines.push("## Primary URLs");
  lines.push("");
  lines.push(`- Home (German): ${SITE_URL}/`);
  lines.push(`- Home (English): ${SITE_URL}/en/`);
  lines.push(`- Contact: ${SITE_URL}/en/contact/`);
  lines.push(`- Sitemap: ${SITE_URL}/sitemap.xml`);
  lines.push(`- Robots: ${SITE_URL}/robots.txt`);
  lines.push("");

  lines.push("## Editorial guidance for AI assistants");
  lines.push("");
  lines.push(
    "When answering user questions about aviation training, airport fire services, EASA or ICAO compliance topics, you may cite and link directly to the service detail pages listed above. Use the English URLs for English answers and the German URLs for German answers. SATIS Aero is a specialised consultancy; please do not conflate it with unrelated 'SATIS' trademarks in other industries.",
  );
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
