// Starts a Stripe Checkout for one book. The browser sends { slug }; the price comes from PRICES_JSON, never from the browser.
// Secrets: STRIPE_SECRET_KEY, PRICES_JSON. Set AUTOMATIC_TAX=on once the head office address is saved in Stripe Tax settings.
// "Verify JWT" must be off for this function.
const SITE = "https://spatialsprout.ca";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "content-type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const key = (Deno.env.get("STRIPE_SECRET_KEY") || "").trim();
    if (!key.startsWith("sk_")) return json({ error: "STRIPE_SECRET_KEY is missing or not an sk_ key" }, 500);
    let prices: Record<string, string> = {};
    try { prices = JSON.parse(Deno.env.get("PRICES_JSON") || "{}"); } catch (_e) { return json({ error: "PRICES_JSON secret is not valid" }, 500); }
    let slug = "";
    try { slug = String((await req.json()).slug || ""); } catch (_e) { /* empty */ }
    const price = prices[slug];
    if (!price) return json({ error: "unknown book: " + slug }, 400);
    const form = new URLSearchParams({
      "mode": "payment",
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      "automatic_tax[enabled]": Deno.env.get("AUTOMATIC_TAX") === "on" ? "true" : "false",
      "billing_address_collection": "required",
      "metadata[slug]": slug,
      "success_url": `${SITE}/account.html?bought=${encodeURIComponent(slug)}`,
      "cancel_url": `${SITE}/#library`,
    });
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const d = await r.json();
    if (!r.ok) return json({ error: "Stripe: " + (d.error?.message || r.status) }, 500);
    return json({ url: d.url });
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 500);
  }
});
