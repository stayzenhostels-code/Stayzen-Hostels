/* Mobile menu + placeholder form handler */
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }
  document.querySelectorAll('form[data-placeholder-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = f.querySelector('.form-status');
      if (s) { s.textContent = 'Thank you! Our team will call you shortly.'; s.classList.add('is-visible'); }
      f.reset();
    });
  });
})();
