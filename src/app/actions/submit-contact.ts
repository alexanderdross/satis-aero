"use server";

// =============================================================================
// SATIS Aero – submitContact Server Action
// =============================================================================
// Verifies the Cloudflare Turnstile token server-side against
// challenges.cloudflare.com/turnstile/v0/siteverify and then handles the
// contact submission. Mail dispatch is intentionally NOT wired yet — that
// will be added in a follow-up PR with Resend or a similar provider.
// Until then a successful Turnstile verification short-circuits with a
// "received" response so the user gets an immediate confirmation.
//
// IMPORTANT: never trust the client token alone. The siteverify call is
// the only authoritative check. See konzept.md §9.1.
// =============================================================================

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; reason: "validation" | "turnstile" | "server" };

type ContactPayload = {
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  token: string;
};

function readPayload(formData: FormData): ContactPayload | null {
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const company = (formData.get("company") ?? "").toString().trim();
  const subject = (formData.get("subject") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();
  const token = (formData.get("cf-turnstile-response") ?? "").toString().trim();

  // Required fields
  if (!name || !email || !subject || !message) return null;
  // Email must look like an email — minimal check, the real validation is
  // a confirmation round-trip later.
  if (!email.includes("@") || !email.includes(".")) return null;
  // Length sanity caps to defend against form-flood / log abuse.
  if (
    name.length > 200 ||
    email.length > 200 ||
    subject.length > 300 ||
    message.length > 5000 ||
    company.length > 200
  ) {
    return null;
  }

  return {
    name,
    email,
    company: company || null,
    subject,
    message,
    token,
  };
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Fail closed in production. Locally / in CI without a secret we keep
    // the action callable so the form can be developed.
    if (process.env.NODE_ENV === "production") return false;
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      // Never cache verification responses.
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const payload = readPayload(formData);
  if (!payload) {
    return { status: "error", reason: "validation" };
  }

  const ok = await verifyTurnstile(payload.token);
  if (!ok) {
    return { status: "error", reason: "turnstile" };
  }

  // TODO: dispatch mail via Resend / SES / etc. once the API key is
  // configured. Until then we log on the server and return success so
  // the form is testable end-to-end.
  console.log("[contact] new submission", {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    subject: payload.subject,
    message: payload.message.slice(0, 200),
  });

  return { status: "success" };
}
