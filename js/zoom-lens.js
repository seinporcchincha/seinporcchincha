jQuery(function ($) {

  $('.zoomable').each(function () {
    const img = this;
    const wrapper = img.closest('.zoom-wrapper');
    if (!wrapper) return;

    // Crear la lupa
    const lens = document.createElement('div');
    lens.className = 'zoom-lens';
    wrapper.appendChild(lens);

    // Imagen fuente (HD o misma)
    const zoomURL = img.getAttribute('data-zoom') || img.src;
    lens.style.backgroundImage = `url("${zoomURL}")`;

    // Precarga HD
    const zoomImage = new Image();
    zoomImage.src = zoomURL;

    let naturalW = 0;
    let naturalH = 0;
    let hdReady = false;

    zoomImage.onload = function () {
      naturalW = zoomImage.naturalWidth;
      naturalH = zoomImage.naturalHeight;
      hdReady = true;
    };

    function showLens() {
      lens.classList.add('is-active');
    }

    function hideLens() {
      lens.classList.remove('is-active');
    }

    function moveLens(rawEv) {
      const ev = rawEv.touches ? rawEv.touches[0] : rawEv;
      const imgRect = img.getBoundingClientRect();

      // Posición del cursor dentro de la imagen visible
      let posX = ev.clientX - imgRect.left;
      let posY = ev.clientY - imgRect.top;

      // Si el cursor sale del área, ocultar
      if (posX < 0 || posY < 0 || posX > imgRect.width || posY > imgRect.height) {
        hideLens();
        return;
      }

      showLens();

      // Tamaño del lente
      const lensW = lens.offsetWidth || 1;
      const lensH = lens.offsetHeight || 1;

      // Posición física del lente (permitimos media salida)
      let leftPx = posX - lensW / 2;
      let topPx  = posY - lensH / 2;

      const minLeft = -lensW / 2;
      const maxLeft = imgRect.width - lensW / 2;
      const minTop  = -lensH / 2;
      const maxTop  = imgRect.height - lensH / 2;

      leftPx = Math.max(minLeft, Math.min(leftPx, maxLeft));
      topPx  = Math.max(minTop,  Math.min(topPx,  maxTop));

      lens.style.left = leftPx + 'px';
      lens.style.top  = topPx  + 'px';

      // ============================
      // ZOOM REDUCIDO 30 %
      // ============================

      const baseW = hdReady ? naturalW : imgRect.width;
      const baseH = hdReady ? naturalH : imgRect.height;

      // Escala real
      const scaleX = baseW / imgRect.width;
      const scaleY = baseH / imgRect.height;

      const realX = posX * scaleX;
      const realY = posY * scaleY;

      // ↓↓↓ Control del nivel de zoom ↓↓↓
      const ZOOM_FACTOR = 0.7; // reducción del 30 %
      // ↑↑↑ Puedes subirlo o bajarlo si lo deseas ↑↑↑

      const renderW = baseW * ZOOM_FACTOR;
      const renderH = baseH * ZOOM_FACTOR;

      const scaledX = realX * ZOOM_FACTOR;
      const scaledY = realY * ZOOM_FACTOR;

      const bgX = scaledX - lensW / 2;
      const bgY = scaledY - lensH / 2;

      lens.style.backgroundSize = renderW + 'px ' + renderH + 'px';
      lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }

    // Precalentamiento para evitar retraso
    lens.style.left = '0px';
    lens.style.top = '0px';
    showLens();
    void lens.offsetWidth;
    hideLens();

    // Eventos
    $(wrapper).on('mousemove', moveLens);
    $(wrapper).on('mouseleave', hideLens);
    $(wrapper).on('touchstart', e => moveLens(e.originalEvent));
    $(wrapper).on('touchmove',  e => moveLens(e.originalEvent));
    $(wrapper).on('touchend touchcancel', hideLens);
  });

});
