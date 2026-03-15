/* Atelier — main.js */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ── Scroll-reveal for spreads ── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealIO.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Link active state ── */
  var sections = ['home', 'work', 'about', 'contact'].map(function (id) {
    return document.getElementById(id);
  });
  var navLinks = document.querySelectorAll('.nav-link[data-section]');

  function setActive(idx) {
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-section') === (sections[idx] && sections[idx].id));
    });
  }

  if ('IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = sections.indexOf(e.target);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach(function (s) { if (s) sectionObs.observe(s); });
  }

  /* ── Nav frosted glass: border visibility on scroll ── */
  var nav = document.getElementById('nav');
  function updateNavBorder() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = 'rgba(196, 185, 174, 0.5)';
    } else {
      nav.style.borderBottomColor = 'rgba(196, 185, 174, 0.35)';
    }
  }
  window.addEventListener('scroll', updateNavBorder, { passive: true });
  updateNavBorder();

  /* ── Brush-wipe: ensure reduced-motion fallback shows text ── */
  if (prefersReduced) {
    document.querySelectorAll('.hero-name-line').forEach(function (el) {
      el.style.transform = 'none';
      el.style.opacity   = '1';
    });
  }

})();
