// Light/dark toggle. The page follows the phone's setting until the visitor taps the toggle.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');

  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Keep the footer year current
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
