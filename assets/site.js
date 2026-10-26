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
        return '<a class="book live" href="books/' + esc(b.slug) + '/index.html">' +
          '<span class="pill">Open now</span>' +
          '<span class="ttl">The Interactive Classroom</span>' +
          '<span class="tiles" aria-hidden="true"><span>M</span><span>A</span><span>T</span><span>H</span></span>' +
          '<span class="by">Grade ' + b.grade + ' · by ' + esc(b.author) + '</span>' +
          '<span class="open">Open the book <span aria-hidden="true">→</span></span></a>';
      }
      return '<div class="book" aria-label="Grade ' + b.grade + ' ' + esc(b.subject) + ', coming soon">' +
        '<span class="g">' + b.grade + '</span><span class="s">Grade ' + b.grade + '<br>' + esc(b.subject) + '</span>' +
        '<span class="st">Coming soon</span></div>';
    }).join("");
  }
  var more = $("more");
  if (more && C.moreSubjects.length) more.innerHTML = "Also planned: <b>" + C.moreSubjects.map(esc).join("</b>, <b>") + "</b>.";

  /* Grade 3 lessons by strand */
  var live = C.books.filter(function (b) { return b.status === "live" && b.lessons; })[0];
  var legend = $("legend"), lessons = $("lessons");
  if (live && lessons) {
    var order = Object.keys(C.strands), n = 0;
    if (legend) legend.innerHTML = order.map(function (s) {
      var k = C.strands[s];
      return '<span><i style="background:' + k.color + '">' + k.letter + "</i>" + esc(s) + "</span>";
    }).join("");
    lessons.innerHTML = order.map(function (s) {
      var items = live.lessons.filter(function (l) { return l.s === s; });
      if (!items.length) return "";
      var k = C.strands[s];
      return '<div class="strand"><h3><i style="background:' + k.color + '"></i>' + k.letter + " · " + esc(s) + "</h3><ol>" +
        items.map(function (l) {
          n++;
          return '<li><span class="n">' + n + '</span><span class="lt">' + esc(l.t) + '</span><span class="codes">' +
            l.c.map(function (c) { return "<code>" + esc(c) + "</code>"; }).join("") + "</span></li>";
        }).join("") + "</ol></div>";
    }).join("");
  }

  var y = $("year"); if (y) y.textContent = String(new Date().getFullYear());
})();
