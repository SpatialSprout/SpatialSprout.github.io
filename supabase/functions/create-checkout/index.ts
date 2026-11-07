// Starts a Stripe Checkout for one book. The browser sends { slug }; the price comes from this list, never from the browser.
// Secret: STRIPE_SECRET_KEY. Set AUTOMATIC_TAX=on once the head office address is saved in Stripe Tax settings.
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20", httpClient: Stripe.createFetchHttpClient() });
const SITE = "https://spatialsprout.ca";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
// sandbox price IDs (same as assets/stripe-prices.js); swap for live IDs at launch
const PRICES: Record<string, string> = JSON.parse(Deno.env.get("PRICES_JSON") || "{}");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  let slug = "";
  try { slug = String((await req.json()).slug || ""); } catch (_e) { /* empty */ }
  const price = PRICES[slug];
  if (!price) return new Response(JSON.stringify({ error: "unknown book" }), { status: 400, headers: { ...cors, "content-type": "application/json" } });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    automatic_tax: { enabled: Deno.env.get("AUTOMATIC_TAX") === "on" },
    billing_address_collection: "required",
    metadata: { slug },
    success_url: `${SITE}/account.html?bought=${encodeURIComponent(slug)}`,
    cancel_url: `${SITE}/#library`,
  });
  return new Response(JSON.stringify({ url: session.url }), { headers: { ...cors, "content-type": "application/json" } });
});
