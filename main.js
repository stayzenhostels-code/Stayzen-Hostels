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



/* STAYZEN Hostel Hub Accordion + Photo Lightbox */
(function() {
  var hubCard = document.getElementById('stayzen-hostel-hub');
  var triggerBtn = document.getElementById('stayzen-trigger-btn');
  if (hubCard && triggerBtn) {
    triggerBtn.addEventListener('click', function() {
      var isOpen = hubCard.classList.toggle('is-open');
      triggerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var label = triggerBtn.querySelector('.hub-btn-label');
      if (label) {
        label.textContent = isOpen ? 'Hide Details ▴' : 'Click to View Photos, Pricing & Details ▾';
      }
    });

    if (window.location.hash === '#stayzen-hostel-hub') {
      hubCard.classList.add('is-open');
      triggerBtn.setAttribute('aria-expanded', 'true');
      var label = triggerBtn.querySelector('.hub-btn-label');
      if (label) label.textContent = 'Hide Details ▴';
    }
  }

  var photoItems = document.querySelectorAll('.stayzen-photo-item');
  var lightbox = document.getElementById('stayzen-lightbox');
  var lbImg = document.getElementById('stayzen-lb-img');
  var lbCaption = document.getElementById('stayzen-lb-caption');
  var lbCounter = document.getElementById('stayzen-lb-counter');
  var lbClose = document.getElementById('stayzen-lb-close');
  var lbPrev = document.getElementById('stayzen-lb-prev');
  var lbNext = document.getElementById('stayzen-lb-next');
  var lbZoom = document.getElementById('stayzen-lb-zoom');

  if (!lightbox || photoItems.length === 0) return;

  var gallery = [];
  photoItems.forEach(function(item, idx) {
    var img = item.querySelector('img');
    var caption = item.getAttribute('data-caption') || (img ? img.alt : '');
    var src = item.getAttribute('data-full') || (img ? img.src : '');
    gallery.push({ src: src, caption: caption });
    item.addEventListener('click', function() {
      openLightbox(idx);
    });
  });

  var currentIndex = 0;
  var isZoomed = false;

  function openLightbox(idx) {
    currentIndex = idx;
    isZoomed = false;
    updateLightbox();
    lightbox.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-visible');
    if (lbImg) lbImg.classList.remove('is-zoomed');
    isZoomed = false;
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    var item = gallery[currentIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbCaption.textContent = item.caption;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + gallery.length;
    lbImg.classList.remove('is-zoomed');
    isZoomed = false;
    if (lbZoom) lbZoom.textContent = '🔍 Zoom';
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % gallery.length;
    updateLightbox();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    updateLightbox();
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    lbImg.classList.toggle('is-zoomed', isZoomed);
    if (lbZoom) lbZoom.textContent = isZoomed ? '🔍 Reset' : '🔍 Zoom';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', nextPhoto);
  if (lbPrev) lbPrev.addEventListener('click', prevPhoto);
  if (lbZoom) lbZoom.addEventListener('click', toggleZoom);
  if (lbImg) lbImg.addEventListener('dblclick', toggleZoom);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('stayzen-lightbox__stage')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('is-visible')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });
})();
