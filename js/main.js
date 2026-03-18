/* ─── PORTFOLIO — main.js ─── */
/* Navigation, hero carousel, accordion, scroll animations, active nav */

(function () {
  'use strict';

  /* ── Sticky Nav Background on Scroll ── */
  var nav = document.querySelector('.nav');
  if (nav) {
    function updateNav() {
      if (window.scrollY > 20) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile Hamburger Menu ── */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('nav__mobile--open');
      menuToggle.classList.toggle('menu-toggle--active');
    });

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
      var hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      var hash = href.substring(hashIndex);
      var target = document.querySelector(hash);
      if (!target) return;

      var beforeHash = href.substring(0, hashIndex);
      if (beforeHash && !beforeHash.endsWith(window.location.pathname)) return;

      e.preventDefault();
      var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Hero Carousel ── */
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  var currentSlide = 0;
  var slideInterval;

  function goToSlide(index) {
    slides.forEach(function (s) { s.classList.remove('hero__slide--active'); });
    dots.forEach(function (d) { d.classList.remove('hero__dot--active'); });
    currentSlide = index;
    if (slides[currentSlide]) slides[currentSlide].classList.add('hero__slide--active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('hero__dot--active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(slideInterval);
        goToSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

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
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  /* ── Active Nav Highlighting on Scroll ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    var navH = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;

    function updateActiveNav() {
      var scrollPos = window.pageYOffset + navH + 100;

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
