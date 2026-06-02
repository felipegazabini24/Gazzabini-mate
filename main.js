/* ================================================
   GAZZABINI MATES — main.js v20260529
   IIFE clásico, sin módulos, sin imports
   ================================================ */
(function () {
  'use strict';

  /* ── Utilidades ── */
  function safe(fn, name) {
    try { fn(); }
    catch (e) { console.warn('[GazzabiniMates] ' + name + ' falló:', e); }
  }
  function q(sel, ctx)  { return (ctx || document).querySelector(sel); }
  function qa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  var isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── initNav ── */
  function initNav() {
    var nav        = q('#nav');
    var burger     = q('.nav-burger');
    var mobileMenu = q('#nav-mobile');
    if (!nav) return;

    var hasHero = !!q('.hero');

    function updateNav() {
      if (!hasHero) {
        nav.classList.add('is-solid');
        return;
      }
      nav.classList.toggle('is-solid', window.scrollY > 20);
    }
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    if (!burger || !mobileMenu) return;

    function closeMenu() {
      burger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    qa('a', mobileMenu).forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── initReveals ── */
  function initReveals() {
    var els = qa('.reveal');
    if (!els.length) return;

    if (!window.IntersectionObserver) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── initTilt ── */
  function initTilt() {
    if (!isFine) return;
    var MAX = 9;

    qa('[data-tilt]').forEach(function (card) {
      var rect = null;

      card.addEventListener('mouseenter', function () {
        rect = card.getBoundingClientRect();
      });

      card.addEventListener('mousemove', function (e) {
        if (!rect) rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width  - 0.5;
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        var rX = (-y * MAX).toFixed(2);
        var rY = ( x * MAX).toFixed(2);
        var shadow = 8 + Math.abs(y * MAX);
        card.style.transform =
          'perspective(800px) rotateX(' + rX + 'deg) rotateY(' + rY + 'deg) translateZ(4px)';
        card.style.boxShadow =
          '0 ' + shadow.toFixed(0) + 'px ' + (shadow * 3).toFixed(0) + 'px rgba(184,92,58,.22)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform  = '';
        card.style.boxShadow  = '';
        rect = null;
      });
    });
  }

  /* ── initCursor ── */
  function initCursor() {
    if (!isFine) return;

    var dot  = q('.cursor-dot');
    var ring = q('.cursor-ring');
    if (!dot || !ring) return;

    var mX = 0, mY = 0, rX = 0, rY = 0;

    document.addEventListener('mousemove', function (e) {
      mX = e.clientX;
      mY = e.clientY;
      dot.style.left = mX + 'px';
      dot.style.top  = mY + 'px';
    });

    (function animRing() {
      rX += (mX - rX) * 0.13;
      rY += (mY - rY) * 0.13;
      ring.style.left = rX + 'px';
      ring.style.top  = rY + 'px';
      requestAnimationFrame(animRing);
    }());

    qa('a, button, [role="button"], .product-card, .feature-card, .testimonial-card, .contact-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('is-hover'); });
    });

    document.addEventListener('mouseleave', function () {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ── initMarquee ── */
  function initMarquee() {
    qa('.marquee-track').forEach(function (track) {
      /* Si el contenido no está duplicado lo duplicamos para loop perfecto */
      var spans = qa('span', track);
      if (spans.length < 16) {
        track.innerHTML += track.innerHTML;
      }
    });
  }

  /* ── initCountUp ── */
  function initCountUp() {
    var els = qa('[data-count-to]');
    if (!els.length || !window.IntersectionObserver) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);

        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-count-to'), 10);
        var text   = el.textContent;
        var suffix = text.replace(/[0-9]/g, '').trim();
        var start  = performance.now();
        var dur    = 1500;

        (function step(now) {
          var t = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (t < 1) requestAnimationFrame(step);
        }(start));
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── initFilterTabs ── */
  function initFilterTabs() {
    var tabs  = qa('[data-filter]');
    var cards = qa('[data-category]');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = tab.getAttribute('data-filter');

        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        cards.forEach(function (card) {
          var cat  = card.getAttribute('data-category');
          var show = filter === 'Todos' || cat === filter;
          if (show) {
            card.removeAttribute('hidden');
            setTimeout(function () { card.classList.add('is-visible'); }, 30);
          } else {
            card.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  /* ── Boot ── */
  function boot() {
    safe(initNav,        'initNav');
    safe(initReveals,    'initReveals');
    safe(initTilt,       'initTilt');
    safe(initCursor,     'initCursor');
    safe(initMarquee,    'initMarquee');
    safe(initCountUp,    'initCountUp');
    safe(initFilterTabs, 'initFilterTabs');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}());
