import type { Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Country flag SVGs
// =============================================================================
// Inline SVGs for the language switcher. Self-contained, ~600 bytes total,
// no extra HTTP request, no font dependency, perfect rendering at every
// pixel ratio.
// =============================================================================

type Props = {
  locale: Locale;
  className?: string;
  title?: string;
};

export function Flag({ locale, className, title }: Props) {
  if (locale === "de") {
    return (
      <svg
        viewBox="0 0 5 3"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={title ?? "Flagge Deutschlands"}
      >
        {title ? <title>{title}</title> : null}
        <rect width="5" height="1" y="0" fill="#000000" />
        <rect width="5" height="1" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  // English → Union Jack (United Kingdom)
  return (
    <svg
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title ?? "Flag of the United Kingdom"}
    >
      {title ? <title>{title}</title> : null}
      <clipPath id="flag-uk-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#flag-uk-clip)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
