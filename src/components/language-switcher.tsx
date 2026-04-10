"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Flag } from "@/components/flag";
import { locales, routes, t, type Locale } from "@/lib/i18n";

const labels: Record<Locale, { native: string; flagTitle: string }> = {
  de: { native: "Deutsch", flagTitle: "Flagge Deutschlands" },
  en: { native: "English", flagTitle: "Flag of the United Kingdom" },
};

export function LanguageSwitcher({ current }: { current: Locale }) {
  const tr = t[current];
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = useId();

  // Close on outside click and on Escape
  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        title={tr.nav.langSwitchTitle}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-sky sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      >
        <Flag
          locale={current}
          className="h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10"
          title={labels[current].flagTitle}
        />
        <span className="uppercase">{current}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="listbox"
          aria-label={tr.nav.langSwitchTitle}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-sky bg-white shadow-lg ring-1 ring-black/5"
        >
          {locales.map((locale) => {
            const isCurrent = locale === current;
            const href = routes[locale].home;
            return (
              <li key={locale} role="option" aria-selected={isCurrent}>
                <Link
                  href={href}
                  hrefLang={locale}
                  title={t[locale].nav.langSwitchTitle}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isCurrent
                      ? "bg-sky font-semibold text-primary"
                      : "text-runway hover:bg-sky"
                  }`}
                >
                  <Flag
                    locale={locale}
                    className="h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10"
                    title={labels[locale].flagTitle}
                  />
                  <span className="flex-1">{labels[locale].native}</span>
                  {isCurrent && (
                    <span className="text-xs text-primary" aria-hidden="true">
                      ●
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
