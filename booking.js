(() => {
  // Add one PayPal Business Payment Link per offer after the merchant account,
  // package scope, and policies are ready. Empty links keep booking requests open.
  const PAYMENT_LINKS = {
    stereo: "", stem: "", mix: "", mixmaster: "",
    "ep-stereo": "", "ep-stem": "", "ep-mixmaster": "",
  };
  const offers = {
    stereo: {
      price: 39,
      en: { name: "Stereo mastering — 1 track", summary: "One stereo master for a track up to 10 minutes, based on your final stereo mix.", timeline: "3–5 business days", revisions: "1 consolidated round", caveat: "If the mix still needs balancing or production work, ask about mixing before paying." },
      es: { name: "Masterización estéreo — 1 tema", summary: "Un máster estéreo para un tema de hasta 10 minutos, a partir de tu mezcla estéreo final.", timeline: "3–5 días hábiles", revisions: "1 ronda de cambios consolidada", caveat: "Si la mezcla aún necesita balance o producción, consulta por mezcla antes de pagar." },
    },
    stem: {
      price: 69,
      en: { name: "Stem mastering — 1 track", summary: "Balance and master up to 4 aligned, grouped stereo stems for a track up to 10 minutes.", timeline: "3–5 business days", revisions: "1 consolidated round", caveat: "Stem mastering is not a full multitrack mix. Ask first if you have more than 4 groups." },
      es: { name: "Masterización por stems — 1 tema", summary: "Balance y máster de hasta 4 stems estéreo agrupados y alineados para un tema de hasta 10 minutos.", timeline: "3–5 días hábiles", revisions: "1 ronda de cambios consolidada", caveat: "La masterización por stems no equivale a una mezcla multitrack. Consulta si tienes más de 4 grupos." },
    },
    mix: {
      price: 129,
      en: { name: "Mixing — 1 track", summary: "A full mix from up to 24 aligned audio tracks, for a song up to 10 minutes.", timeline: "7–10 business days", revisions: "2 consolidated rounds", caveat: "Editing, tuning, new production and extra versions are not included." },
      es: { name: "Mezcla — 1 tema", summary: "Mezcla completa de hasta 24 pistas de audio alineadas, para un tema de hasta 10 minutos.", timeline: "7–10 días hábiles", revisions: "2 rondas de cambios consolidadas", caveat: "No incluye edición, afinación, nueva producción ni versiones adicionales." },
    },
    mixmaster: {
      price: 149,
      en: { name: "Mixing + mastering — 1 track", summary: "A full mix from up to 24 aligned audio tracks, followed by a stereo master, for a song up to 10 minutes.", timeline: "7–10 business days", revisions: "2 consolidated mix rounds + 1 master round", caveat: "Editing, tuning, new production and extra versions are not included." },
      es: { name: "Mezcla + masterización — 1 tema", summary: "Mezcla completa de hasta 24 pistas alineadas y máster estéreo, para un tema de hasta 10 minutos.", timeline: "7–10 días hábiles", revisions: "2 rondas de mezcla + 1 de máster", caveat: "No incluye edición, afinación, nueva producción ni versiones adicionales." },
    },
    "ep-stereo": {
      price: 99,
      en: { name: "3-track EP — stereo mastering", summary: "Stereo mastering for 3 tracks, each up to 10 minutes, from final stereo mixes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "The 3 tracks should be submitted together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 3 temas — masterización estéreo", summary: "Masterización estéreo de 3 temas de hasta 10 minutos cada uno, a partir de mezclas finales.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 3 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
    },
    "ep-stem": {
      price: 179,
      en: { name: "3-track EP — stem mastering", summary: "Stem mastering for 3 tracks, each up to 4 aligned grouped stems and 10 minutes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "The 3 tracks should be submitted together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 3 temas — masterización por stems", summary: "Masterización de 3 temas, cada uno de hasta 4 stems agrupados y alineados y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 3 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
    },
    "ep-mixmaster": {
      price: 399,
      en: { name: "3-track EP — mixing + mastering", summary: "Mixing and mastering for 3 tracks, each up to 24 aligned audio tracks and 10 minutes.", timeline: "Agreed after file review", revisions: "2 mix rounds + 1 master round per track", caveat: "The 3 tracks should be submitted together. Editing, tuning and new production are not included." },
      es: { name: "EP de 3 temas — mezcla + masterización", summary: "Mezcla y masterización de 3 temas, cada uno de hasta 24 pistas alineadas y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "2 rondas de mezcla + 1 de máster por tema", caveat: "Envía los 3 temas juntos. No incluye edición, afinación ni nueva producción." },
    },
  };

  const translations = {
    skip: "Ir al contenido", back: "Volver a precios", eyebrow: "TONART / RESERVA DE PROYECTO",
    title: "Un buen sonido empieza<br /><em>con una buena idea.</em>",
    lede: "Elige una oferta de lanzamiento y revisa lo que incluye. Envíanos tu brief para solicitar una reserva.",
    choose: "ELIGE TU SERVICIO", offerTitle: "Tu oferta", serviceLabel: "SERVICIO",
    timelineLabel: "PRIMERA VERSIÓN", revisionLabel: "RONDAS DE CAMBIOS",
    payButton: "Preparar solicitud de reserva",
    payNote: "PayPal se abre en otra pestaña. Comprueba el vendedor y el importe antes de pagar.",
    payPendingNote: "Estamos preparando el pago en línea. Envíanos tu brief para confirmar el alcance y los detalles de pago.",
    next: "QUÉ SIGUE", stepsTitle: "Envía la música.",
    step1Title: "Envíanos tu brief y los archivos", step1Text: "Copia el brief y escríbele a Murlek por Instagram con un enlace privado de descarga.",
    step2Title: "Confirmamos el alcance y el plazo", step2Text: "Revisamos los archivos y la disponibilidad, y confirmamos si la oferta elegida corresponde.",
    step3Title: "Enviamos los detalles de pago", step3Text: "Tras confirmar la oferta, te enviamos los datos de pago. El plazo comienza al recibir el pago y los archivos utilizables.",
    briefLabel: "COPIA UN BRIEF DEL PROYECTO", copy: "Copiar brief", copied: "Brief copiado. Pégalo en un mensaje a Murlek.", copyFailed: "Selecciona el texto y cópialo manualmente.",
    openInstagram: "Abrir Instagram de Murlek", faqKicker: "ANTES DE RESERVAR", faqTitle: "Algunos detalles<br /><em>útiles.</em>",
    faq1Title: "¿Cuándo empieza el plazo?", faq1Text: "Después de recibir el pago, tu brief y los archivos finales utilizables, y confirmar el alcance. Los días hábiles excluyen fines de semana y feriados. Los plazos indicados son para una primera versión, no para todo el proceso de cambios.",
    faq2Title: "¿Y si mi proyecto supera los límites de la oferta?", faq2Text: "Escríbenos antes de pagar si el tema dura más de 10 minutos, tiene más pistas o stems que los incluidos, o necesita edición, afinación, producción o versiones alternativas.",
    faq3Title: "¿La reserva es instantánea?", faq3Text: "Confirmamos cada proyecto personalmente tras revisar los archivos y la disponibilidad. Si la oferta no corresponde, acordaremos otro alcance antes de cobrar.",
    terms: "Estas son tarifas introductorias. Los cambios incluidos se aplican al material enviado; nuevas grabaciones o cambios importantes de arreglo requieren un nuevo alcance. Tus derechos legales siguen vigentes.",
    policiesKicker: "POLÍTICAS DE PEDIDO", policiesTitle: "Expectativas claras<br /><em>para ambas partes.</em>",
    refundTitle: "Cancelaciones y reintegros", refundText: "Si cancelas antes de que comience el trabajo, o si no podemos aceptar tus archivos dentro del alcance de la oferta, reintegramos el pago completo. Una vez iniciado el trabajo, escríbenos para resolver el problema; cualquier reintegro se evalúa según la ley aplicable y el trabajo ya entregado. Tus derechos legales siguen vigentes.",
    privacyTitle: "Privacidad y tu música", privacyText: "Este sitio guarda tu elección de idioma en el navegador y carga fuentes de Google. Si pagas con PayPal, PayPal procesa el pago; Instagram lleva los mensajes del proyecto; el servicio de archivos que elijas aloja las subidas. Usamos el correo de contacto o de pago, el brief y el audio que envías para trabajar en tu proyecto. No publicamos tu música sin permiso. Puedes pedir que borremos los archivos del proyecto después de la entrega por el mismo canal de contacto.",
    footer: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL", policiesLink: "POLÍTICAS ↑", contact: "CONTACTO ↗",
  };
  const checkoutFlow = {
    en: {
      lede: "Choose a launch offer and review what is included. Pay online, then send us your files and direction so we can confirm the job.",
      payButton: "Continue to PayPal", faqKicker: "BEFORE YOU PAY",
      step1Title: "Pay for the selected offer", step1Text: "Complete the PayPal payment using the button. Keep its transaction ID for your brief.",
      step2Title: "Send us your brief and files", step2Text: "Message Murlek on Instagram with your track title, PayPal transaction ID, a private download link, and references.",
      step3Title: "We confirm the project", step3Text: "We check the payment and files, then confirm the scope and first-preview date. The turnaround starts when everything needed is received.",
      faq3Text: "Payment is immediate; the project is confirmed by a person after we check your files and availability. If we cannot accept it within the stated scope, we will offer an adjusted quote or a full refund before work begins.",
    },
    es: {
      lede: "Elige una oferta de lanzamiento y revisa lo que incluye. Paga en línea y luego envíanos tus archivos y tu dirección artística para confirmar el trabajo.",
      payButton: "Continuar a PayPal", faqKicker: "ANTES DE PAGAR",
      step1Title: "Paga la oferta elegida", step1Text: "Completa el pago en PayPal. Conserva el ID de transacción para incluirlo en tu brief.",
      step2Title: "Envíanos el brief y los archivos", step2Text: "Escríbele a Murlek por Instagram con el título, el ID de transacción, un enlace privado de descarga y referencias.",
      step3Title: "Confirmamos el proyecto", step3Text: "Comprobamos el pago y los archivos y confirmamos el alcance y la fecha de la primera versión. El plazo comienza cuando recibimos todo lo necesario.",
      faq3Text: "El pago es inmediato; confirmamos el proyecto personalmente después de revisar los archivos y la disponibilidad. Si no podemos aceptarlo dentro del alcance anunciado, ofreceremos una cotización nueva o el reintegro completo antes de empezar.",
    },
  };

  const select = document.getElementById("service-select");
  const languageButton = document.getElementById("booking-language");
  const payButton = document.getElementById("pay-button");
  const brief = document.getElementById("brief-template");
  const copyStatus = document.getElementById("copy-status");
  const textNodes = [...document.querySelectorAll("[data-book-i18n]")];
  const htmlNodes = [...document.querySelectorAll("[data-book-i18n-html]")];
  const originals = new Map([...textNodes, ...htmlNodes].map((node) => [node, node.innerHTML]));
  const englishTitle = document.title;
  const englishDescription = document.querySelector('meta[name="description"]')?.content;
  const initialKey = new URLSearchParams(location.search).get("service");
  let selected = Object.hasOwn(offers, initialKey) ? initialKey : "stereo";
  let language = "en";
  let lastGeneratedBrief = "";
  try { language = localStorage.getItem("tonart-language") === "es" ? "es" : "en"; } catch {}
  let briefLanguage = language;

  function checkoutUrlFor(key) {
    const raw = PAYMENT_LINKS[key];
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return url.protocol === "https:" && ["paypal.com", "www.paypal.com"].includes(url.hostname) && url.pathname.startsWith("/ncp/payment/") ? url.href : "";
    } catch { return ""; }
  }

  function briefText() {
    const name = offers[selected][language].name;
    const contactLine = checkoutUrlFor(selected)
      ? (language === "es" ? "Correo usado en PayPal: \nID de transacción PayPal: \n" : "PayPal payment email: \nPayPal transaction ID: \n")
      : (language === "es" ? "Correo de contacto: \n" : "Contact email: \n");
    return language === "es"
      ? `Hola Murlek, quiero reservar un proyecto con Tonart.\n\nServicio: ${name}\n${contactLine}Título del tema / EP: \nEnlace privado de descarga: \nReferencias y dirección sonora: \nOtros detalles: `
      : `Hi Murlek, I'd like to book a project with Tonart.\n\nService: ${name}\n${contactLine}Track / EP title: \nPrivate download link: \nReferences and sonic direction: \nAnything else: `;
  }

  function renderOffer() {
    const offer = offers[selected];
    const copy = offer[language];
    select.innerHTML = Object.entries(offers).map(([key, value]) => `<option value="${key}">${value[language].name} — $${value.price}</option>`).join("");
    select.value = selected;
    document.getElementById("service-price").textContent = `$${offer.price}`;
    document.getElementById("service-summary").textContent = copy.summary;
    document.getElementById("service-timeline").textContent = copy.timeline;
    document.getElementById("service-revisions").textContent = copy.revisions;
    document.getElementById("service-caveat").textContent = copy.caveat;
    const generatedBrief = briefText();
    if (!brief.value || brief.value === lastGeneratedBrief) {
      brief.value = generatedBrief;
      briefLanguage = language;
    } else {
      // Keep an edited brief in its original language while updating the offer.
      const serviceLine = `${briefLanguage === "es" ? "Servicio" : "Service"}: ${offers[selected][briefLanguage].name}`;
      brief.value = /^(Service|Servicio):.*$/m.test(brief.value)
        ? brief.value.replace(/^(Service|Servicio):.*$/m, serviceLine)
        : `${serviceLine}\n${brief.value}`;
    }
    lastGeneratedBrief = generatedBrief;
    copyStatus.textContent = "";
    const checkoutUrl = checkoutUrlFor(selected);
    const flowKeys = Object.keys(checkoutFlow.en);
    for (const key of flowKeys) {
      const node = document.querySelector(`[data-book-i18n="${key}"]`);
      if (node) node.textContent = checkoutUrl
        ? checkoutFlow[language][key]
        : language === "es" ? translations[key] : originals.get(node);
    }
    if (checkoutUrl) {
      payButton.href = checkoutUrl;
      payButton.target = "_blank";
      payButton.rel = "noopener noreferrer";
    } else {
      payButton.href = "#brief-template";
      payButton.removeAttribute("target");
      payButton.removeAttribute("rel");
    }
    document.getElementById("pay-note").hidden = !checkoutUrl;
    document.getElementById("pay-pending").hidden = Boolean(checkoutUrl);
  }

  function renderLanguage() {
    const isSpanish = language === "es";
    document.documentElement.lang = language;
    for (const node of textNodes) node.innerHTML = isSpanish ? translations[node.dataset.bookI18n] ?? originals.get(node) : originals.get(node);
    for (const node of htmlNodes) node.innerHTML = isSpanish ? translations[node.dataset.bookI18nHtml] ?? originals.get(node) : originals.get(node);
    languageButton.textContent = isSpanish ? "EN" : "ES";
    languageButton.setAttribute("aria-label", isSpanish ? "Switch to English" : "Cambiar a español");
    document.title = isSpanish ? "Reserva un proyecto — Tonart" : englishTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = isSpanish ? "Elige un servicio de mezcla o masterización de Tonart y envía los detalles de tu proyecto." : englishDescription;
    renderOffer();
  }

  select.addEventListener("change", () => { selected = select.value; history.replaceState(null, "", `?service=${encodeURIComponent(selected)}`); renderOffer(); });
  languageButton.addEventListener("click", () => {
    language = language === "en" ? "es" : "en";
    try { localStorage.setItem("tonart-language", language); } catch {}
    renderLanguage();
  });
  document.getElementById("copy-brief").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(brief.value);
      copyStatus.textContent = language === "es" ? translations.copied : "Brief copied. Paste it into a message to Murlek.";
    } catch {
      brief.focus(); brief.select();
      copyStatus.textContent = language === "es" ? translations.copyFailed : "Select the text and copy it manually.";
    }
  });
  renderLanguage();
})();
