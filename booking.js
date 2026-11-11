(() => {
  // Public checkout can be paused here if Tonart needs to stop taking orders.
  const CHECKOUT_ENABLED = true;
  // Public, fixed-price USD PayPal Business Payment Links. Payment and project
  // confirmation remain separate: the studio checks each completed payment.
  const PAYMENT_LINKS = {
    stereo: "https://www.paypal.com/ncp/payment/EQD4VQUARW5SG",
    stem: "https://www.paypal.com/ncp/payment/TJ4SBD24ZEJ3Y",
    mix: "https://www.paypal.com/ncp/payment/TRKHDBP4W8T3U",
    mixmaster: "https://www.paypal.com/ncp/payment/UBF6T8QSMLZQY",
    "ep-stereo": "https://www.paypal.com/ncp/payment/BTQYRJ6LR7TYW",
    "ep-stem": "https://www.paypal.com/ncp/payment/C7XMZW2ZNWJJ2",
    "ep-mixmaster": "https://www.paypal.com/ncp/payment/ZK6CTAJZJ4JQL",
  };
  const offers = {
    stereo: {
      price: 39,
      en: { name: "Stereo mastering — 1 track", summary: "One stereo master for a track up to 10 minutes, based on your final stereo mix.", timeline: "3–5 business days", revisions: "1 consolidated round", caveat: "If the mix still needs balancing or production work, ask about mixing before paying." },
      es: { name: "Masterización estéreo — 1 tema", summary: "Un máster estéreo para un tema de hasta 10 minutos, a partir de tu mezcla estéreo final.", timeline: "3–5 días hábiles", revisions: "1 ronda de cambios consolidada", caveat: "Si la mezcla aún necesita balance o producción, consulta por mezcla antes de pagar." },
      de: { name: "Stereo-Mastering — 1 Track", summary: "Ein Stereo-Master für einen Track bis 10 Minuten auf Basis deines finalen Stereo-Mixes.", timeline: "3–5 Arbeitstage", revisions: "1 gebündelte Korrekturrunde", caveat: "Wenn dein Mix noch Balance- oder Produktionsarbeit braucht, frage vor der Zahlung nach Mixing." },
    },
    stem: {
      price: 69,
      en: { name: "Stem mastering — 1 track", summary: "Balance and master up to 4 aligned, grouped stereo stems for a track up to 10 minutes.", timeline: "3–5 business days", revisions: "1 consolidated round", caveat: "Stem mastering is not a full multitrack mix. Ask first if you have more than 4 groups." },
      es: { name: "Masterización por stems — 1 tema", summary: "Balance y máster de hasta 4 stems estéreo agrupados y alineados para un tema de hasta 10 minutos.", timeline: "3–5 días hábiles", revisions: "1 ronda de cambios consolidada", caveat: "La masterización por stems no equivale a una mezcla multitrack. Consulta si tienes más de 4 grupos." },
      de: { name: "Stem-Mastering — 1 Track", summary: "Abstimmung und Mastering von bis zu 4 gruppierten, zeitlich ausgerichteten Stereo-Stems für einen Track bis 10 Minuten.", timeline: "3–5 Arbeitstage", revisions: "1 gebündelte Korrekturrunde", caveat: "Stem-Mastering ersetzt keinen vollständigen Multitrack-Mix. Bei mehr als 4 Gruppen frage bitte zuerst an." },
    },
    mix: {
      price: 129,
      en: { name: "Mixing — 1 track", summary: "A full mix from up to 24 aligned audio tracks, for a song up to 10 minutes.", timeline: "7–10 business days", revisions: "2 consolidated rounds", caveat: "Editing, tuning, new production and extra versions are not included." },
      es: { name: "Mezcla — 1 tema", summary: "Mezcla completa de hasta 24 pistas de audio alineadas, para un tema de hasta 10 minutos.", timeline: "7–10 días hábiles", revisions: "2 rondas de cambios consolidadas", caveat: "No incluye edición, afinación, nueva producción ni versiones adicionales." },
      de: { name: "Mixing — 1 Track", summary: "Ein vollständiger Mix aus bis zu 24 zeitlich ausgerichteten Audiospuren für einen Track bis 10 Minuten.", timeline: "7–10 Arbeitstage", revisions: "2 gebündelte Korrekturrunden", caveat: "Editing, Tonhöhenkorrektur, zusätzliche Produktion und weitere Versionen sind nicht enthalten." },
    },
    mixmaster: {
      price: 149,
      en: { name: "Mixing + mastering — 1 track", summary: "A full mix from up to 24 aligned audio tracks, followed by a stereo master, for a song up to 10 minutes.", timeline: "7–10 business days", revisions: "2 consolidated mix rounds + 1 master round", caveat: "Editing, tuning, new production and extra versions are not included." },
      es: { name: "Mezcla + masterización — 1 tema", summary: "Mezcla completa de hasta 24 pistas alineadas y máster estéreo, para un tema de hasta 10 minutos.", timeline: "7–10 días hábiles", revisions: "2 rondas de mezcla + 1 de máster", caveat: "No incluye edición, afinación, nueva producción ni versiones adicionales." },
      de: { name: "Mixing + Mastering — 1 Track", summary: "Ein vollständiger Mix aus bis zu 24 zeitlich ausgerichteten Audiospuren mit anschließendem Stereo-Master für einen Track bis 10 Minuten.", timeline: "7–10 Arbeitstage", revisions: "2 gebündelte Mix-Korrekturen + 1 Master-Korrektur", caveat: "Editing, Tonhöhenkorrektur, zusätzliche Produktion und weitere Versionen sind nicht enthalten." },
    },
    "ep-stereo": {
      price: 99,
      en: { name: "3-track EP — stereo mastering", summary: "Stereo mastering for 3 tracks, each up to 10 minutes, from final stereo mixes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "The 3 tracks should be submitted together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 3 temas — masterización estéreo", summary: "Masterización estéreo de 3 temas de hasta 10 minutos cada uno, a partir de mezclas finales.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 3 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
      de: { name: "3-Track-EP — Stereo-Mastering", summary: "Stereo-Mastering für 3 Tracks bis je 10 Minuten auf Basis der finalen Stereo-Mixe.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "1 gebündelte Korrekturrunde pro Track", caveat: "Bitte reiche alle 3 Tracks zusammen ein. Wir bestätigen den Zeitplan der EP vor Arbeitsbeginn." },
    },
    "ep-stem": {
      price: 179,
      en: { name: "3-track EP — stem mastering", summary: "Stem mastering for 3 tracks, each up to 4 aligned grouped stems and 10 minutes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "The 3 tracks should be submitted together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 3 temas — masterización por stems", summary: "Masterización de 3 temas, cada uno de hasta 4 stems agrupados y alineados y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 3 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
      de: { name: "3-Track-EP — Stem-Mastering", summary: "Stem-Mastering für 3 Tracks bis je 10 Minuten und mit jeweils bis zu 4 gruppierten, zeitlich ausgerichteten Stems.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "1 gebündelte Korrekturrunde pro Track", caveat: "Bitte reiche alle 3 Tracks zusammen ein. Wir bestätigen den Zeitplan der EP vor Arbeitsbeginn." },
    },
    "ep-mixmaster": {
      price: 399,
      en: { name: "3-track EP — mixing + mastering", summary: "Mixing and mastering for 3 tracks, each up to 24 aligned audio tracks and 10 minutes.", timeline: "Agreed after file review", revisions: "2 mix rounds + 1 master round per track", caveat: "The 3 tracks should be submitted together. Editing, tuning and new production are not included." },
      es: { name: "EP de 3 temas — mezcla + masterización", summary: "Mezcla y masterización de 3 temas, cada uno de hasta 24 pistas alineadas y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "2 rondas de mezcla + 1 de máster por tema", caveat: "Envía los 3 temas juntos. No incluye edición, afinación ni nueva producción." },
      de: { name: "3-Track-EP — Mixing + Mastering", summary: "Mixing und Mastering für 3 Tracks mit jeweils bis zu 24 zeitlich ausgerichteten Audiospuren und 10 Minuten Länge.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "2 Mix-Korrekturen + 1 Master-Korrektur pro Track", caveat: "Bitte reiche alle 3 Tracks zusammen ein. Editing, Tonhöhenkorrektur und zusätzliche Produktion sind nicht enthalten." },
    },
  };

  const translations = {
    skip: "Ir al contenido", back: "Volver a precios", eyebrow: "TONART / RESERVA DE PROYECTO",
    title: "Un buen sonido empieza<br /><em>con una buena idea.</em>",
    lede: "Elige una oferta de lanzamiento, paga de forma segura con PayPal y luego envíanos tu música y los datos del proyecto.",
    choose: "ELIGE TU SERVICIO", offerTitle: "Tu oferta", serviceLabel: "SERVICIO",
    timelineLabel: "PRIMERA VERSIÓN", revisionLabel: "RONDAS DE CAMBIOS",
    payButton: "Continuar a PayPal",
    payNote: "PayPal se abre en otra pestaña. Comprueba el vendedor y el importe antes de pagar. El pago puede aparecer en otro idioma según tu configuración de PayPal o del navegador.",
    payPendingNote: "El pago en línea no está disponible temporalmente. Contacta con Tonart antes de pagar.",
    handoverPrompt: "¿Ya pagaste? PayPal no nos envía tu música.", handoverButton: "Enviar datos del proyecto", handoverNote: "¿Ya pagaste? Usa este enlace ahora. Puedes volver a la página de entrega más tarde sin pagar otra vez.",
    next: "QUÉ SIGUE", stepsTitle: "Paga. Envía. Confirma.",
    step1Title: "Paga tu servicio", step1Text: "Completa el pago en PayPal de la oferta elegida. Conserva el correo usado para pagar y el ID de transacción, si está disponible.",
    step2Title: "Envía los datos del proyecto", step2Text: "Usa la página de entrega para enviar los datos del tema, el correo del pago y un enlace privado de descarga de los archivos finales.",
    step3Title: "Comprobamos y confirmamos", step3Text: "Vinculamos el pago con tu proyecto, revisamos los archivos y el alcance, y confirmamos la fecha de la primera versión. El plazo comienza al recibir el pago y archivos utilizables.",
    faqKicker: "ANTES DE PAGAR", faqTitle: "Algunos detalles<br /><em>útiles.</em>",
    faq1Title: "¿Cuándo empieza el plazo?", faq1Text: "Después de recibir el pago, tu brief y los archivos finales utilizables, y confirmar el alcance. Los días hábiles excluyen fines de semana y feriados. Los plazos indicados son para una primera versión, no para todo el proceso de cambios.",
    faq2Title: "¿Y si mi proyecto supera los límites de la oferta?", faq2Text: "Escríbenos antes de pagar si el tema dura más de 10 minutos, tiene más pistas o stems que los incluidos, o necesita edición, afinación, producción o versiones alternativas.",
    faq3Title: "¿La reserva es instantánea?", faq3Text: "El pago es inmediato. Confirmamos el proyecto después de verificar el pago, los archivos y la disponibilidad. Si la oferta no corresponde, te propondremos una nueva cotización o el reintegro completo antes de comenzar.",
    faq4Title: "¿Cómo vinculan mi pago con mi música?", faq4Text: "Después de pagar, usa la página de entrega del proyecto. Indica el correo usado en PayPal, el ID de transacción del comprador si está disponible y un enlace privado de descarga de tus archivos. Comprobamos estos datos con el pago antes de confirmar el proyecto.",
    terms: "Estas son tarifas introductorias. Los cambios incluidos se aplican al material enviado; nuevas grabaciones o cambios importantes de arreglo requieren un nuevo alcance. Tus derechos legales siguen vigentes.",
    policiesKicker: "POLÍTICAS DE PEDIDO", policiesTitle: "Expectativas claras<br /><em>para ambas partes.</em>",
    refundTitle: "Cancelaciones y reintegros", refundText: "Si cancelas antes de que comience el trabajo, o si no podemos aceptar tus archivos dentro del alcance de la oferta, reintegramos el pago completo. Una vez iniciado el trabajo, escríbenos para resolver el problema; cualquier reintegro se evalúa según la ley aplicable y el trabajo ya entregado. Tus derechos legales siguen vigentes.",
    privacyTitle: "Privacidad y tu música", privacyText: "Este sitio guarda tu elección de idioma en el navegador y carga fuentes de Google. PayPal procesa los pagos; tu proveedor de correo transmite los datos del proyecto; el servicio de archivos que elijas aloja el audio. Usamos tus datos de contacto y pago, el brief y el audio para trabajar en tu proyecto. No publicamos tu música sin permiso. Puedes pedir por correo que borremos los archivos del proyecto después de la entrega.",
    cancelRequest: "Solicitudes de cancelación o desistimiento",
    footer: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL", policiesLink: "POLÍTICAS ↑", legalLink: "AVISO LEGAL ↗", contact: "CONTACTO ↗",
  };
  const germanTranslations = {
    skip: "Zum Inhalt springen", back: "Zurück zu den Preisen", eyebrow: "TONART / PROJEKT BUCHEN",
    title: "Guter Sound beginnt<br /><em>mit einem guten Briefing.</em>",
    lede: "Wähle ein Einführungsangebot, bezahle sicher über PayPal und sende uns anschließend deine Musik und Projektdaten.",
    choose: "SERVICE WÄHLEN", offerTitle: "Dein Angebot", serviceLabel: "SERVICE",
    timelineLabel: "ERSTE VERSION", revisionLabel: "KORREKTURRUNDEN",
    payButton: "Weiter zu PayPal",
    payNote: "PayPal öffnet sich in einem neuen Tab. Prüfe Anbieter und Gesamtbetrag, bevor du zahlst. Die Zahlungsseite kann je nach PayPal- oder Browsereinstellungen in einer anderen Sprache erscheinen.",
    payPendingNote: "Die Online-Zahlung ist vorübergehend nicht verfügbar. Kontaktiere Tonart bitte vor einer Zahlung.",
    handoverPrompt: "Schon bezahlt? PayPal sendet uns deine Musik nicht.", handoverButton: "Projektdaten senden", handoverNote: "Schon bezahlt? Nutze jetzt diesen Link. Du kannst später zur Übergabeseite zurückkehren, ohne erneut zu bezahlen.",
    next: "SO GEHT ES WEITER", stepsTitle: "Bezahlen. Senden. Bestätigen.",
    step1Title: "Service bezahlen", step1Text: "Bezahle das gewählte Angebot über PayPal. Bewahre die für die Zahlung verwendete E-Mail-Adresse und, falls vorhanden, die Transaktions-ID auf.",
    step2Title: "Projektdaten senden", step2Text: "Sende über die Übergabeseite Trackdaten, die Zahlungs-E-Mail-Adresse und einen privaten Download-Link zu den finalen Dateien.",
    step3Title: "Wir prüfen und bestätigen", step3Text: "Wir ordnen deine Zahlung zu, prüfen Dateien und Leistungsumfang und bestätigen den Termin der ersten Version. Die Bearbeitungszeit beginnt, wenn Zahlung und verwendbare Dateien vorliegen.",
    faqKicker: "VOR DER ZAHLUNG", faqTitle: "Ein paar wichtige<br /><em>Details.</em>",
    faq1Title: "Wann beginnt die Bearbeitungszeit?", faq1Text: "Sobald Zahlung, Briefing und verwendbare finale Dateien eingegangen sind und wir den Leistungsumfang bestätigt haben. Wochenenden und Feiertage zählen nicht als Arbeitstage. Die angegebenen Zeiten gelten für die erste Version, nicht für den gesamten Korrekturprozess.",
    faq2Title: "Was, wenn mein Projekt über den Angebotsumfang hinausgeht?", faq2Text: "Schreibe uns vor der Zahlung, wenn der Track länger als 10 Minuten ist, mehr Spuren oder Stems enthält als im Angebot vorgesehen oder Editing, Tonhöhenkorrektur, Produktion oder alternative Versionen benötigt.",
    faq3Title: "Ist die Buchung sofort bestätigt?", faq3Text: "Die Zahlung erfolgt sofort. Wir bestätigen dein Projekt nach Prüfung der Zahlung, der Dateien und unserer Verfügbarkeit. Falls das Angebot nicht passt, bieten wir vor Arbeitsbeginn ein angepasstes Angebot oder eine vollständige Erstattung an.",
    faq4Title: "Wie ordnet ihr meine Zahlung meiner Musik zu?", faq4Text: "Nutze nach der Zahlung die Projekt-Übergabeseite. Gib die für PayPal verwendete E-Mail-Adresse, falls vorhanden die Transaktions-ID des Käufers und einen privaten Download-Link zu deinen Dateien an. Wir gleichen diese Angaben mit der Zahlung ab, bevor wir dein Projekt bestätigen.",
    terms: "Dies sind Einführungspreise. Die enthaltenen Korrekturen beziehen sich auf das eingereichte Material. Neue Aufnahmen oder größere Änderungen am Arrangement erfordern eine neue Vereinbarung. Deine gesetzlichen Rechte bleiben unberührt.",
    policiesKicker: "BESTELLBEDINGUNGEN", policiesTitle: "Klare Absprachen<br /><em>für beide Seiten.</em>",
    refundTitle: "Stornierungen und Erstattungen", refundText: "Wenn du vor Arbeitsbeginn stornierst oder wir deine Dateien im Rahmen des Angebots nicht annehmen können, erstatten wir die Zahlung vollständig. Hat die Arbeit bereits begonnen, kontaktiere uns bitte, damit wir das Problem lösen können. Eine Erstattung richtet sich dann nach geltendem Recht und den bereits erbrachten Leistungen. Deine gesetzlichen Rechte bleiben unberührt.",
    privacyTitle: "Datenschutz und deine Musik", privacyText: "Diese Website speichert deine Sprachauswahl im Browser und lädt Schriftarten von Google. PayPal verarbeitet Zahlungen; dein E-Mail-Anbieter übermittelt Projektdaten; der von dir gewählte Dateidienst speichert die Audiodateien. Wir verwenden deine Kontakt- und Zahlungsdaten, dein Briefing und die Audiodateien zur Bearbeitung deines Projekts. Wir veröffentlichen deine Musik nicht ohne Erlaubnis. Nach der Lieferung kannst du per E-Mail die Löschung der Projektdateien verlangen.",
    cancelRequest: "Anfragen zu Stornierung oder Widerruf",
    footer: "MIXING / MASTERING / MUSIKPRODUKTION", policiesLink: "BEDINGUNGEN ↑", legalLink: "IMPRESSUM ↗", contact: "KONTAKT ↗",
  };
  const localizedTranslations = { es: translations, de: germanTranslations };
  const select = document.getElementById("service-select");
  const languageSelect = document.getElementById("language-select");
  const payButton = document.getElementById("pay-button");
  const handoverLinks = [...document.querySelectorAll("[data-handover-link]")];
  const textNodes = [...document.querySelectorAll("[data-book-i18n]")];
  const htmlNodes = [...document.querySelectorAll("[data-book-i18n-html]")];
  const originals = new Map([...textNodes, ...htmlNodes].map((node) => [node, node.innerHTML]));
  const englishTitle = document.title;
  const englishDescription = document.querySelector('meta[name="description"]')?.content;
  const initialKey = new URLSearchParams(location.search).get("service");
  let selected = Object.hasOwn(offers, initialKey) ? initialKey : "stereo";
  const browserLanguage = (navigator.language || "").toLowerCase();
  let language = browserLanguage.startsWith("de") ? "de" : browserLanguage.startsWith("es") ? "es" : "en";
  try {
    const savedLanguage = localStorage.getItem("tonart-language");
    if (["en", "es", "de"].includes(savedLanguage)) language = savedLanguage;
  } catch {}

  function checkoutUrlFor(key) {
    if (!CHECKOUT_ENABLED) return "";
    const raw = PAYMENT_LINKS[key];
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return url.protocol === "https:" && ["paypal.com", "www.paypal.com"].includes(url.hostname) && url.pathname.startsWith("/ncp/payment/") ? url.href : "";
    } catch { return ""; }
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
    const handoverUrl = `handover.html?service=${encodeURIComponent(selected)}`;
    for (const link of handoverLinks) link.href = handoverUrl;
    const checkoutUrl = checkoutUrlFor(selected);
    if (checkoutUrl) {
      payButton.href = checkoutUrl;
      payButton.target = "_blank";
      payButton.rel = "noopener noreferrer";
    } else {
      payButton.removeAttribute("href");
      payButton.removeAttribute("target");
      payButton.removeAttribute("rel");
    }
    payButton.hidden = !checkoutUrl;
    document.getElementById("pay-note").hidden = !checkoutUrl;
    document.getElementById("pay-pending").hidden = Boolean(checkoutUrl);
  }

  function renderLanguage() {
    document.documentElement.lang = language;
    languageSelect.value = language;
    const localized = localizedTranslations[language];
    for (const node of textNodes) node.innerHTML = localized?.[node.dataset.bookI18n] ?? originals.get(node);
    for (const node of htmlNodes) node.innerHTML = localized?.[node.dataset.bookI18nHtml] ?? originals.get(node);
    document.title = language === "es" ? "Reserva un proyecto — Tonart" : language === "de" ? "Projekt buchen — Tonart" : englishTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === "es"
      ? "Elige un servicio de mezcla o masterización de Tonart, paga en línea y envíanos tus archivos."
      : language === "de"
        ? "Wähle einen Mixing- oder Mastering-Service von Tonart, bezahle online und sende uns deine Dateien."
        : englishDescription;
    const emailSubjects = {
      en: "Tonart cancellation request",
      es: "Solicitud de cancelación Tonart",
      de: "Tonart Stornierung oder Widerruf",
    }[language];
    document.getElementById("cancellation-email").href = `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(emailSubjects)}`;
    renderOffer();
  }

  select.addEventListener("change", () => { selected = select.value; history.replaceState(null, "", `?service=${encodeURIComponent(selected)}`); renderOffer(); });
  languageSelect.addEventListener("change", () => {
    language = languageSelect.value;
    try { localStorage.setItem("tonart-language", language); } catch {}
    renderLanguage();
  });
  renderLanguage();
})();
