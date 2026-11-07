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
