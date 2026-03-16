/* ─── PORTFOLIO — main.js ─── */
/* Mobile menu, smooth scroll, accordion, scroll-fade, active nav */

(function () {
  'use strict';

  /* ── Mobile Hamburger Menu ── */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('nav__mobile--open');
      // Toggle hamburger icon to X
      menuToggle.classList.toggle('menu-toggle--active');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('nav__mobile--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('menu-toggle--active');
      });
    });
  }

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      // Only handle same-page anchors
      var hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      var hash = href.substring(hashIndex);
      var target = document.querySelector(hash);
      if (!target) return;

      // If it's a link like ../index.html#projects, let the browser navigate
      var beforeHash = href.substring(0, hashIndex);
      if (beforeHash && !beforeHash.endsWith(window.location.pathname)) return;

      e.preventDefault();
      var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Accordion (Delivery OS) ── */
  document.querySelectorAll('.accordion__header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = this.parentElement;
      var content = item.querySelector('.accordion__content');
      var isOpen = item.classList.contains('accordion--open');

      // Close all others
      document.querySelectorAll('.accordion__item.accordion--open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('accordion--open');
          openItem.querySelector('.accordion__content').style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('accordion--open');
        content.style.maxHeight = null;
      } else {
        item.classList.add('accordion--open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ── Scroll-Triggered Fade-In ── */
  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  /* ── Active Nav Highlighting on Scroll ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;

    function updateActiveNav() {
      var scrollPos = window.pageYOffset + navHeight + 100;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var bottom = top + section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(function (link) {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + id ||
                link.getAttribute('href').endsWith('#' + id)) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }
})();
