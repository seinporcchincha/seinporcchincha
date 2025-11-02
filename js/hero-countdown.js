/* js/hero-countdown.js */
/* Requiere jQuery 3.x */

// ------- Utilidades -------
const pad2 = n => String(n).padStart(2, "0");

// Diferencia contra un ISO anclado a -05:00 (hora de Lima, Perú)
function diffToTargetUTC(targetISO) {
  const targetUTCms = Date.parse(String(targetISO)); // p.ej. 2025-11-20T13:00:00-05:00
  const nowUTCms    = Date.now();                    // UTC actual
  return Math.max(0, targetUTCms - nowUTCms);
}

// ------- Cuenta regresiva -------
function initCountdown($root) {
  const targetISO = $root.data("target"); // ISO con -05:00
  if (!targetISO) return;

  const $d = $root.find("#cd-days");
  const $h = $root.find("#cd-hours");
  const $m = $root.find("#cd-mins");
  const $s = $root.find("#cd-secs");

  const tick = () => {
    let diff = diffToTargetUTC(targetISO);
    const totalSec = Math.floor(diff / 1000);
    const days  = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins  = Math.floor((totalSec % 3600) / 60);
    const secs  = totalSec % 60;

    $d.text(pad2(days));
    $h.text(pad2(hours));
    $m.text(pad2(mins));
    $s.text(pad2(secs));

    if (diff === 0) $root.attr("aria-label", "El evento ha comenzado");
  };

  tick();
  const id = setInterval(tick, 1000);
  $root.data("intervalId", id);
}

// ------- Rotador de slides -------
function initHeroRotator($hero) {
  const $slides = $hero.find(".sp-slide");
  if ($slides.length < 2) return;

  const $dotsWrapper = $hero.find(".sp-hero__dots");
  let $dots = $dotsWrapper.find(".sp-dot");

  // Si la cantidad de dots no coincide, los creamos:
  if ($dots.length !== $slides.length) {
    $dotsWrapper.empty();
    for (let i = 0; i < $slides.length; i++) {
      const $btn = $("<button/>", {
        class: "sp-dot" + (i === 0 ? " is-active" : ""),
        role: "tab",
        "aria-selected": i === 0 ? "true" : "false",
        text: i + 1
      });
      $dotsWrapper.append($btn);
    }
    $dots = $dotsWrapper.find(".sp-dot");
  }

  const intervalMs = Number($hero.find(".sp-hero__backdrop").data("interval")) || 3600;
  let index = 0;
  let timerId = null;

  function show(i) {
    index = (i + $slides.length) % $slides.length;
    $slides.removeClass("is-active").attr({hidden: true, "aria-hidden": "true"});
    $dots.removeClass("is-active").attr("aria-selected", "false");

    $slides.eq(index).addClass("is-active").attr({hidden: false, "aria-hidden": "false"});
    $dots.eq(index).addClass("is-active").attr("aria-selected", "true");
  }

  function next() { show(index + 1); }
  function start() { if (!timerId) timerId = setInterval(next, intervalMs); }
  function stop()  { if (timerId) { clearInterval(timerId); timerId = null; } }

  $dotsWrapper.on("click", ".sp-dot", function () {
    show($(this).index());
    stop(); start();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  show(0);
  start();
}

jQuery(function ($) {
  $(".sp-countdown").each(function () { initCountdown($(this)); });
  $(".sp-hero").each(function () { initHeroRotator($(this)); });
});
