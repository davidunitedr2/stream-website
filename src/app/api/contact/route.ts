import { NextResponse } from "next/server";

// Contact intake. Validates, logs, and (when configured) notifies. Always
// redirects back with a status so the form never dead-ends. Wiring Resend /
// Klaviyo is a drop-in: set the env vars and fill the TODO below.
export async function POST(req: Request) {
  const form = await req.formData();
  const get = (k: string) => (form.get(k)?.toString() ?? "").trim();

  const data = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    topic: get("topic"),
    message: get("message"),
  };

  const origin = new URL(req.url).origin;
  // On failure, echo the submitted values back so the user never retypes.
  const fail = (reason: string) => {
    const q = new URLSearchParams({ error: reason, ...data });
    return NextResponse.redirect(`${origin}/contact?${q.toString()}#contact-form`, 303);
  };

  // Validation (mirrors the required fields on the form).
  if (!data.name || !data.email) return fail("missing");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return fail("email");

  // Audit log (visible in server logs / Vercel function logs).
  console.log("[contact] submission", { ...data, message: data.message.slice(0, 500) });

  // TODO: notify the team. When RESEND_API_KEY + RESEND_NOTIFICATIONS_TO are
  // set, send a plain-text email here; route by data.topic to the right inbox.
  // When KLAVIYO_PRIVATE_API_KEY + KLAVIYO_LIST_ID are set, upsert + subscribe.

  return NextResponse.redirect(`${origin}/contact?submitted=true#contact-form`, 303);
}
