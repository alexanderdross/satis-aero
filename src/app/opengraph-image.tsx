import { ImageResponse } from "next/og";

// =============================================================================
// SATIS Aero – Default Open Graph Image
// =============================================================================
// Generated at build time via the next/og ImageResponse helper. Renders a
// 1200×630 brand-coloured card with the SATIS Aero wordmark and tagline.
// Used as the fallback OG image for every page that does not declare its
// own opengraph-image.
//
// Notes for satori (the renderer behind next/og):
//   - Any element with more than one child MUST have `display: flex` (or
//     `display: none`). We use `display: flex` everywhere to be safe.
//   - Avoid emoji – they trigger an external Twemoji fetch.
// =============================================================================

export const alt = "SATIS Aero – Smart Aviation Training Innovative Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #173a5c 0%, #255685 55%, #3d7bb3 100%)",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, Arial, sans-serif",
        padding: "80px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.85,
        }}
      >
        AVIATION CONSULTANCY
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          fontSize: 144,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        SATIS Aero
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          fontSize: 44,
          fontWeight: 600,
          opacity: 0.95,
        }}
      >
        Smart Aviation Training Innovative Solutions
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "60px",
          fontSize: 26,
          opacity: 0.8,
          letterSpacing: "0.05em",
        }}
      >
        satis.aero
      </div>
    </div>,
    { ...size },
  );
}
