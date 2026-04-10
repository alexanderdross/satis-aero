"use client";

import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  submitContact,
  type ContactFormState,
} from "@/app/actions/submit-contact";
import { t, type Locale } from "@/lib/i18n";

// =============================================================================
// SATIS Aero – Contact Form (Client Component, the only client island on the
// site, justified by the Cloudflare Turnstile widget)
// =============================================================================
// Behaviour follows konzept.md §9.1:
//   1. The Turnstile script is loaded ONLY on this page (we are inside the
//      contact page) via next/script with strategy="lazyOnload" so it kicks
//      in after window.load and never blocks LCP.
//   2. render=explicit means we control when the widget mounts.
//   3. The widget is mounted on the first onFocus of any input field, so
//      bots that never focus the form never trigger a Turnstile challenge.
//   4. A 65px container reserves the layout slot to avoid CLS.
//   5. Submission is handled by a Server Action (`submitContact`) that
//      verifies the token against Cloudflare's siteverify endpoint
//      server-side. The client never gets to skip verification.
// =============================================================================

const initialState: ContactFormState = { status: "idle" };

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm({ locale }: { locale: Locale }) {
  const tr = t[locale].contactPage;
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  // Mount Turnstile on the first interaction with the form. We listen for
  // a focusin once instead of binding to every input.
  const handleFirstFocus = () => {
    if (
      !widgetMounted &&
      scriptLoaded &&
      widgetRef.current &&
      window.turnstile &&
      siteKey
    ) {
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        theme: "light",
      });
      setWidgetMounted(true);
    }
  };

  // Reset the widget after a successful submission so the user can submit
  // again if they want to.
  useEffect(() => {
    if (
      state.status === "success" &&
      widgetMounted &&
      widgetIdRef.current &&
      window.turnstile
    ) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [state.status, widgetMounted]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <form
        action={formAction}
        onFocusCapture={handleFirstFocus}
        noValidate
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label={tr.formNameLabel}
            placeholder={tr.formNamePlaceholder}
            type="text"
            autoComplete="name"
            required
          />
          <Field
            id="email"
            label={tr.formEmailLabel}
            placeholder={tr.formEmailPlaceholder}
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <Field
          id="company"
          label={tr.formCompanyLabel}
          placeholder={tr.formCompanyPlaceholder}
          type="text"
          autoComplete="organization"
        />
        <Field
          id="subject"
          label={tr.formSubjectLabel}
          placeholder={tr.formSubjectPlaceholder}
          type="text"
          required
        />

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-runway"
          >
            {tr.formMessageLabel}
            <span aria-hidden="true" className="ml-0.5 text-signal">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={tr.formMessagePlaceholder}
            required
            className="w-full rounded-lg border border-sky bg-white px-4 py-3 text-sm text-runway placeholder:text-runway-mute/70 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </div>

        {/* Reserved Turnstile container – min-height prevents CLS */}
        <div>
          <span className="sr-only">{tr.turnstileLabel}</span>
          <div ref={widgetRef} style={{ minHeight: 65 }} />
        </div>

        {state.status === "success" && (
          <p
            role="status"
            className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
          >
            {tr.formSuccess}
          </p>
        )}
        {state.status === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-signal/30 bg-signal/10 px-4 py-3 text-sm text-signal"
          >
            {state.reason === "turnstile" ? tr.formTurnstileError : tr.formError}
          </p>
        )}

        <p className="text-xs text-runway-mute">{tr.formPrivacyHint}</p>

        <button
          type="submit"
          disabled={pending}
          title={tr.formSubmitTitle}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-70 sm:text-base"
        >
          {pending ? tr.formSubmitting : tr.formSubmit}
        </button>
      </form>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-runway"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-signal">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-sky bg-white px-4 py-3 text-sm text-runway placeholder:text-runway-mute/70 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      />
    </div>
  );
}
