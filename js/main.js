document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-current-year]').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation');
        document.body.classList.add('menu-open');
        nav.querySelector('a')?.focus();
      }
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const backToTopButton = document.querySelector('#back-to-top-btn');
  if (backToTopButton) {
    const updateButton = () => backToTopButton.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
