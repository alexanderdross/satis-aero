"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

// =============================================================================
// SATIS Aero – submitContact Server Action
// =============================================================================
// Defence in depth for the contact form:
//
// 1. Rate limit                (per-IP, sliding window – best effort)
// 2. Honeypot field check      (instant reject if filled)
// 3. zod validation            (typed schema with length caps)
// 4. Cloudflare Turnstile      (server-side verification, never trust client)
// 5. Resend mail dispatch      (with graceful fallback when no API key)
//
// IMPORTANT: never trust the client token alone. The siteverify call is
// the only authoritative spam check. See konzept.md §9.1.
//
// About the rate limit: this is an in-memory sliding window that is
// scoped to a single serverless invocation instance. On Vercel that
// means the limit is reset whenever the underlying function is cold-
// started, so a determined attacker can still slip past. For real
// production-grade rate limiting, swap the implementation below for
// Upstash Redis (`@upstash/ratelimit`) or Vercel KV. The current
// implementation nevertheless catches naive flooding from a single
// warm instance and raises the cost of scripted abuse, which is
// enough in combination with Turnstile + honeypot + zod.
// =============================================================================

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const RATE_LIMIT_MAX = 5; // submissions allowed
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

// Per-IP submission timestamps, pruned on every check. Module-level
// state is fine here because it lives as long as the warm instance.
const rateLimitStore = new Map<string, number[]>();

function getClientIp(h: Headers): string {
  // Vercel sets x-real-ip and x-forwarded-for, in that order of
  // precedence. Fall back to "unknown" so the limiter still groups
  // anonymous callers together.
  return h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const history = rateLimitStore.get(ip) ?? [];
  // Drop timestamps outside the window.
  const recent = history.filter((ts) => ts > cutoff);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      reason: "validation" | "turnstile" | "honeypot" | "server" | "rate-limit";
    };

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  company: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  subject: z.string().trim().min(2).max(300),
  message: z.string().trim().min(10).max(5000),
  // Honeypot. Real users never see this field; bots usually do.
  website: z.string().max(0, "honeypot").optional().default(""),
  // Turnstile token from the client widget.
  token: z.string().min(1).max(4096),
});

type ContactPayload = z.infer<typeof ContactSchema>;

function readPayload(formData: FormData) {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
    token: formData.get("cf-turnstile-response")?.toString() ?? "",
  };
  return ContactSchema.safeParse(raw);
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Fail closed in production. Locally / in CI without a secret we keep
    // the action callable so the form can be developed.
    return process.env.NODE_ENV !== "production";
  }
  if (!token) return false;

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function dispatchMail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@satis.aero";
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@satis.aero";

  if (!apiKey) {
    // No key configured yet → log on the server so the submission is not
    // lost in dev / preview environments. Production should always set
    // RESEND_API_KEY in Vercel.
    console.warn("[contact] RESEND_API_KEY missing, logging submission instead", {
      from: payload.email,
      name: payload.name,
      company: payload.company,
      subject: payload.subject,
    });
    return true;
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `[SATIS Aero] ${payload.subject}`;
    const text = [
      `Name: ${payload.name}`,
      `E-Mail: ${payload.email}`,
      payload.company ? `Organisation: ${payload.company}` : null,
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: `SATIS Aero <${from}>`,
      to: [to],
      replyTo: payload.email,
      subject,
      text,
    });
    if (error) {
      console.error("[contact] resend dispatch failed", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] resend threw", err);
    return false;
  }
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1) Rate limit – cheap first-line defence before any parsing or
  // network calls.
  const h = await headers();
  const ip = getClientIp(h);
  if (isRateLimited(ip)) {
    return { status: "error", reason: "rate-limit" };
  }

  const parsed = readPayload(formData);
  if (!parsed.success) {
    // The honeypot validator emits a literal "honeypot" message, so we
    // can distinguish that from regular validation issues.
    const isHoneypot = parsed.error.issues.some((issue) => issue.message === "honeypot");
    return {
      status: "error",
      reason: isHoneypot ? "honeypot" : "validation",
    };
  }

  const ok = await verifyTurnstile(parsed.data.token);
  if (!ok) {
    return { status: "error", reason: "turnstile" };
  }

  const sent = await dispatchMail(parsed.data);
  if (!sent) {
    return { status: "error", reason: "server" };
  }

  return { status: "success" };
}
