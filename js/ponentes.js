

/* =========================================================
   PONENTES — Interacción dinámica con jQuery
   - Al hacer clic en un ponente, muestra su información a la derecha
   - Se marca el ponente activo con un borde de color
   - Carga inicial automática (primer ponente)
   ========================================================= */

jQuery(function ($) {
  // --- Datos de los ponentes ---
  const PONENTES = [
    { id: 1, nombre: "Ing. Ana María Trelles Ponce", especialidad: "Gerente de la Asociación Peruana de Porcicultura", bio: "La Ing. Ana María Trelles Ponce es Ingeniera Estadística egresada de la Universidad Nacional Agraria La Molina, con estudios de Maestría en Ingeniería de Sistemas por la Universidad Nacional de Ingeniería; actualmente se desempeña como Gerente General de la Asociación Peruana de Porcicultores, cargo que ejerce desde 1987, liderando estrategias de desarrollo, comercialización y sostenibilidad del sector porcino nacional; anteriormente fue especialista en la Dirección de Productos Pecuarios del Ministerio de Agricultura, participando en proyectos de almacenamiento y comercialización agropecuaria; es además fundadora y editora de PorcNoticias, revista virtual semanal de referencia en el sector porcicultor, con más de setecientas ediciones publicadas.", foto: "assets/img/anatrelles.jpg" },
    { id: 3, nombre: "Dra. Massiel Uribe Luján", especialidad: "", bio: "La Médico Veterinaria Zootecnista Massiel Andrea Uribe Luján posee experiencia en producción, sanidad animal y asesoramiento técnico en diversas regiones del país; ha trabajado en control de calidad e inocuidad en Corina Alimentos, brindado asesorías veterinarias acreditadas ante SENASA y ocupado cargos en Huertos del Sur y la Corporación de Granjas del Perú; su formación en la Universidad Nacional San Luis Gonzaga de Ica y la Universidad Católica de Santa María respalda su compromiso con la mejora de los sistemas pecuarios y la salud pública veterinaria.", foto: "assets/img/uribelujan.png" },
    { id: 4, nombre: "Ing. Stefan Edgar Cárdenas Cabello", especialidad: "Gerente general de Nutriquali", bio: "El Ing. Zootecnista Stefan Edgar Cárdenas Cabello es egresado de la Universidad Nacional del Centro del Perú con especialización en Nutrición Animal; cuenta con más de tres décadas de experiencia en el sector pecuario, liderando procesos de producción, administración y desarrollo de productos en empresas de alcance nacional. Desde 1993 se desempeña como Gerente General de Nutri Quality, donde dirige proyectos de innovación en alimentación animal, asesoría técnica y gestión comercial; anteriormente ocupó cargos de Administrador en Pecuaria Chillón S.A. y Jefe de Producción en Granja Torre Blanca Nicolini. Su trayectoria combina sólidos conocimientos en nutrición y manejo animal con habilidades en consultoría empresarial y dirección estratégica.", foto: "assets/img/cardenascabello.jpeg" },
    { id: 5, nombre: "Dr. Manolo Fernández Díaz", especialidad: "CEO de Laboratorios FARVET", bio: "El Dr. Manolo Fernández Díaz es Médico Veterinario egresado de la Universidad Nacional San Luis Gonzaga de Ica y posee una Maestría en Ciencias, Microbiología e Inmunología por la Universidad Peruana Cayetano Heredia; con más de cuatro décadas de experiencia como CEO de FARVET SAC, lidera la producción e innovación en vacunas y proteínas recombinantes orientadas al sector pecuario; su trayectoria científica y empresarial se respalda en un sólido dominio de áreas como biotecnología, biología molecular, microbiología e inmunología aplicada, contribuyendo al desarrollo tecnológico y sanitario del país.", foto: "assets/img/manolofernandez.jpg" },
    { id: 6, nombre: "MVZ. Guadalupe Edgar Beltrán Rosas", especialidad: "", bio: "El Médico Veterinario Zootecnista Guadalupe Edgar Beltrán Rosas cuenta con más de dos décadas de experiencia en el sector porcino, desempeñándose en áreas de asesoría técnica, producción y nutrición animal en reconocidas empresas de México y Latinoamérica. Ha ocupado cargos como Asesor Técnico en Porcinos en CAMPI Grupo Bachoco, Médico Veterinario en Granjas Avícolas Rocer, y Asesor Comercial en Grupo Dipeq, además de colaborar con MSD Salud Animal y actualmente ejercer como Technical Director in Swine en EBIOS Nutrition. Es egresado de la Universidad Autónoma Metropolitana Unidad Xochimilco y cuenta con formación complementaria en gestión empresarial porcina en L’Escola EFA Quintanes (España). Autor de artículos científicos y ponente internacional, ha participado en eventos como SEINPORC y Mundo Pork, abordando temas de bienestar animal, manejo reproductivo y reducción de antibióticos, consolidando su perfil como referente en salud, nutrición y sostenibilidad porcina.", foto: "assets/img/beltranrosas.jpg" },
    { id: 7, nombre: "Mag. Carlos Félix Cano Guardia", especialidad: "Médico Veterinario", bio: "Médico Veterinario y docente universitario en la Universidad Nacional San Luis Gonzaga de Ica, con grado de Magíster en Ciencias Veterinarias. Posee amplia experiencia en docencia, investigación y extensión universitaria, orientada al mejoramiento de la producción y sanidad animal. Se especializa en la comercialización y consumo de carne de cerdo, con enfoque en la calidad sanitaria, inocuidad alimentaria y sostenibilidad de los sistemas productivos. Su labor combina la enseñanza académica con la aplicación práctica de conocimientos científicos que contribuyen al desarrollo del sector pecuario y a la seguridad alimentaria del país.", foto: "assets/img/canoguardia.jpg" },
    { id: 8, nombre: "MVZ. Jesus Antonio Avalos Talla", especialidad: "Médico Veterinario Zootecnista Jesús", bio: "El Médico Veterinario Zootecnista Jesús Antonio Ávalos Talla posee amplia experiencia en el sector porcino, especializado en sanidad, nutrición y gestión técnica; actualmente es Gerente de la Unidad Porcina en PharTec SAC, habiendo ocupado cargos en HIPRA, San Fernando e ICC; es egresado de la Universidad Nacional San Luis Gonzaga de Ica y cursa un MBA en Administración y Gestión de Empresas en la Universidad Autónoma del Perú; destaca por su liderazgo en estrategia comercial, desarrollo técnico y gestión de equipos en la industria porcina.", foto: "assets/img/avalostalla.jpeg" },
    { id: 9, nombre: "Leonardo Trucchia", especialidad: "Productor porcino y fabricante de chacinados (Argentina)", bio: "Experiencia en industrialización artesanal y gestión de valor agregado.", foto: "assets/img/leonadoturcchia.jpg" },
    { id: 10, nombre: "Ing. Massiel García", especialidad: "", bio: "Gerente de Calpec", foto: "assets/img/garciamasiel.jpg" },
    { id: 12, nombre: "Dra. Milagros Deza", especialidad: "", bio: "", foto: "assets/img/dezamilagros.jpg" },
    { id: 13, nombre: "Mg. Oscar Calle Benavides", especialidad: "IESTP Catalina Buendía Pecho - Ica", bio: "", foto: "assets/img/callebenavides.jpg" },
    { id: 14, nombre: "Ing. Francisco Tenorio E.", especialidad: "Mundo Pork", bio: "", foto: "assets/img/tenoriofranciso.jpg" },
    { id: 15, nombre: "Dra. Fabianna Mengoni ", especialidad: "", bio: "", foto: "assets/img/fabiannamengoni.jpeg" },
    { id: 16, nombre: "Med. Jose Blass", especialidad: "", bio: "", foto: "assets/img/joseblas.jpg" },
    { id: 17, nombre: "Ana Lucia Villafranca Flores", especialidad: "", bio: "Bachiller en Medicina Veterinaria y Zootecnia, y en Marketing y Gestión Comercial. Estratega de Marketing y Comunicación Digital en la industria de producción animal. Community Manager en 333 Latinoamérica, líder de estrategias de comunicación en el Departamento de Eficiencia y Productividad, además de coordinar proyectos para las divisiones México, Academy y Latinoamérica. Combina su formación veterinaria y de marketing para impulsar la innovación, la eficiencia y la conexión entre ciencia y comunicación en el sector porcino.", foto: "assets/img/villafrancaflores.jpg" },
   ];

  // --- Cache de elementos del DOM ---
  const $grid            = $("#speakers-circles");
  const $photo           = $("#detail-photo");
  const $name            = $("#detail-name");
  const $spec            = $("#detail-specialty");
  const $bio             = $("#detail-bio");
  const $detailBlock     = $("#speakers-detail");

  // --- Generar tarjetas dinámicamente ---
  $grid.empty();
  PONENTES.forEach((p) => {
    const cardHtml = `
      <div class="speaker-circle"
           data-id="${p.id}"
           tabindex="0"
           role="button"
           aria-label="${p.nombre}"
           aria-pressed="false">
        <img src="${p.foto}" alt="${p.nombre}">
        <div class="speaker-info">
          <h4>${p.nombre}</h4>
          <p>${p.especialidad || ""}</p>
        </div>
      </div>`;
    $grid.append(cardHtml);
  });

  // --- Función: mostrar detalle en el panel derecho / inferior ---
  function showDetail(id) {
    const p = PONENTES.find(x => x.id === id);
    if (!p) return;

    // Actualizar contenido del panel
    $photo.attr({
      src: p.foto,
      alt: p.nombre
    });
    $name.text(p.nombre || "");          // nombre grande
    $spec.text(p.especialidad || "");    // especialidad bajo el nombre
    $bio.text(p.bio || "");              // descripción bio

    // Estado visual activo en la tarjeta seleccionada
    $(".speaker-circle")
      .removeClass("active")
      .attr("aria-pressed", "false");

    $(`.speaker-circle[data-id='${id}']`)
      .addClass("active")
      .attr("aria-pressed", "true");

    // --- NUEVO: scroll automático SOLO en pantallas chicas ---
    // usamos el mismo corte que tu CSS (<=1024px => layout vertical)
    const isMobileLayout = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobileLayout) {
      $detailBlock[0].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  // --- Eventos click + teclado (Enter / Space) ---
  $grid.on("click", ".speaker-circle", function () {
    const id = parseInt($(this).data("id"), 10);
    showDetail(id);
  });

  $grid.on("keydown", ".speaker-circle", function (e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      const id = parseInt($(this).data("id"), 10);
      showDetail(id);
    }
  });

  // --- Cargar primer ponente de inicio ---
  showDetail(1);
});
