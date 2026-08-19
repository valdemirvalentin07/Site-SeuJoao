// =========================================
// Navbar interactions
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  // Shadow on scroll
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Mobile menu toggle
  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  };

  const openMenu = () => {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close mobile menu after clicking a link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
      navLinks.forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  // Close mobile menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // =========================================
  // Reveal-on-scroll (for sections below the hero;
  // the hero itself animates in on load via .hero-in, see style.css)
  // =========================================
  const revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // =========================================
  // Footer — ano atual automático
  // =========================================
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // =========================================
  // Aviso de termos e privacidade
  // Aparece a cada visita (não fica salvo entre sessões)
  // =========================================
  const consentBanner = document.getElementById('consentBanner');
  const consentAcceptBtn = document.getElementById('consentAcceptBtn');

  if (consentBanner && consentAcceptBtn) {
    window.setTimeout(() => {
      consentBanner.classList.add('is-visible');
    }, 600);

    consentAcceptBtn.addEventListener('click', () => {
      consentBanner.classList.remove('is-visible');
    });
  }
});