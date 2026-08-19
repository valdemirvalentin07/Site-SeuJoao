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
  // Aviso de termos e privacidade — gatilho por ação
  // Aparece quando o usuário clica pra falar com o vendedor
  // ou entrar no grupo do WhatsApp (não ao simplesmente entrar no site)
  // =========================================
  const consentModal = document.getElementById('consentModal');
  const consentAcceptBtn = document.getElementById('consentModalAccept');
  const consentCloseEls = document.querySelectorAll('[data-consent-close]');
  const consentLinks = document.querySelectorAll('[data-consent-link]');

  if (consentModal && consentAcceptBtn && consentLinks.length) {
    let pendingLink = null;
    let lastFocusedEl = null;

    const openConsentModal = (link) => {
      pendingLink = link;
      lastFocusedEl = document.activeElement;
      consentModal.classList.add('is-visible');
      consentModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('has-modal-open');
      consentAcceptBtn.focus();
    };

    const closeConsentModal = () => {
      pendingLink = null;
      consentModal.classList.remove('is-visible');
      consentModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-modal-open');
      if (lastFocusedEl) lastFocusedEl.focus();
    };

    consentLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openConsentModal(link);
      });
    });

    consentAcceptBtn.addEventListener('click', () => {
      const href = pendingLink ? pendingLink.getAttribute('href') : null;
      closeConsentModal();
      if (href) window.open(href, '_blank', 'noopener');
    });

    consentCloseEls.forEach((el) => {
      el.addEventListener('click', closeConsentModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && consentModal.classList.contains('is-visible')) {
        closeConsentModal();
      }
    });
  }
});