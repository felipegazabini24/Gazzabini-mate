* ================================================
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

  /* ── initLightbox ── */
  function initLightbox() {
    var imgs = qa('.product-img-wrap img');
    if (!imgs.length) return;

    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('aria-hidden', 'true');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Vista de producto');
    lb.innerHTML =
      '<div class="lightbox-backdrop"></div>' +
      '<div class="lightbox-content">' +
        '<img class="lightbox-img" src="" alt="" />' +
        '<button class="lightbox-close" aria-label="Cerrar">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>';
    document.body.appendChild(lb);

    var lbImg      = lb.querySelector('.lightbox-img');
    var lbBackdrop = lb.querySelector('.lightbox-backdrop');
    var lbClose    = lb.querySelector('.lightbox-close');

    function open(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    imgs.forEach(function(img) {
      img.parentElement.style.cursor = 'zoom-in';
      img.parentElement.addEventListener('click', function() {
        open(img.src, img.alt);
      });
    });

    lbClose.addEventListener('click', close);
    lbBackdrop.addEventListener('click', close);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
    });
  }

  /* ── initCart ── */
  function initCart() {
    var WA      = '595973453838';
    var KEY     = 'gm_cart_v1';
    var cart    = [];

    try {
      var raw = localStorage.getItem(KEY);
      if (raw) cart = JSON.parse(raw);
    } catch(e) {}

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch(e) {}
    }

    function parsePrice(str) {
      return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
    }

    function fmtPrice(n) {
      var s = Math.round(n).toString();
      var r = '';
      for (var i = 0; i < s.length; i++) {
        if (i > 0 && (s.length - i) % 3 === 0) r += '.';
        r += s[i];
      }
      return 'Gs. ' + r;
    }

    var overlay = document.createElement('div');
    overlay.className = 'cart-overlay';

    var drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Carrito de compras');
    drawer.innerHTML =
      '<div class="cart-header">' +
        '<h3>Tu carrito</h3>' +
        '<button class="cart-close" aria-label="Cerrar carrito">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="cart-body" id="cart-body"></div>' +
      '<div class="cart-footer" id="cart-footer"></div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    var cartBody   = q('#cart-body');
    var cartFooter = q('#cart-footer');
    var navBtn     = q('#nav-cart');

    function updateBadge() {
      if (!navBtn) return;
      var badge = navBtn.querySelector('.nav-cart-badge');
      if (!badge) return;
      var total = cart.reduce(function(s, i) { return s + i.qty; }, 0);
      badge.textContent = total > 9 ? '9+' : total;
      badge.classList.toggle('is-visible', total > 0);
      navBtn.setAttribute('aria-label', 'Ver carrito (' + total + ' ' + (total === 1 ? 'item' : 'items') + ')');
    }

    function renderCart() {
      updateBadge();
      if (!cartBody || !cartFooter) return;

      if (!cart.length) {
        cartBody.innerHTML =
          '<div class="cart-empty">' +
            '<div class="cart-empty-icon">🧉</div>' +
            '<p>Tu carrito está vacío.<br>Agregá productos del catálogo.</p>' +
          '</div>';
        cartFooter.innerHTML = '';
        return;
      }

      var html = cart.map(function(item, idx) {
        return (
          '<div class="cart-item">' +
            '<div class="cart-item-info">' +
              '<div class="cart-item-name">' + item.name + '</div>' +
              '<div class="cart-item-unit">' + fmtPrice(item.price) + ' c/u</div>' +
              '<div class="cart-item-controls">' +
                '<button class="cart-qty-btn" data-action="dec" data-idx="' + idx + '" aria-label="Restar">−</button>' +
                '<span class="cart-qty-num">' + item.qty + '</span>' +
                '<button class="cart-qty-btn" data-action="inc" data-idx="' + idx + '" aria-label="Sumar">+</button>' +
              '</div>' +
            '</div>' +
            '<div class="cart-item-right">' +
              '<button class="cart-item-remove" data-idx="' + idx + '" aria-label="Quitar">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>' +
              '</button>' +
              '<span class="cart-item-subtotal">' + fmtPrice(item.price * item.qty) + '</span>' +
            '</div>' +
          '</div>'
        );
      }).join('');
      cartBody.innerHTML = html;

      var total = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
      var waIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

      cartFooter.innerHTML =
        '<div class="cart-total-row">' +
          '<span class="cart-total-label">Total</span>' +
          '<span class="cart-total-amount">' + fmtPrice(total) + '</span>' +
        '</div>' +
        '<button class="btn btn-whatsapp cart-send-btn" id="cart-send-btn">' +
          waIcon + ' Enviar pedido por WhatsApp' +
        '</button>' +
        '<button class="cart-clear-btn" id="cart-clear-btn">Vaciar carrito</button>';

      cartBody.querySelectorAll('[data-action]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var idx = parseInt(btn.getAttribute('data-idx'), 10);
          var act = btn.getAttribute('data-action');
          if (act === 'inc') { cart[idx].qty++; }
          else if (act === 'dec') {
            if (cart[idx].qty > 1) { cart[idx].qty--; }
            else { cart.splice(idx, 1); }
          }
          save(); renderCart();
        });
      });

      cartBody.querySelectorAll('.cart-item-remove').forEach(function(btn) {
        btn.addEventListener('click', function() {
          cart.splice(parseInt(btn.getAttribute('data-idx'), 10), 1);
          save(); renderCart();
        });
      });

      var sendBtn = q('#cart-send-btn');
      if (sendBtn) {
        sendBtn.addEventListener('click', function() {
          var lines = cart.map(function(i) {
            return '• ' + i.name + ' x' + i.qty + ' — ' + fmtPrice(i.price * i.qty);
          });
          var msg =
            'Hola! Me interesa hacer este pedido 🧉\n\n' +
            lines.join('\n') +
            '\n\n*Total: ' + fmtPrice(total) + '*\n\n' +
            '\xBFPueden confirmarme disponibilidad y coordinar la entrega?';
          window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
        });
      }

      var clearBtn = q('#cart-clear-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', function() {
          if (confirm('¿Vaciar el carrito?')) { cart = []; save(); renderCart(); }
        });
      }
    }

    function openCart()  {
      renderCart();
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeCart() {
      overlay.classList.remove('is-open');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (navBtn) navBtn.addEventListener('click', openCart);
    overlay.addEventListener('click', closeCart);
    drawer.querySelector('.cart-close').addEventListener('click', closeCart);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
    });

    var CART_SVG =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>';

    qa('.product-foot .btn-whatsapp').forEach(function(link) {
      var card    = link.closest('.product-card');
      if (!card) return;
      var nameEl  = card.querySelector('.product-name') || card.querySelector('h2') || card.querySelector('h3');
      var priceEl = card.querySelector('.product-price');
      if (!nameEl || !priceEl) return;

      var name  = nameEl.textContent.trim();
      var price = parsePrice(priceEl.textContent);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-add-cart';
      btn.setAttribute('aria-label', 'Agregar ' + name + ' al carrito');
      btn.innerHTML = CART_SVG + ' Agregar';

      btn.addEventListener('click', function() {
        var existing = cart.find(function(i) { return i.name === name; });
        if (existing) { existing.qty++; }
        else { cart.push({ name: name, price: price, qty: 1 }); }
        save();
        updateBadge();
        openCart();

        btn.innerHTML = '✓ Agregado';
        btn.style.background = '#2a7a4b';
        setTimeout(function() {
          btn.innerHTML = CART_SVG + ' Agregar';
          btn.style.background = '';
        }, 1400);
      });

      var waSVG = link.querySelector('svg');
      var waBtn = document.createElement('a');
      waBtn.className = 'btn btn-whatsapp btn-wa-icon';
      waBtn.href = link.href;
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
      waBtn.setAttribute('aria-label', 'Pedir ' + name + ' por WhatsApp (1 unidad)');
      waBtn.innerHTML = (waSVG ? waSVG.outerHTML : '') + '<span class="wa-label"> Pedir</span>';

      var group = document.createElement('div');
      group.className = 'product-btn-group';
      group.appendChild(btn);
      group.appendChild(waBtn);

      link.parentNode.replaceChild(group, link);
    });

    updateBadge();
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
    safe(initLightbox,   'initLightbox');
    safe(initCart,       'initCart');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}());
