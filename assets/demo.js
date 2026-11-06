/* Demo clips play only while on screen, and never for reduced motion (the poster stays, with controls). */
(function () {
  "use strict";
  var vids = Array.prototype.slice.call(document.querySelectorAll("video.demo"));
  if (!vids.length) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) { vids.forEach(function (v) { v.controls = true; }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { var v = e.target; if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () { v.controls = true; }); } else v.pause(); });
  }, { threshold: 0.35 });
  vids.forEach(function (v) { io.observe(v); });
})();
