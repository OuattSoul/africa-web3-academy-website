import { NextResponse } from "next/server";
import { FORMS, validateForm, type FormDef, type FormId } from "@/lib/forms";
import { storeEnabled, storeSubmission } from "@/lib/submissions";

// Delivery: stored as JSON lines for the admin (lib/submissions.ts) and/or e-mailed via the Resend HTTP API.
// E-mail env: RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL. With no working channel the route
// answers 503/502 so the UI never shows a fake success.

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
// shortcut: in-memory rate limit is per server instance; use a shared store (e.g. Upstash) if deployed on several instances.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: object, status: number) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid", message: "Requête invalide." }, 400);
  }

  const def = FORMS[payload.formId as FormId];
  if (!def) return json({ error: "invalid", message: "Formulaire inconnu." }, 400);

  // Spam traps: hidden field must stay empty, and humans need a few seconds to fill a form.
  const startedAt = Number(payload.startedAt);
  if (payload.website || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json({ error: "spam", message: "Envoi refusé. Merci de réessayer dans quelques secondes." }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) return json({ error: "rate", message: "Trop d'envois récents. Réessayez dans quelques minutes." }, 429);

  const data = (payload.data ?? {}) as Record<string, unknown>;
  const errors = validateForm(def, data);
  if (Object.keys(errors).length) return json({ error: "validation", errors, message: "Certains champs sont à corriger." }, 422);

  const { RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL } = process.env;
  const emailConfigured = Boolean(RESEND_API_KEY && FORMS_TO_EMAIL && FORMS_FROM_EMAIL);
  if (!emailConfigured && !storeEnabled()) {
    console.error("[forms] no delivery channel: set RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL or enable SUBMISSIONS_STORE");
    return json({ error: "not_configured", message: "L'envoi en ligne n'est pas encore activé." }, 503);
  }

  // Only known fields are kept, trimmed.
  const clean: Record<string, string | boolean> = {};
  for (const f of def.fields) {
    const raw = data[f.name];
    if (f.type === "checkbox") clean[f.name] = raw === true || raw === "on";
    else if (typeof raw === "string" && raw.trim()) clean[f.name] = raw.trim();
  }

  // Success requires at least one channel that really received the data.
  let stored = false;
  if (storeEnabled()) {
    try { await storeSubmission(def.id, clean); stored = true; }
    catch (e) { console.error("[forms] could not store submission", e); }
  }
  const emailed = emailConfigured ? await sendEmail(def, clean) : false;
  if (!stored && !emailed) return json({ error: "delivery", message: "L'envoi a échoué côté serveur." }, 502);
  return json({ ok: true }, 200);
}

async function sendEmail(def: FormDef, data: Record<string, string | boolean>) {
  const { RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL } = process.env;
  // Labels make the e-mail readable.
  const lines = def.fields.map((f) => {
    const raw = data[f.name];
    const value = f.type === "checkbox" ? (raw ? "Oui" : "Non") : f.options?.find((o) => o.value === raw)?.label ?? String(raw ?? "");
    return `${f.label}\n${value || "—"}`;
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FORMS_FROM_EMAIL,
        to: FORMS_TO_EMAIL!.split(",").map((s) => s.trim()),
        reply_to: String(data.email ?? "").trim() || undefined,
        subject: `[Site] ${def.subject} — ${String(data.organisation || data.nom || "").trim()}`,
        text: lines.join("\n\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[forms] resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[forms] resend unreachable", e);
    return false;
  }
}
