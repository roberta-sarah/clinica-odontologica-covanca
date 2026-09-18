/* =========================================================
   CLÍNICA ODONTOLÓGICA COVANCA — SCRIPT
   1. Menu mobile (hamburguer)
   2. Scroll suave
   3. Header com sombra ao rolar
   4. Animações de entrada (IntersectionObserver)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. MENU MOBILE ---------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('overlay');

  const openMenu = () => {
    nav.classList.add('is-open');
    overlay.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
  });

  /* 2. SCROLL SUAVE ---------------------------------------- */
  const header = document.getElementById('header');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      if (nav.classList.contains('is-open')) closeMenu();

      const offset = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset + 1;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* 3. HEADER COM SOMBRA AO ROLAR -------------------------- */
  const toggleHeaderShadow = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });

  /* 4. ANIMAÇÕES DE ENTRADA --------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.section__head, .card, .highlight, .team__card, .clinic__content, .clinic__visual, .dentist__content, .dentist__media, .contact__info, .contact__map, .instagram__inner'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
});
