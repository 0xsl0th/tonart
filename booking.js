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
    lede: "Elige una oferta de lanzamiento y revisa lo que incluye. Envíanos tu brief para solicitar una reserva.",
    choose: "ELIGE TU SERVICIO", offerTitle: "Tu oferta", serviceLabel: "SERVICIO",
    timelineLabel: "PRIMERA VERSIÓN", revisionLabel: "RONDAS DE CAMBIOS",
    payButton: "Preparar solicitud de reserva",
    payNote: "PayPal se abre en otra pestaña. Comprueba el vendedor y el importe antes de pagar. El pago puede aparecer en otro idioma según tu configuración de PayPal o del navegador.",
    payPendingNote: "Estamos preparando el pago en línea. Envíanos tu brief para confirmar el alcance y los detalles de pago.",
    next: "QUÉ SIGUE", stepsTitle: "Envía la música.",
    step1Title: "Envíanos tu brief y los archivos", step1Text: "Copia el brief y escríbele a Murlek por Instagram o a Tonart por correo con un enlace privado de descarga.",
    step2Title: "Confirmamos el alcance y el plazo", step2Text: "Revisamos los archivos y la disponibilidad, y confirmamos si la oferta elegida corresponde.",
    step3Title: "Enviamos los detalles de pago", step3Text: "Tras confirmar la oferta, te enviamos los datos de pago. El plazo comienza al recibir el pago y los archivos utilizables.",
    briefLabel: "COPIA UN BRIEF DEL PROYECTO", copy: "Copiar brief", copied: "Brief copiado. Pégalo en un mensaje a Murlek o en un correo a Tonart.", copyFailed: "Selecciona el texto y cópialo manualmente.",
    openInstagram: "Abrir Instagram de Murlek", openEmail: "Escribir a Tonart", faqKicker: "ANTES DE RESERVAR", faqTitle: "Algunos detalles<br /><em>útiles.</em>",
    faq1Title: "¿Cuándo empieza el plazo?", faq1Text: "Después de recibir el pago, tu brief y los archivos finales utilizables, y confirmar el alcance. Los días hábiles excluyen fines de semana y feriados. Los plazos indicados son para una primera versión, no para todo el proceso de cambios.",
    faq2Title: "¿Y si mi proyecto supera los límites de la oferta?", faq2Text: "Escríbenos antes de pagar si el tema dura más de 10 minutos, tiene más pistas o stems que los incluidos, o necesita edición, afinación, producción o versiones alternativas.",
    faq3Title: "¿La reserva es instantánea?", faq3Text: "Confirmamos cada proyecto personalmente tras revisar los archivos y la disponibilidad. Si la oferta no corresponde, acordaremos otro alcance antes de cobrar.",
    terms: "Estas son tarifas introductorias. Los cambios incluidos se aplican al material enviado; nuevas grabaciones o cambios importantes de arreglo requieren un nuevo alcance. Tus derechos legales siguen vigentes.",
    policiesKicker: "POLÍTICAS DE PEDIDO", policiesTitle: "Expectativas claras<br /><em>para ambas partes.</em>",
    refundTitle: "Cancelaciones y reintegros", refundText: "Si cancelas antes de que comience el trabajo, o si no podemos aceptar tus archivos dentro del alcance de la oferta, reintegramos el pago completo. Una vez iniciado el trabajo, escríbenos para resolver el problema; cualquier reintegro se evalúa según la ley aplicable y el trabajo ya entregado. Tus derechos legales siguen vigentes.",
    privacyTitle: "Privacidad y tu música", privacyText: "Este sitio guarda tu elección de idioma en el navegador y carga fuentes de Google. Si pagas con PayPal, PayPal procesa el pago; tu proveedor de correo o Instagram lleva los mensajes del proyecto; el servicio de archivos que elijas aloja las subidas. Usamos el correo de contacto o de pago, el brief y el audio que envías para trabajar en tu proyecto. No publicamos tu música sin permiso. Puedes pedir que borremos los archivos del proyecto después de la entrega por el mismo canal de contacto.",
    cancelRequest: "Solicitudes de cancelación o desistimiento",
    footer: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL", policiesLink: "POLÍTICAS ↑", legalLink: "AVISO LEGAL ↗", contact: "CONTACTO ↗",
  };
  const germanTranslations = {
    skip: "Zum Inhalt springen", back: "Zurück zu den Preisen", eyebrow: "TONART / PROJEKT BUCHEN",
    title: "Guter Sound beginnt<br /><em>mit einem guten Briefing.</em>",
    lede: "Wähle ein Einführungsangebot und prüfe, was enthalten ist. Sende uns dein Briefing, um ein Projekt anzufragen.",
    choose: "SERVICE WÄHLEN", offerTitle: "Dein Angebot", serviceLabel: "SERVICE",
    timelineLabel: "ERSTE VERSION", revisionLabel: "KORREKTURRUNDEN",
    payButton: "Buchungsanfrage vorbereiten",
    payNote: "PayPal öffnet sich in einem neuen Tab. Prüfe Anbieter und Gesamtbetrag, bevor du zahlst. Die Zahlungsseite kann je nach PayPal- oder Browsereinstellungen in einer anderen Sprache erscheinen.",
    payPendingNote: "Die Online-Zahlung wird eingerichtet. Sende uns dein Briefing, damit wir Umfang und Zahlungsdetails bestätigen können.",
    next: "SO GEHT ES WEITER", stepsTitle: "Schick uns deine Musik.",
    step1Title: "Briefing und Dateien senden", step1Text: "Kopiere das Briefing und schreibe Murlek auf Instagram oder Tonart per E-Mail. Füge einen privaten Download-Link hinzu.",
    step2Title: "Wir bestätigen Umfang und Zeitplan", step2Text: "Wir prüfen deine Dateien und unsere Verfügbarkeit und bestätigen, ob das gewählte Angebot passt.",
    step3Title: "Wir senden die Zahlungsdetails", step3Text: "Sobald das Angebot bestätigt ist, senden wir dir die Zahlungsdetails. Die Bearbeitungszeit beginnt, wenn Zahlung und verwendbare Dateien vorliegen.",
    briefLabel: "PROJEKTBRIEFING KOPIEREN", copy: "Briefing kopieren", copied: "Briefing kopiert. Füge es in eine Nachricht an Murlek oder eine E-Mail an Tonart ein.", copyFailed: "Markiere den Text und kopiere ihn manuell.",
    openInstagram: "Murleks Instagram öffnen", openEmail: "Tonart per E-Mail schreiben", faqKicker: "VOR DER BUCHUNG", faqTitle: "Ein paar wichtige<br /><em>Details.</em>",
    faq1Title: "Wann beginnt die Bearbeitungszeit?", faq1Text: "Sobald Zahlung, Briefing und verwendbare finale Dateien eingegangen sind und wir den Leistungsumfang bestätigt haben. Wochenenden und Feiertage zählen nicht als Arbeitstage. Die angegebenen Zeiten gelten für die erste Version, nicht für den gesamten Korrekturprozess.",
    faq2Title: "Was, wenn mein Projekt über den Angebotsumfang hinausgeht?", faq2Text: "Schreibe uns vor der Zahlung, wenn der Track länger als 10 Minuten ist, mehr Spuren oder Stems enthält als im Angebot vorgesehen oder Editing, Tonhöhenkorrektur, Produktion oder alternative Versionen benötigt.",
    faq3Title: "Ist die Buchung sofort bestätigt?", faq3Text: "Wir bestätigen jedes Projekt persönlich, nachdem wir Dateien und Verfügbarkeit geprüft haben. Falls das Angebot nicht passt, besprechen wir einen anderen Umfang, bevor wir eine Zahlung annehmen.",
    terms: "Dies sind Einführungspreise. Die enthaltenen Korrekturen beziehen sich auf das eingereichte Material. Neue Aufnahmen oder größere Änderungen am Arrangement erfordern eine neue Vereinbarung. Deine gesetzlichen Rechte bleiben unberührt.",
    policiesKicker: "BESTELLBEDINGUNGEN", policiesTitle: "Klare Absprachen<br /><em>für beide Seiten.</em>",
    refundTitle: "Stornierungen und Erstattungen", refundText: "Wenn du vor Arbeitsbeginn stornierst oder wir deine Dateien im Rahmen des Angebots nicht annehmen können, erstatten wir die Zahlung vollständig. Hat die Arbeit bereits begonnen, kontaktiere uns bitte, damit wir das Problem lösen können. Eine Erstattung richtet sich dann nach geltendem Recht und den bereits erbrachten Leistungen. Deine gesetzlichen Rechte bleiben unberührt.",
    privacyTitle: "Datenschutz und deine Musik", privacyText: "Diese Website speichert deine Sprachauswahl im Browser und lädt Schriftarten von Google. Bei einer Zahlung über PayPal verarbeitet PayPal die Zahlung. Dein E-Mail-Anbieter oder Instagram übermittelt Projektnachrichten; der von dir gewählte Dateidienst speichert Uploads. Wir verwenden die Kontakt- oder Zahlungs-E-Mail-Adresse, dein Briefing und die eingesendeten Audiodateien zur Bearbeitung deines Projekts. Wir veröffentlichen deine Musik nicht ohne Erlaubnis. Nach der Lieferung kannst du über denselben Kontaktkanal die Löschung der Projektdateien verlangen.",
    cancelRequest: "Anfragen zu Stornierung oder Widerruf",
    footer: "MIXING / MASTERING / MUSIKPRODUKTION", policiesLink: "BEDINGUNGEN ↑", legalLink: "IMPRESSUM ↗", contact: "KONTAKT ↗",
  };
  const checkoutFlow = {
    en: {
      lede: "Choose a launch offer and review what is included. Pay online, then send us your files and direction so we can confirm the job.",
      payButton: "Continue to PayPal", faqKicker: "BEFORE YOU PAY",
      step1Title: "Pay for the selected offer", step1Text: "Complete the PayPal payment using the button. Keep its transaction ID for your brief.",
      step2Title: "Send us your brief and files", step2Text: "Message Murlek on Instagram or email Tonart with your track title, PayPal transaction ID, a private download link, and references.",
      step3Title: "We confirm the project", step3Text: "We check the payment and files, then confirm the scope and first-preview date. The turnaround starts when everything needed is received.",
      faq3Text: "Payment is immediate; the project is confirmed by a person after we check your files and availability. If we cannot accept it within the stated scope, we will offer an adjusted quote or a full refund before work begins.",
    },
    es: {
      lede: "Elige una oferta de lanzamiento y revisa lo que incluye. Paga en línea y luego envíanos tus archivos y tu dirección artística para confirmar el trabajo.",
      payButton: "Continuar a PayPal", faqKicker: "ANTES DE PAGAR",
      step1Title: "Paga la oferta elegida", step1Text: "Completa el pago en PayPal. Conserva el ID de transacción para incluirlo en tu brief.",
      step2Title: "Envíanos el brief y los archivos", step2Text: "Escríbele a Murlek por Instagram o a Tonart por correo con el título, el ID de transacción, un enlace privado de descarga y referencias.",
      step3Title: "Confirmamos el proyecto", step3Text: "Comprobamos el pago y los archivos y confirmamos el alcance y la fecha de la primera versión. El plazo comienza cuando recibimos todo lo necesario.",
      faq3Text: "El pago es inmediato; confirmamos el proyecto personalmente después de revisar los archivos y la disponibilidad. Si no podemos aceptarlo dentro del alcance anunciado, ofreceremos una cotización nueva o el reintegro completo antes de empezar.",
    },
    de: {
      lede: "Wähle ein Einführungsangebot und prüfe, was enthalten ist. Bezahle online und sende uns anschließend deine Dateien und Klangvorstellungen, damit wir den Auftrag bestätigen können.",
      payButton: "Weiter zu PayPal", faqKicker: "VOR DER ZAHLUNG",
      step1Title: "Gewähltes Angebot bezahlen", step1Text: "Schließe die Zahlung über PayPal ab. Notiere die Transaktions-ID für dein Briefing.",
      step2Title: "Briefing und Dateien senden", step2Text: "Schreibe Murlek auf Instagram oder Tonart per E-Mail. Nenne Tracktitel und PayPal-Transaktions-ID und füge einen privaten Download-Link sowie Referenzen hinzu.",
      step3Title: "Wir bestätigen dein Projekt", step3Text: "Wir prüfen die Zahlung und Dateien und bestätigen Leistungsumfang und Termin der ersten Version. Die Bearbeitungszeit beginnt, wenn alles Nötige vorliegt.",
      faq3Text: "Die Zahlung erfolgt sofort; wir bestätigen das Projekt persönlich, nachdem wir Dateien und Verfügbarkeit geprüft haben. Können wir es im angegebenen Umfang nicht annehmen, bieten wir vor Arbeitsbeginn ein angepasstes Angebot oder eine vollständige Erstattung an.",
    },
  };

  const localizedTranslations = { es: translations, de: germanTranslations };
  const select = document.getElementById("service-select");
  const languageSelect = document.getElementById("language-select");
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
  const browserLanguage = (navigator.language || "").toLowerCase();
  let language = browserLanguage.startsWith("de") ? "de" : browserLanguage.startsWith("es") ? "es" : "en";
  let lastGeneratedBrief = "";
  try {
    const savedLanguage = localStorage.getItem("tonart-language");
    if (["en", "es", "de"].includes(savedLanguage)) language = savedLanguage;
  } catch {}
  let briefLanguage = language;

  function checkoutUrlFor(key) {
    if (!CHECKOUT_ENABLED) return "";
    const raw = PAYMENT_LINKS[key];
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return url.protocol === "https:" && ["paypal.com", "www.paypal.com"].includes(url.hostname) && url.pathname.startsWith("/ncp/payment/") ? url.href : "";
    } catch { return ""; }
  }

  function briefText() {
    const name = offers[selected][language].name;
    const hasCheckout = Boolean(checkoutUrlFor(selected));
    if (language === "es") {
      const contactLine = hasCheckout ? "Correo usado en PayPal: \nID de transacción PayPal: \n" : "Correo de contacto: \n";
      return `Hola Tonart, quiero reservar un proyecto.\n\nServicio: ${name}\n${contactLine}Título del tema / EP: \nEnlace privado de descarga: \nReferencias y dirección sonora: \nOtros detalles: `;
    }
    if (language === "de") {
      const contactLine = hasCheckout ? "E-Mail-Adresse für die PayPal-Zahlung: \nPayPal-Transaktions-ID: \n" : "Kontakt-E-Mail-Adresse: \n";
      return `Hallo Tonart, ich möchte ein Projekt buchen.\n\nLeistung: ${name}\n${contactLine}Track- / EP-Titel: \nPrivater Download-Link: \nReferenzen und Klangvorstellungen: \nWeitere Angaben: `;
    }
    const contactLine = hasCheckout ? "PayPal payment email: \nPayPal transaction ID: \n" : "Contact email: \n";
    return `Hi Tonart, I'd like to book a project.\n\nService: ${name}\n${contactLine}Track / EP title: \nPrivate download link: \nReferences and sonic direction: \nAnything else: `;
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
      const serviceLabel = { en: "Service", es: "Servicio", de: "Leistung" }[briefLanguage];
      const serviceLine = `${serviceLabel}: ${offers[selected][briefLanguage].name}`;
      brief.value = /^(Service|Servicio|Leistung):.*$/m.test(brief.value)
        ? brief.value.replace(/^(Service|Servicio|Leistung):.*$/m, serviceLine)
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
        : localizedTranslations[language]?.[key] ?? originals.get(node);
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
    document.documentElement.lang = language;
    languageSelect.value = language;
    const localized = localizedTranslations[language];
    for (const node of textNodes) node.innerHTML = localized?.[node.dataset.bookI18n] ?? originals.get(node);
    for (const node of htmlNodes) node.innerHTML = localized?.[node.dataset.bookI18nHtml] ?? originals.get(node);
    document.title = language === "es" ? "Reserva un proyecto — Tonart" : language === "de" ? "Projekt buchen — Tonart" : englishTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === "es"
      ? "Elige un servicio de mezcla o masterización de Tonart y envía los detalles de tu proyecto."
      : language === "de"
        ? "Wähle einen Mixing- oder Mastering-Service von Tonart und sende uns dein Projektbriefing."
        : englishDescription;
    const emailSubjects = {
      en: ["Tonart project brief", "Tonart cancellation request"],
      es: ["Brief del proyecto Tonart", "Solicitud de cancelación Tonart"],
      de: ["Tonart Projektbriefing", "Tonart Stornierung oder Widerruf"],
    }[language];
    document.getElementById("booking-email").href = `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(emailSubjects[0])}`;
    document.getElementById("cancellation-email").href = `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(emailSubjects[1])}`;
    renderOffer();
  }

  select.addEventListener("change", () => { selected = select.value; history.replaceState(null, "", `?service=${encodeURIComponent(selected)}`); renderOffer(); });
  languageSelect.addEventListener("change", () => {
    language = languageSelect.value;
    try { localStorage.setItem("tonart-language", language); } catch {}
    renderLanguage();
  });
  document.getElementById("copy-brief").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(brief.value);
      copyStatus.textContent = localizedTranslations[language]?.copied ?? "Brief copied. Paste it into a message to Murlek or an email to Tonart.";
    } catch {
      brief.focus(); brief.select();
      copyStatus.textContent = localizedTranslations[language]?.copyFailed ?? "Select the text and copy it manually.";
    }
  });
  renderLanguage();
})();
