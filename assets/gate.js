/* Book lock: a book opens only for a signed-in buyer of that book.
   Note: GitHub Pages serves plain files, so this is a soft lock (it stops normal visitors, not a determined one). */
(function () {
  var URL = "https://mjtdwumwnpkzogbhvukg.supabase.co", KEY = "sb_publishable_YlpgiQC1v5JFBQbB5-I6NA_9K0fklN3";
  var m = location.pathname.match(/\/books\/([^/]+)\//); if (!m) return;
  var slug = m[1].replace(/-classic$/, "");
  var price = /^(kindergarten|grade-[123]-)/.test(slug) ? "$14.99" : "$19.99";
  var css = "#ssGate{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:#f4efe6;font:16px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#1b2a41}" +
    "#ssGate .card{max-width:26rem;width:100%;background:#fff;border:2px solid #1b2a41;border-radius:18px;padding:28px 24px;text-align:center;box-shadow:0 6px 0 #1b2a41}" +
    "#ssGate h1{font-size:1.45rem;margin:.2rem 0 .6rem}#ssGate p{margin:.4rem 0 1rem}" +
    "#ssGate button,#ssGate a.b{display:block;width:100%;min-height:52px;margin:.6rem 0 0;border:0;border-radius:14px;font:600 1.05rem system-ui,sans-serif;cursor:pointer;text-decoration:none;line-height:52px}" +
    "#ssGate .buy{background:#f5c518;color:#1b2a41}#ssGate a.b{background:#1b2a41;color:#fff}#ssGate .home{display:inline-block;margin-top:1rem;color:#1b2a41}#ssGate .msg{min-height:1.3em;color:#c92a2a;font-size:.95rem}";
  var st = document.createElement("style"); st.textContent = css; document.documentElement.appendChild(st);
  var g = document.createElement("div"); g.id = "ssGate"; g.setAttribute("role", "dialog"); g.setAttribute("aria-modal", "true");
  g.innerHTML = '<div class="card"><h1>Opening your book…</h1></div>';
  document.documentElement.appendChild(g);
  function locked(msg) {
    var title = (document.title || "").replace(/^The Interactive Classroom:\s*/, "") || slug.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    g.innerHTML = '<div class="card"><h1>' + title.replace(/</g, "&lt;") + '</h1><p>This book is locked. Buy it once to open it on any device, or log in if you already bought it.</p>' +
      '<button class="buy" type="button">Buy for ' + price + '</button>' +
      '<a class="b" href="../../login.html?next=' + encodeURIComponent("books/" + m[1] + "/") + '">Log in</a>' +
      '<p class="msg" role="status">' + (msg || "") + '</p><a class="home" href="../../#library">Back to the library</a></div>';
    var b = g.querySelector(".buy"), out = g.querySelector(".msg");
    b.addEventListener("click", function () {
      b.textContent = "Opening checkout…";
      fetch(URL + "/functions/v1/create-checkout", { method: "POST", headers: { "content-type": "application/json", apikey: KEY, authorization: "Bearer " + KEY }, body: JSON.stringify({ slug: slug }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d && d.url) location.href = d.url; else throw 0; })
        .catch(function () { b.textContent = "Buy for " + price; out.textContent = "Checkout could not open. Please try again."; });
    });
  }
  function open() { g.remove(); st.remove(); }
  function check() {
    if (!window.supabase || !window.supabase.createClient) { locked("We could not check your account. Please refresh the page."); return; }
    var sb = window.supabase.createClient(URL, KEY, { auth: { persistSession: true } });
    sb.auth.getSession().then(function (r) {
      if (!r.data.session) { locked(); return; }
      sb.from("purchases").select("book_slug").eq("book_slug", slug).limit(1).then(function (q) {
        if (q.data && q.data.length) open(); else { locked(q.error ? "We could not check your books. Please refresh." : "Signed in as " + r.data.session.user.email + ". This book is not in your library yet.");
          var lo = document.createElement("button"); lo.type = "button"; lo.textContent = "Log out"; lo.style.cssText = "background:none;color:#1b2a41;text-decoration:underline;min-height:40px;line-height:40px";
          lo.addEventListener("click", function () { sb.auth.signOut().then(function () { location.reload(); }); });
          var lg = g.querySelector("a.b"); if (lg) lg.replaceWith(lo); }
      });
    }).catch(function () { locked("We could not check your account. Please refresh the page."); });
  }
  if (window.supabase) check(); else window.addEventListener("load", check);
})();
