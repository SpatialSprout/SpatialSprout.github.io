(function () {
  "use strict";
  var C = window.CATALOG || { books: [], strands: {}, moreSubjects: [] };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* mobile menu */
  var btn = $("menuBtn"), nav = $("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.textContent = "Menu"; }
    });
  }

  /* library shelf */
  var shelf = $("shelf");
  if (shelf) {
    shelf.innerHTML = C.books.map(function (b) {
      if (b.status === "live") {
        var bg = b.colors ? ' style="background:linear-gradient(150deg,' + b.colors[0] + ',' + b.colors[1] + ' 55%,' + b.colors[2] + ')"' : '';
        return '<a class="book live" href="books/' + esc(b.slug) + '/index.html"' + bg + '>' +
          '<span class="pill">Open now</span>' +
          '<span class="ttl">Grade ' + b.grade + ' ' + esc(b.subject) + '</span>' +
          '<span class="tiles" aria-hidden="true">' + (b.tiles || ["M", "A", "T", "H"]).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + '</span>' +
          '<span class="by">The Interactive Classroom · by ' + esc(b.author) + '</span>' +
          '<span class="open">Open the book <span aria-hidden="true">→</span></span></a>';
      }
      return '<div class="book" aria-label="Grade ' + b.grade + ' ' + esc(b.subject) + ', coming soon"' + (b.colors ? ' style="border-color:' + b.colors[1] + '55"' : '') + '>' +
        '<span class="g">' + b.grade + '</span><span class="s">Grade ' + b.grade + '<br>' + esc(b.subject) + '</span>' +
        '<span class="st">Coming soon</span></div>';
    }).join("");
  }
  var more = $("more");
  if (more && C.moreSubjects.length) more.innerHTML = "Also planned: <b>" + C.moreSubjects.map(esc).join("</b>, <b>") + "</b>.";

  var lives = C.books.filter(function (b) { return b.status === "live" && b.lessons; });
  var set = function (id, v) { var e = $(id); if (e) e.textContent = v; };
  var nLessons = lives.reduce(function (a, b) { return a + b.lessons.length; }, 0);
  set("fBooks", String(lives.length)); set("fLessons", String(nLessons)); set("fRounds", String(lives.reduce(function (a, b) { return a + b.lessons.length * (b.grade === 2 ? 10 : 5); }, 0)));
  var lib = $("libSub");
  if (lib && lives.length) { var names = lives.map(function (b) { return "Grade " + b.grade + " " + b.subject; });
    var list = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0];
    lib.textContent = list + (names.length > 1 ? " are" : " is") + " open now. More grades and subjects are on the way."; }

  /* lessons of the chosen book, grouped by strand */
  var legend = $("legend"), lessons = $("lessons"), tabs = $("bookTabs");
  function showBook(i) {
    var live = lives[i]; if (!live || !lessons) return;
    var SM = live.strands || C.strands, order = Object.keys(SM), n = 0;
    set("insideEyebrow", "Inside Grade " + live.grade + " " + live.subject);
    set("insideTitle", live.strands ? "Every Grade " + live.grade + " " + live.subject + " unit, page by page." : "Every Grade " + live.grade + " expectation, page by page.");
    if (legend) legend.innerHTML = order.map(function (s) { var k = SM[s]; return '<span><i style="background:' + k.color + '">' + k.letter + "</i>" + esc(s) + "</span>"; }).join("");
    var open = $("insideOpen"); if (open) open.href = "books/" + live.slug + "/index.html";
    if (tabs) Array.prototype.forEach.call(tabs.children, function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); t.classList.toggle("on", k === i); });
    lessons.innerHTML = order.map(function (s) {
      var items = live.lessons.filter(function (l) { return l.s === s; });
      if (!items.length) return "";
      var k = SM[s];
      return '<div class="strand"><h3><i style="background:' + k.color + '"></i>' + k.letter + " · " + esc(s) + "</h3><ol>" +
        items.map(function (l) {
          n++;
          return '<li><span class="n">' + n + '</span><span class="lt">' + esc(l.t) + '</span><span class="codes">' +
            l.c.map(function (c) { return "<code>" + esc(c) + "</code>"; }).join("") + "</span></li>";
        }).join("") + "</ol></div>";
    }).join("");
  }
  if (legend) legend.innerHTML = Object.keys(C.strands).map(function (s) {
    var k = C.strands[s];
    return '<span><i style="background:' + k.color + '">' + k.letter + "</i>" + esc(s) + "</span>";
  }).join("");
  if (tabs) {
    tabs.innerHTML = lives.map(function (b, i) { return '<button type="button" role="tab" data-i="' + i + '">Grade ' + b.grade + " " + esc(b.subject) + "</button>"; }).join("");
    tabs.addEventListener("click", function (e) { var t = e.target.closest("button"); if (t) showBook(+t.getAttribute("data-i")); });
  }
  showBook(lives.length - 1);

  var y = $("year"); if (y) y.textContent = String(new Date().getFullYear());
})();
