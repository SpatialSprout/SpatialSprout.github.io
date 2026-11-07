/* SpatialSprout buyer accounts (Supabase Auth).
   The URL and publishable key are public by design; secret keys live only in Supabase. */
(function () {
  var URL = "https://mjtdwumwnpkzogbhvukg.supabase.co";
  var KEY = "sb_publishable_YlpgiQC1v5JFBQbB5-I6NA_9K0fklN3";
  if (!window.supabase || !window.supabase.createClient) return;
  var sb = window.supabase.createClient(URL, KEY, { auth: { persistSession: true, detectSessionInUrl: true } });
  window.SS_AUTH = sb;
  /* top bar: "Log in" becomes "My books" when signed in */
  function paint(session) {
    document.querySelectorAll("[data-auth-link]").forEach(function (a) {
      if (session) { a.textContent = "My books"; a.href = "account.html"; }
      else { a.textContent = "Log in"; a.href = "login.html"; }
    });
  }
  sb.auth.getSession().then(function (r) { paint(r.data.session); });
  sb.auth.onAuthStateChange(function (_e, session) { paint(session); });
})();

/* Test-mode Buy buttons: shown only when the page is opened with ?buy=test (Stripe sandbox, no real money).
   Remove the test gate at launch, once live Stripe prices are in place. */
(function () {
  var on = false;
  try { if (/[?&]buy=test\b/.test(location.search)) sessionStorage.setItem("ssBuyTest", "1"); on = sessionStorage.getItem("ssBuyTest") === "1"; } catch (e) { on = /[?&]buy=test\b/.test(location.search); }
  if (!on) return;
  var FN = "https://mjtdwumwnpkzogbhvukg.supabase.co/functions/v1/create-checkout";
  var KEY = "sb_publishable_YlpgiQC1v5JFBQbB5-I6NA_9K0fklN3";
  function buy(slug, el) {
    el.textContent = "Opening checkout…";
    fetch(FN, { method: "POST", headers: { "content-type": "application/json", apikey: KEY, authorization: "Bearer " + KEY }, body: JSON.stringify({ slug: slug }) })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.url) location.href = d.url; else throw new Error((d && d.error) || "no url"); })
      .catch(function () { el.textContent = "Checkout failed, try again"; });
  }
  function add() {
    document.querySelectorAll("a.book.live").forEach(function (a) {
      if (a.querySelector(".buy")) return;
      var m = a.getAttribute("href").match(/books\/([^/]+)\//); if (!m) return;
      var b = document.createElement("span"); b.className = "buy"; b.setAttribute("role", "button"); b.tabIndex = 0; b.textContent = "Buy (test)";
      b.style.cssText = "display:inline-block;margin-top:.5rem;padding:.35rem .8rem;border-radius:999px;background:#1b2a41;color:#fff;font-weight:600;font-size:.9rem";
      var go = function (e) { e.preventDefault(); e.stopPropagation(); buy(m[1], b); };
      b.addEventListener("click", go); b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") go(e); });
      a.appendChild(b);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add); else add();
  setTimeout(add, 800);
})();
