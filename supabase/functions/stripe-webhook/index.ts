// Stripe → Supabase: when a checkout is paid, record the book and invite the buyer to set a password.
// No Stripe library: the signature is checked with Web Crypto (the Stripe library's Node shims crash in Supabase).
// Secret: STRIPE_WEBHOOK_SECRET (whsec_…). SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
// "Verify JWT" must be off for this function.
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const SITE = "https://spatialsprout.ca";
const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const enc = new TextEncoder();

async function validSignature(body: string, header: string | null, secret: string): Promise<boolean> {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=", 2)) as [string, string][]);
  const t = parts["t"];
  const sigs = header.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 600) return false;
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${body}`)));
  const hex = Array.from(mac, (b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((s) => s.length === hex.length && s.split("").reduce((d, c, i) => d | (c.charCodeAt(0) ^ hex.charCodeAt(i)), 0) === 0);
}

Deno.serve(async (req) => {
  const body = await req.text();
  const secret = (Deno.env.get("STRIPE_WEBHOOK_SECRET") || "").trim();
  if (!(await validSignature(body, req.headers.get("stripe-signature"), secret))) {
    console.error("bad signature (check STRIPE_WEBHOOK_SECRET)");
    return new Response("bad signature", { status: 400 });
  }
  const event = JSON.parse(body);
  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const email = String(s.customer_details?.email || s.customer_email || "").toLowerCase();
    const slug = s.metadata?.slug;
    if (s.payment_status === "paid" && email && slug) {
      const { error } = await admin.from("purchases").upsert({ email, book_slug: slug, stripe_session: s.id }, { onConflict: "stripe_session" });
      if (error) { console.error("db error", error.message); return new Response("db error", { status: 500 }); }
      const inv = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${SITE}/account.html` });
      if (inv.error && !/already/i.test(inv.error.message)) console.error("invite error", inv.error.message);
      else console.log("purchase saved for", email, slug, inv.error ? "(existing account)" : "(invite sent)");
    } else console.log("skipped: not paid or missing email/slug");
  }
  return new Response("ok");
});
