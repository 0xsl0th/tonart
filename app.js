(() => {
  const spanish = {
    skip: "Ir al contenido",
    navServices: "Servicios",
    navApproach: "Enfoque",
    navStudio: "Estudio",
    navAbout: "Nosotros",
    navContact: "Hablemos",
    heroEyebrow: "Un estudio de audio independiente y online",
    heroTitle1: "Tu música,",
    heroTitle2: "en foco.",
    heroServiceLine: "MEZCLA  /  MASTERIZACIÓN  /  PRODUCCIÓN MUSICAL",
    heroLede: "El oído de un productor, herramientas analógicas precisas y el espacio para que tu música suene a sí misma, con todo su potencial.",
    heroCta: "Cuéntanos tu proyecto",
    heroSecondary: "Explora los servicios",
    heroBottomLeft: "Hecho para artistas. Abierto a todos los géneros.",
    approachKicker: "NUESTRO ENFOQUE",
    approachTitle: "Otro par de oídos.<br /><em>Una perspectiva más clara.</em>",
    approachText: "Trabajamos a partir de la intención de cada obra, sin imponer una idea previa de cómo debería sonar. Tonart combina la mirada de un productor activo con un estudio preparado para tomar decisiones cuidadosas.",
    genreNote: "Con raíces en la música electrónica.<br />Abierto a todo.",
    servicesKicker: "QUÉ HACEMOS",
    servicesSide: "DE LA PRIMERA IDEA AL MÁSTER FINAL",
    servicesTitle: "El trabajo adecuado<br /><em>para tu música.</em>",
    mixTitle: "Mezcla",
    mixText: "Damos a cada elemento su lugar. Trabajamos el balance, el movimiento, el espacio y el impacto para que la emoción de tu producción se escuche con claridad.",
    masterTitle: "Masterización",
    masterText: "La última perspectiva antes del lanzamiento. Refinamos el tono, la dinámica y la cohesión con un flujo de trabajo digital y analógico. Trabajamos con estéreo y con stems.",
    productionTitle: "Producción musical",
    productionText: "¿Necesitas avanzar con una idea? Podemos ayudarte con el arreglo, la selección de sonidos y los detalles que convierten un boceto prometedor en una pieza terminada.",
    studioKicker: "EL ESTUDIO",
    studioTitle: "Herramientas reales.<br /><em>Decisiones con intención.</em>",
    studioText: "Nuestro estudio híbrido nos permite pasar del detalle digital al carácter del hardware analógico. La cadena ofrece opciones, no una fórmula: cada tema recibe el tratamiento que necesita.",
    studioFootnote: "Los equipos están al servicio de la música. Primero, la escucha.",
    processKicker: "CÓMO EMPEZAMOS",
    processSide: "UNA CONVERSACIÓN ANTES DE LA CADENA",
    processTitle: "Empezamos por la música.<br /><em>Encontramos juntos el rumbo.</em>",
    step1Title: "Cuéntanos tu visión",
    step1Text: "Comparte tu tema, en qué punto está y qué te gustaría lograr. Las referencias y las notas iniciales son bienvenidas.",
    step2Title: "Elegimos el trabajo adecuado",
    step2Text: "Primero escuchamos. Después conversamos sobre si conviene mezclar, masterizar, apoyar la producción o combinar servicios.",
    step3Title: "Damos forma al resultado",
    step3Text: "Trabajamos para que el sonido acompañe a la canción y mantenga tu intención artística en el centro.",
    aboutKicker: "LAS PERSONAS",
    aboutTitle: "Sonido hecho por artistas.<br /><em>Creado para conectar.</em>",
    aboutText: "Murlek es productor y DJ de Buenos Aires, con raíces en la música electrónica creada con hardware. En Tonart aporta esa perspectiva musical a la mezcla, la masterización y la producción, trabajando en un estudio dedicado con equipos analógicos.",
    aboutLink: "Conoce el trabajo de Murlek",
    contactKicker: "TU PRÓXIMO TEMA",
    contactTitle: "Hagamos que suene<br /><em>como tú quieres.</em>",
    contactText: "Cuéntanos sobre tu música, en qué etapa estás y qué tipo de ayuda buscas. A partir de ahí, lo vemos juntos.",
    contactCta: "Escríbele a Murlek en Instagram",
    contactNote: "Por ahora, recibimos consultas de proyectos a través del Instagram de Murlek.",
    footerTagline: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL",
    footerBottom: "Sonido independiente, sin fronteras.",
    backTop: "VOLVER ARRIBA ↑",
  };

  const textNodes = [...document.querySelectorAll("[data-i18n]")];
  const htmlNodes = [...document.querySelectorAll("[data-i18n-html]")];
  const originalCopy = new Map(
    [...textNodes, ...htmlNodes].map((element) => [element, element.innerHTML])
  );
  const languageButton = document.getElementById("language-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  const year = document.getElementById("year");
  const description = document.querySelector('meta[name="description"]');
  const englishDescription = description?.content;
  const englishTitle = document.title;
  const storageKey = "tonart-language";

  function closeMenu() {
    nav?.classList.remove("is-open");
    menuButton?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", language === "es" ? "Abrir menú" : "Open menu");
  }

  function setLanguage(language) {
    const isSpanish = language === "es";
    document.documentElement.lang = isSpanish ? "es" : "en";

    for (const element of textNodes) {
      const translation = spanish[element.dataset.i18n];
      if (!isSpanish || translation === undefined) {
        element.innerHTML = originalCopy.get(element);
      } else if (element.querySelector("br")) {
        // This one line of copy has a deliberate line break in the markup.
        element.innerHTML = translation;
      } else if (element.querySelector('[aria-hidden="true"]')) {
        // Keep the decorative arrow beside the translated button label.
        const firstText = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (firstText) firstText.textContent = `${translation} `;
      } else {
        element.textContent = translation;
      }
    }

    for (const element of htmlNodes) {
      element.innerHTML = isSpanish
        ? spanish[element.dataset.i18nHtml] ?? originalCopy.get(element)
        : originalCopy.get(element);
    }

    if (languageButton) {
      languageButton.textContent = isSpanish ? "EN" : "ES";
      languageButton.setAttribute("aria-label", isSpanish ? "Switch to English" : "Cambiar a español");
    }
    if (menuButton) {
      menuButton.setAttribute(
        "aria-label",
        menuButton.getAttribute("aria-expanded") === "true"
          ? isSpanish ? "Cerrar menú" : "Close menu"
          : isSpanish ? "Abrir menú" : "Open menu"
      );
    }
    nav?.setAttribute("aria-label", isSpanish ? "Navegación principal" : "Primary navigation");

    document.title = isSpanish ? "Tonart — Mezcla, Masterización y Producción Musical" : englishTitle;
    if (description) {
      description.content = isSpanish
        ? "Tonart es un estudio online de mezcla, masterización y producción musical. Escucha atenta, herramientas analógicas y espacio para todos los géneros."
        : englishDescription;
    }
  }

  let language = "en";
  try {
    language = localStorage.getItem(storageKey) === "es" ? "es" : "en";
  } catch {
    // The site works even when browser storage is unavailable.
  }
  setLanguage(language);

  languageButton?.addEventListener("click", () => {
    language = language === "en" ? "es" : "en";
    setLanguage(language);
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Keep the selection for this page view.
    }
  });

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open") ?? false;
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? language === "es" ? "Cerrar menú" : "Close menu"
        : language === "es" ? "Abrir menú" : "Open menu"
    );
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!nav?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  window.addEventListener("resize", closeMenu);

  if (year) year.textContent = String(new Date().getFullYear());
})();
