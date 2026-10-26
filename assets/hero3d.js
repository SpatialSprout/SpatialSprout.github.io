/* Hero: a small open pop-up book with math models standing on its pages. */
(function () {
  "use strict";
  var canvas = document.getElementById("hero3d");
  if (!canvas) return;
  var stage = canvas.parentElement;
  function fail() { stage.classList.add("no3d"); }
  if (!window.THREE) return fail();
  var THREE = window.THREE, renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch (e) { return fail(); }
  if (!renderer.getContext()) return fail();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if ("outputEncoding" in renderer) renderer.outputEncoding = THREE.sRGBEncoding;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x274f52, 0.85));
  var sun = new THREE.DirectionalLight(0xffffff, 0.75);
  sun.position.set(-4, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  var sc = sun.shadow.camera; sc.left = -6; sc.right = 6; sc.top = 6; sc.bottom = -6; sc.near = 1; sc.far = 30;
  sun.shadow.radius = 4; sun.shadow.bias = -0.0008;
  scene.add(sun);

  var INK = 0x1b2236;
  function mat(c) { return new THREE.MeshLambertMaterial({ color: c }); }
  function mesh(geo, color, parent, edges) {
    var m = new THREE.Mesh(geo, mat(color));
    m.castShadow = true; m.receiveShadow = true;
    if (edges !== false) {
      var l = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.55 }));
      m.add(l);
    }
    (parent || scene).add(m);
    return m;
  }

  /* the book */
  var book = new THREE.Group(); scene.add(book);
  var W = 3.1, D = 4.1;
  var cover = mesh(new THREE.BoxGeometry(W * 2 + 0.25, 0.12, D + 0.25), 0x2f6e73, book);
  cover.position.y = 0.06;
  [-1, 1].forEach(function (s) {
    var pages = mesh(new THREE.BoxGeometry(W, 0.22, D), 0xfbf8f0, book);
    pages.position.set(s * (W / 2 + 0.02), 0.23, 0);
    pages.rotation.z = -s * 0.035;
    for (var i = 1; i < 4; i++) {
      var line = new THREE.Mesh(new THREE.BoxGeometry(W * 0.62, 0.005, 0.05), mat(0xd6ddd9));
      line.position.set(s * (W / 2) - (s > 0 ? 0 : 0), 0.345, -D / 2 + 0.55 + i * 0.22);
      if (s < 0) book.add(line);
    }
  });
  var spine = mesh(new THREE.CylinderGeometry(0.07, 0.07, D, 12), 0x24575b, book, false);
  spine.rotation.x = Math.PI / 2; spine.position.y = 0.33;

  var PAGE_Y = 0.36, floaters = [];
  function float(o, amp, ph) { o.userData.y0 = o.position.y; o.userData.amp = amp; o.userData.ph = ph; floaters.push(o); return o; }

  /* right page: place-value blocks 1 hundred, 3 tens, 4 ones (134) */
  var pv = new THREE.Group(); pv.position.set(1.55, PAGE_Y, 0.1); book.add(pv);
  var u = 0.15, BLUE = 0x2f7de1, LBLUE = 0x6ea8f5;
  var flat = mesh(new THREE.BoxGeometry(u * 10, u, u * 10), LBLUE, pv); flat.position.set(-0.55, u / 2, -0.3);
  for (var r = 0; r < 3; r++) { var rod = mesh(new THREE.BoxGeometry(u, u, u * 10), BLUE, pv); rod.position.set(0.45 + r * (u + 0.05), u / 2, -0.3); }
  for (var k = 0; k < 4; k++) { var c1 = mesh(new THREE.BoxGeometry(u, u, u), 0xffcf3f, pv); c1.position.set(0.45 + (k % 2) * (u + 0.05), u / 2 + Math.floor(k / 2) * u, 0.7); }
  float(pv, 0.06, 0);

  /* left page: a cake cut in fourths, one piece lifted */
  var cake = new THREE.Group(); cake.position.set(-1.45, PAGE_Y, 0.55); book.add(cake);
  var cols = [0xff8cb0, 0xff8cb0, 0xff8cb0, 0xffe1a8];
  for (var q = 0; q < 4; q++) {
    var shape = new THREE.Shape(); shape.moveTo(0, 0);
    shape.absarc(0, 0, 0.78, q * Math.PI / 2 + 0.03, (q + 1) * Math.PI / 2 - 0.03, false); shape.lineTo(0, 0);
    var g = new THREE.ExtrudeGeometry(shape, { depth: 0.36, bevelEnabled: false, curveSegments: 18 });
    g.rotateX(-Math.PI / 2);
    var w = mesh(g, cols[q], cake);
    if (q === 3) { w.position.set(0.18, 0.55, 0.18); w.userData.lift = true; float(w, 0.1, 1.2); }
  }
  var plate = mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.04, 40), 0xffffff, cake); plate.position.y = -0.02;

  /* left page, back: a little bar graph */
  var bars = new THREE.Group(); bars.position.set(-1.5, PAGE_Y, -1.05); book.add(bars);
  [0.55, 0.95, 0.7].forEach(function (h, i) {
    var b = mesh(new THREE.BoxGeometry(0.32, h, 0.32), [0xf08a24, 0xffb347, 0xf08a24][i], bars);
    b.position.set(-0.5 + i * 0.5, h / 2, 0); b.userData.h = h; b.userData.i = i;
  });

  /* floating shapes above the spread */
  var star = new THREE.Shape();
  for (var p = 0; p < 10; p++) { var rr = p % 2 ? 0.13 : 0.3, a = Math.PI / 2 + p * Math.PI / 5; if (p) star.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); else star.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  var starM = mesh(new THREE.ExtrudeGeometry(star, { depth: 0.1, bevelEnabled: false }), 0xffcf3f, scene);
  starM.castShadow = false; starM.position.set(2.7, 2.4, -1.2); float(starM, 0.15, 2.1);
  var cone = mesh(new THREE.ConeGeometry(0.28, 0.6, 24), 0x16a36f, scene); cone.castShadow = false; cone.position.set(-2.9, 2.0, -0.9); float(cone, 0.14, 0.7);
  var cube = mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), 0x8b5cf6, scene); cube.castShadow = false; cube.position.set(0.15, 2.6, -1.7); float(cube, 0.12, 3.3);

  /* ground shadow catcher */
  var ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.28 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  book.rotation.y = -0.18;

  var target = new THREE.Vector3(0, 0.8, 0), px = 0, py = 0, tx = 0, ty = 0;
  function frame() {
    var w = stage.clientWidth || 1, h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    var dist = w / h < 1.3 ? 13.5 : 11.5;
    camera.position.set(Math.sin(px * 0.25) * dist * 0.35, dist * 0.62 + py * 0.6, dist * 0.78);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
  }
  stage.addEventListener("pointermove", function (e) {
    var r = stage.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  stage.addEventListener("pointerleave", function () { tx = 0; ty = 0; });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var visible = true, t0 = performance.now();
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !reduce) loop(); }).observe(stage);
  if ("ResizeObserver" in window) new ResizeObserver(function () { frame(); renderer.render(scene, camera); }).observe(stage);
  else window.addEventListener("resize", function () { frame(); renderer.render(scene, camera); });

  var running = false;
  function loop() {
    if (running) return; running = true;
    requestAnimationFrame(function step(now) {
      if (!visible) { running = false; return; }
      var t = (now - t0) / 1000;
      px += (tx - px) * 0.05; py += (ty - py) * 0.05;
      floaters.forEach(function (o) { o.position.y = o.userData.y0 + Math.sin(t * 1.3 + o.userData.ph) * o.userData.amp; });
      starM.rotation.y = t * 0.8; cube.rotation.y = t * 0.6; cube.rotation.x = t * 0.3; cone.rotation.y = t * 0.5;
      bars.children.forEach(function (b) { var s = 0.85 + 0.15 * Math.sin(t * 1.1 + b.userData.i * 1.4); b.scale.y = s; b.position.y = b.userData.h * s / 2; });
      book.rotation.y = -0.18 + Math.sin(t * 0.25) * 0.08;
      frame(); renderer.render(scene, camera);
      requestAnimationFrame(step);
    });
  }
  frame(); renderer.render(scene, camera);
  if (!reduce) loop();
})();
