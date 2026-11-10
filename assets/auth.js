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
    document.querySelectorAll("[data-auth-out]").forEach(function (o) {
      o.hidden = !session;
      if (!o.__wired) { o.__wired = 1; o.addEventListener("click", function (e) { e.preventDefault(); sb.auth.signOut().then(function () { location.reload(); }); }); }
    });
  }
  sb.auth.getSession().then(function (r) { paint(r.data.session); });
  sb.auth.onAuthStateChange(function (_e, session) { paint(session); });
})();

/* Buy buttons on the library cards (live Stripe checkout). */
(function () {
  var FN = "https://mjtdwumwnpkzogbhvukg.supabase.co/functions/v1/create-checkout";
  var KEY = "sb_publishable_YlpgiQC1v5JFBQbB5-I6NA_9K0fklN3";
  var freeBooks = {};
  (window.CATALOG && window.CATALOG.books || []).forEach(function (b) { if (b.free) freeBooks[b.slug] = 1; });
  function buy(slug, el) {
    el.textContent = "Opening checkout…";
    fetch(FN, { method: "POST", headers: { "content-type": "application/json", apikey: KEY, authorization: "Bearer " + KEY }, body: JSON.stringify({ slug: slug }) })
      .then(function (r) { return r.text().then(function (t) { var d = {}; try { d = JSON.parse(t); } catch (e) {} if (d.url) { location.href = d.url; return; } throw new Error("error " + r.status + ": " + (d.error || d.message || d.msg || t).toString().slice(0, 120)); }); })
      .catch(function (e) { el.textContent = el.dataset.label || "Buy"; alert("Checkout could not open (" + String(e && e.message || e).slice(0, 160) + ")."); });
  }
  function add() {
    document.querySelectorAll("a.book.live").forEach(function (a) {
      if (a.querySelector(".buy")) return;
      var m = a.getAttribute("href").match(/books\/([^/]+)\//); if (!m) return;
      if (freeBooks[m[1]]) return; // free book: no buy button
      var b = document.createElement("span"); b.className = "buy"; b.setAttribute("role", "button"); b.tabIndex = 0; var price = /^(kindergarten|grade-[123]-)/.test(m[1]) ? "$14.99" : "$19.99"; b.textContent = "Buy for " + price; b.dataset.label = b.textContent;
      b.style.cssText = "display:inline-block;margin-top:.5rem;padding:.35rem .8rem;border-radius:999px;background:#1b2a41;color:#fff;font-weight:600;font-size:.9rem";
      var go = function (e) { e.preventDefault(); e.stopPropagation(); buy(m[1], b); };
      b.addEventListener("click", go); b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") go(e); });
      a.appendChild(b);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add); else add();
  setTimeout(add, 800);
})();
