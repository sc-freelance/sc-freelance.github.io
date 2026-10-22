// Small enhancements. The page works fully without this file.
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Light/dark toggle (follows the phone's setting until tapped) ----
  var toggle = document.querySelector('.theme-toggle');
  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Footer year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Copy email button ----
  var copyBtn = document.querySelector('.copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.dataset.copy;
      var label = copyBtn.querySelector('.copy-label');
      function done(ok) {
        label.textContent = ok ? 'Copied' : text;
        copyBtn.classList.toggle('copied', ok);
        setTimeout(function () { label.textContent = 'Copy email'; copyBtn.classList.remove('copied'); }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  }

  // ---- Fade sections in as they scroll into view ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Top bar border, side rail and active nav link ----
  var bar = document.querySelector('.topbar');
  var rail = document.querySelector('.rail');
  var hero = document.querySelector('.hero');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  // ---- Curved timeline line drawn through each dot ----
  var tl = document.querySelector('.timeline');
  var track = tl && tl.querySelector('.tl-track');
  var draw = tl && tl.querySelector('.tl-draw');
  var pathLen = 0;

  function buildLine() {
    if (!tl) return;
    var box = tl.getBoundingClientRect();
    var pts = Array.prototype.map.call(tl.querySelectorAll('.dot'), function (d) {
      var r = d.getBoundingClientRect();
      return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
    });
    if (!pts.length) return;
    var wide = box.width >= 600;
    var start = [pts[0][0], pts[0][1] - 1];
    var last = pts[pts.length - 1];
    var end = wide ? [last[0] - box.width * 0.18, last[1] + 160] : [last[0], box.height + 20];
    var all = [start].concat(pts, [end]);
    var d = 'M' + all[0][0] + ' ' + all[0][1];
    for (var i = 1; i < all.length; i++) {
      var a = all[i - 1], b = all[i];
      var bend = wide ? (i % 2 ? 1 : -1) * Math.min(90, box.width * 0.08) : 0;
      var midY = (a[1] + b[1]) / 2;
      d += ' C' + (a[0] + bend) + ' ' + midY + ', ' + (b[0] - bend) + ' ' + midY + ', ' + b[0] + ' ' + b[1];
    }
    track.setAttribute('d', d);
    draw.setAttribute('d', d);
    pathLen = draw.getTotalLength();
    draw.style.strokeDasharray = pathLen;
    updateLine();
  }

  function updateLine() {
    if (!tl || !pathLen) return;
    if (reduceMotion) { draw.style.strokeDashoffset = 0; return; }
    var r = tl.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * 0.75 - r.top) / r.height;
    p = Math.max(0, Math.min(1, p));
    draw.style.strokeDashoffset = pathLen * (1 - p);
  }

  function onScroll() {
    var sy = window.scrollY;
    bar.classList.toggle('scrolled', sy > 8);
    if (rail) rail.classList.toggle('show', sy > hero.offsetHeight * 0.6);
    var current = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
    updateLine();
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { onScroll(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', buildLine);
  window.addEventListener('load', buildLine);
  buildLine();
  onScroll();
})();
