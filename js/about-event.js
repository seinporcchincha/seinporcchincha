/* =========================================================
   ACERCA DEL EVENTO — Interacciones ligeras (sin librerías)
   - Reveal on scroll (contenido e imagen)
   - Respeta prefers-reduced-motion
   - Scroll suave para anclas internas
   ========================================================= */

(function () {
  const section = document.querySelector('#acerca-evento');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elementos a revelar
  const revealEls = [
    ...section.querySelectorAll(
      '.about-event__eyebrow, .about-event__title, .about-event__intro, .about-event__desc, .about-event__highlights li, .about-event__media'
    ),
  ];

  // Estado inicial (ocultarlos suavemente)
  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    const delay = Math.min(i * 40, 400); // escalonado máximo 400ms
    el.style.transition = prefersReduced
      ? 'none'
      : `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`;
  });

  // IntersectionObserver para revelar
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12,
    }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Scroll suave para anclas como #acerca-evento
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length <= 1) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });

    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }

    setTimeout(() => target.focus({ preventScroll: true }), 400);
  });
})();




