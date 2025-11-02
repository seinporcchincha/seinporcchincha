/* =========================================================
   INSPIRADOR – Interacciones ligeras (sin librerías)
   - Parallax de blobs e imagen
   - Reveal on scroll
   - Scroll suave a anclas (#form-inscripcion, etc.)
   ========================================================= */

(function () {
  const root = document.documentElement;
  const section = document.querySelector('#inspira');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utils ---------- */
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  /* ---------- Parallax ---------- */
  const blobA = section.querySelector('.inspo__blob--a');
  const blobB = section.querySelector('.inspo__blob--b');
  const heroImg = section.querySelector('.inspo__img');

  let mouseX = 0, mouseY = 0;
  let mx = 0, my = 0; // suavizado

  function onPointerMove(e) {
    const rect = section.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 .. 0.5
    mouseY = (e.clientY - rect.top)  / rect.height - 0.5;
  }

  function parallaxTick() {
    // interpolación para suavizar
    mx = lerp(mx, mouseX, 0.08);
    my = lerp(my, mouseY, 0.08);

    const txA = clamp(mx * 30, -30, 30);
    const tyA = clamp(my * 30, -30, 30);
    const txB = clamp(-mx * 40, -40, 40);
    const tyB = clamp(-my * 35, -35, 35);
    const txImg = clamp(mx * 10, -10, 10);
    const tyImg = clamp(my * 10, -10, 10);

    if (blobA) blobA.style.transform  = `translate(${txA}px, ${tyA}px)`;
    if (blobB) blobB.style.transform  = `translate(${txB}px, ${tyB}px)`;
    if (heroImg) heroImg.style.transform = `translate(${txImg}px, ${tyImg}px)`;

    requestAnimationFrame(parallaxTick);
  }

  if (!prefersReduced) {
    section.addEventListener('pointermove', onPointerMove, {passive:true});
    requestAnimationFrame(parallaxTick);
  }

  /* ---------- Reveal on scroll ---------- */
  const revealables = [
    ...section.querySelectorAll('.inspo__header, .inspo__bullets li, .inspo__stats .stat, .inspo__actions, .inspo__media')
  ];

  // estilos iniciales (no tocan tu CSS)
  revealables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity .7s ease ${i * 40}ms, transform .7s ease ${i * 40}ms`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        io.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealables.forEach(el => io.observe(el));

  /* ---------- Scroll suave a anclas ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length <= 1) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    // opcional: enfocar para accesibilidad
    if (target.tabIndex === -1 || typeof target.tabIndex === 'undefined') {
      target.setAttribute('tabindex', '-1');
    }
    setTimeout(() => target.focus({preventScroll:true}), 550);
  });

  /* ---------- Hint: activar fuente si quieres (opcional) ----------
     En tu <head> puedes precargar Poppins para que coincida con el CSS:
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
  ------------------------------------------------------------------ */
})();
