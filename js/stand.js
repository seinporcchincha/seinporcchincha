// =====================================================================
// DATOS DE LOS STANDS
// - Puedes editar empresa, tipo, desc, contacto y logo por cada stand.
// - Si un stand está libre, puedes poner empresa: "DISPONIBLE", etc.
// - El campo "logo" es opcional. Si no lo pones, el panel oculta la imagen.
// =====================================================================

const STAND_DATA = {
  S1: {
    empresa: "CALPEC",
    tipo: "PATROCINADOR ",
    desc: "CALPEC PORCICULTURA PERÚ",
    contacto: "923989465",
    logo: "assets/logos/calpec.jpg" // ejemplo sin logo
  },
  S2: {
    empresa: "COAGROVET",
    tipo: "PATROCINADOR ",
    desc: "LABORATORIO VETERINARIO.",
    contacto: "923989465",
    logo: "assets/logos/coagrovet.png"
  },
  S3: {
    empresa: "NUTRI QUALITY ",
    tipo: "PATROCINADOR ",
    desc: "PRODUCCIÓN DE ALIMENTO BALANCEADO PARA CERDOS, AVES Y OTRAS.",
    contacto: "923989465",
    logo: "assets/logos/nutriquality.jpg"
  },
  S4: {
    empresa: "-",
    tipo: "-",
    desc: "-",
    contacto: "—",
    logo: ""
  },
  S5: {
    empresa: "CORINA ALIMENTOS",
    tipo: "PATROCINADOR",
    desc: "ALIMENTOS BALANCEADOS PARA AVES, CERDOS, CUY.",
    contacto: "923989465",
    logo: "assets/logos/corina.jpg"
  },
  S6: {
    empresa: "EL COMEDERO",
    tipo: "PATROCINADOR",
    desc: "EMPRESA DE ALIMENTOS",
    contacto: "923989465",
    logo: "assets/logos/comedero.png"
  },
  S7: {
    empresa: "-",
    tipo: "-",
    desc: "-",
    contacto: "—",
    logo: ""
  },
  S8: {
    empresa: "-",
    tipo: "-",
    desc: "-",
    contacto: "—",
    logo: ""
  },
  S9: {
    empresa: "Animal Pharm",
    tipo: "Patrocinador",
    desc: "ESPECIALISTAS EN SOLUCIONES INTEGRALES PARA LA INDUSTRIA PECUARIA",
    contacto: "923989465",
    logo: "assets/logos/apharm.png" // <-- pon la ruta real del logo o déjalo ""
  },
  S10: {
    empresa: "ALIMENCORP",
    tipo: "PATROCINADOR ",
    desc: "ESPECIALISTAS EN NUTRICIÓN ANIMAL ALIMENCORP.",
    contacto: "923989465",
    logo: "assets/logos/alimencorp.jpg"
  },
  S11: {
    empresa: "FARVET",
    tipo: "PATROCINADOR",
    desc: "SOLUCIÓN CIENTÍFICA PARA LA SALUD ANIMAL..",
    contacto: "923989465",
    logo: "assets/logos/farvet.jpeg"
    
  },
  S12: {
    empresa: "-",
    tipo: "-",
    desc: "-",
    contacto: "—",
    logo: ""
  },
  S13: {
    empresa: "-",
    tipo: "-",
    desc: "-",
    contacto: "—",
    logo: ""
  }
};


// =====================================================================
// REFERENCIAS A LOS ELEMENTOS DEL PANEL DERECHO
// =====================================================================

const detailStand     = document.getElementById('detail-stand');
const detailLogo      = document.getElementById('detail-logo');    // <img>
const detailEmpresa   = document.getElementById('detail-empresa');
const detailTipo      = document.getElementById('detail-tipo');
const detailDesc      = document.getElementById('detail-desc');
const detailContacto  = document.getElementById('detail-contacto');

// vamos a guardar cuál stand está activo para poder resaltar el botón
let activeStand = null;


// =====================================================================
// FUNCIÓN: ACTUALIZA PANEL DERECHO
// =====================================================================

function updateDetail(standId) {
  const data = STAND_DATA[standId] || null;

  // título grande (S10, S11, S12, etc.)
  detailStand.textContent = standId || '—';

  // texto info
  detailEmpresa.textContent  = data?.empresa  || '—';
  detailTipo.textContent     = data?.tipo     || '—';
  detailDesc.textContent     = data?.desc     || '—';
  detailContacto.textContent = data?.contacto || '—';

  // logo
  if (data && data.logo) {
    detailLogo.src = data.logo;
    detailLogo.style.display = "block";
  } else {
    // si no hay logo, ocultamos el <img> para no dejar hueco
    detailLogo.style.display = "none";
    detailLogo.removeAttribute("src");
  }
}


// =====================================================================
// FUNCIÓN: MARCAR VISUALMENTE EL BOTÓN ACTIVO
// =====================================================================

function setActiveStandButton(standId) {
  // quitar clase is-active de todos
  document.querySelectorAll('.stand-btn').forEach(btn => {
    btn.classList.remove('is-active');
  });

  // poner clase en el stand actual (si existe)
  if (standId) {
    const btn = document.querySelector(`.stand-btn[data-stand="${standId}"]`);
    if (btn) {
      btn.classList.add('is-active');
    }
  }
}


// =====================================================================
// HANDLER DE CLICK EN CADA STAND
// =====================================================================

function handleStandClick(e) {
  const clicked = e.currentTarget; // el botón <button ...>
  const standId = clicked.getAttribute('data-stand');

  activeStand = standId;

  // actualizamos panel
  updateDetail(standId);

  // resaltamos botón
  setActiveStandButton(standId);
}


// =====================================================================
// INICIALIZACIÓN
// =====================================================================

function initExpoMap() {
  // 1. agregar listeners a todos los stands
  document.querySelectorAll('.stand-btn').forEach(btn => {
    btn.addEventListener('click', handleStandClick);
  });

  // 2. seleccionar uno por defecto al cargar, si quieres
  //    por ejemplo S12 porque está cerca al auditorio
  const defaultStand = 'S12';
  activeStand = defaultStand;
  updateDetail(defaultStand);
  setActiveStandButton(defaultStand);
}

// correr cuando el DOM ya está listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExpoMap);
} else {
  initExpoMap();
}
