// Stripe → Supabase: when a checkout is paid, record the book and invite the buyer to set a password.
// Secrets (set in Supabase → Edge Functions → Secrets): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase automatically.
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20", httpClient: Stripe.createFetchHttpClient() });
const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const SITE = "https://spatialsprout.ca";

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, Deno.env.get("STRIPE_WEBHOOK_SECRET")!, undefined, Stripe.createSubtleCryptoProvider());
  } catch (_e) {
    return new Response("bad signature", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = (s.customer_details?.email || s.customer_email || "").toLowerCase();
    const slug = s.metadata?.slug;
    if (s.payment_status === "paid" && email && slug) {
      const { error } = await admin.from("purchases").upsert({ email, book_slug: slug, stripe_session: s.id }, { onConflict: "stripe_session" });
      if (error) return new Response("db error", { status: 500 });
      // new buyers get an email to set their password; existing buyers already have one
      const inv = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${SITE}/account.html` });
      if (inv.error && !/already/i.test(inv.error.message)) console.error(inv.error.message);
    }
  }
  return new Response("ok");
});
