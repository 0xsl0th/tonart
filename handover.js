(() => {
  const recipient = "tonart.space@gmail.com";
  const maxMailtoLength = 5000;

  const offers = {
    stereo: { price: 39, en: "Stereo mastering — 1 track", es: "Masterización estéreo — 1 tema", de: "Stereo-Mastering — 1 Track", type: "stereo" },
    stem: { price: 69, en: "Stem mastering — 1 track", es: "Masterización por stems — 1 tema", de: "Stem-Mastering — 1 Track", type: "stem" },
    mix: { price: 129, en: "Mixing — 1 track", es: "Mezcla — 1 tema", de: "Mixing — 1 Track", type: "mix" },
    mixmaster: { price: 149, en: "Mixing + mastering — 1 track", es: "Mezcla + masterización — 1 tema", de: "Mixing + Mastering — 1 Track", type: "mix" },
    // Keep the original keys for customers returning from older PayPal links.
    "ep-stereo": { price: 99, en: "3-track EP — stereo mastering", es: "EP de 3 temas — masterización estéreo", de: "3-Track-EP — Stereo-Mastering", type: "epStereo", count: 3 },
    "ep-stem": { price: 179, en: "3-track EP — stem mastering", es: "EP de 3 temas — masterización por stems", de: "3-Track-EP — Stem-Mastering", type: "epStem", count: 3 },
    "ep-mixmaster": { price: 399, en: "3-track EP — mixing + mastering", es: "EP de 3 temas — mezcla + masterización", de: "3-Track-EP — Mixing + Mastering", type: "epMix", count: 3 },
  };

  const epServices = [
    { key: "ep-stereo", basePrice: 99, type: "epStereo", en: "stereo mastering", es: "masterización estéreo", de: "Stereo-Mastering" },
    { key: "ep-stem", basePrice: 179, type: "epStem", en: "stem mastering", es: "masterización por stems", de: "Stem-Mastering" },
    { key: "ep-mixmaster", basePrice: 399, type: "epMix", en: "mixing + mastering", es: "mezcla + masterización", de: "Mixing + Mastering" },
  ];
  for (const service of epServices) {
    for (const count of [4, 5, 6]) {
      offers[`${service.key}-${count}`] = {
        price: Math.round(service.basePrice * count / 3),
        en: `${count}-track EP — ${service.en}`,
        es: `EP de ${count} temas — ${service.es}`,
        de: `${count}-Track-EP — ${service.de}`,
        type: service.type,
        count,
      };
    }
  }

  const copy = {
    en: {
      pageTitle: "Send your project — Tonart", metaDescription: "Send Tonart your project details and a private download link after paying for mixing or mastering.",
      skip: "Skip to content", homeLabel: "Tonart home", back: "Back to booking", eyebrow: "TONART / PROJECT HANDOVER", title: "Paid? Send us<br /><em>the music.</em>",
      lede: "Your payment does not transfer your audio files. Complete this handover, then send the email draft that opens in your mail app.",
      processLabel: "Handover process", step1Title: "Complete payment", step1Text: "Complete payment for your selected offer. Keep your payment receipt or transfer details.",
      step2Title: "Send your project", step2Text: "Fill in this page, open the email draft, and press Send in your email app.",
      step3Title: "We confirm the date", step3Text: "We manually match the completed payment, service and amount, check the files, then confirm your first-preview date.",
      formKicker: "SEND YOUR PROJECT", formTitle: "Project handover", formIntro: "Choose how you paid and give us the details shown on your receipt. We use them to match your payment before confirming the project.",
      serviceLabel: "Service you paid for", servicePlaceholder: "Select the service on your receipt", serviceHelp: "Choose the exact offer on your payment receipt. Changing this selection does not change a payment.",
      price: "Offer price: USD $", listedPrice: "Listed offer price: USD $", paymentDetails: "PAYMENT DETAILS", paymentMethodLabel: "Payment method", optional: "optional",
      methodPayPal: "PayPal", methodMercadoPago: "Mercado Pago payment link", methodTransfer: "Transfer to Mercado Pago alias / CVU",
      methodHelpPayPal: "Use the email on your PayPal receipt. We verify payment in our account before confirming your project.",
      methodHelpMercadoPago: "Enter the amount in Argentine pesos shown on your Mercado Pago receipt. We verify the completed payment before confirming your project.",
      methodHelpTransfer: "Enter the Argentine peso amount and the sender's account name from your transfer receipt. We confirm your project after the transfer is credited and verified.",
      payerEmailLabel: "Payment / receipt email", transferEmailLabel: "Email on transfer receipt", transactionLabelPayPal: "PayPal transaction ID",
      transactionLabelMercadoPago: "Mercado Pago operation ID", transactionLabelTransfer: "Transfer operation / reference ID", arsAmountLabel: "Amount paid (ARS)", transferSenderLabel: "Name on the sending account",
      projectDetails: "PROJECT DETAILS", contactNameLabel: "Your name", contactEmailLabel: "Contact email", projectTitleLabel: "Track or EP title",
      downloadLabel: "Private download link for your files", downloadHelp: "Upload your WAVs or stems to Google Drive, Dropbox, WeTransfer or a similar service. Share a private HTTPS download link that works without a permission request. Keep it active until delivery. This page does not upload files. Send a DAW project only if we request one.",
      accessLabel: "Access instructions", accessHelp: "If the link needs a password or access approval, tell us how to get in. Do not include account login credentials.",
      referencesLabel: "Sound references", notesLabel: "Direction and notes", openDraft: "Open email draft", copyDetails: "Copy handover details",
      sendNote: "This page opens a draft only. Press Send in your email app to deliver your details to Tonart. You can edit the draft before sending.",
      manualCopyLabel: "Copy this text into an email to tonart.space@gmail.com", guideKicker: "FILE CHECKLIST", guideTitle: "Make your files<br /><em>ready to work.</em>", forService: "FOR YOUR SELECTED SERVICE",
      guide1: "Name each file clearly with the artist and track title.", guide2: "Export audio at the original session sample rate and bit depth. WAV is preferred.",
      guide3: "Check that the download works without asking us to log into your account.", needHelpKicker: "NEED HELP BEFORE SENDING?", needHelpText: "If the files do not fit the package or you need production work, email us before you send the handover.",
      footer: "MIXING / MASTERING / MUSIC PRODUCTION", legal: "LEGAL NOTICE ↗", chooseHint: "Select the service you paid for to see the right file checklist.",
      hints: {
        stereo: "Send one final stereo WAV mix. Leave peak headroom and remove any loudness limiter you used only for previewing. Include a reference mix if helpful.",
        stem: "Send up to four grouped stereo WAV stems. Export each stem from the same start point so all files align and reproduce your mix together.",
        mix: "Send up to 24 individual WAV audio tracks, all exported from the same start point. Include a rough mix and any important effects or production notes.",
        epStereo: "Send all {count} final stereo WAV mixes together, with clear track names and order. Each track can be up to 10 minutes.",
        epStem: "Send all {count} tracks together. For each track, include up to four grouped stereo WAV stems aligned to the same start point.",
        epMix: "Send all {count} tracks together. For each, include up to 24 aligned WAV audio tracks, a rough mix and the intended track order.",
      },
      httpsError: "Enter a valid HTTPS download link beginning with https://.", invalid: "Please complete the required fields and check the download link.",
      draftStatus: "If your email app opens, review the draft and press Send there. Nothing has been sent by this page. If no app opens, use Copy handover details.",
      copied: "Handover details copied. Paste them into an email to tonart.space@gmail.com and press Send.",
      copyFailed: "Automatic copying is unavailable. Select the text below, copy it, and email it to tonart.space@gmail.com.",
      tooLong: "This project link makes an email draft too long for reliable opening. Copy the details below and email them to tonart.space@gmail.com.",
    },
    es: {
      pageTitle: "Envía tu proyecto — Tonart", metaDescription: "Envía a Tonart los datos de tu proyecto y un enlace privado de descarga después de pagar la mezcla o masterización.",
      skip: "Ir al contenido", homeLabel: "Inicio de Tonart", back: "Volver a la reserva", eyebrow: "TONART / ENTREGA DEL PROYECTO", title: "¿Ya pagaste? Envíanos<br /><em>tu música.</em>",
      lede: "El pago no transfiere tus archivos de audio. Completa este formulario y luego envía el borrador que se abrirá en tu aplicación de correo.",
      processLabel: "Proceso de entrega", step1Title: "Completa el pago", step1Text: "Completa el pago de la oferta elegida. Conserva el comprobante o los datos de la transferencia.",
      step2Title: "Envía tu proyecto", step2Text: "Completa esta página, abre el borrador y pulsa Enviar en tu aplicación de correo.",
      step3Title: "Confirmamos la fecha", step3Text: "Comprobamos manualmente el pago completado, el servicio y el importe, revisamos los archivos y confirmamos la fecha de la primera versión.",
      formKicker: "ENVÍA TU PROYECTO", formTitle: "Entrega del proyecto", formIntro: "Indica cómo pagaste y los datos del comprobante. Los usamos para verificar el pago antes de confirmar el proyecto.",
      serviceLabel: "Servicio que pagaste", servicePlaceholder: "Selecciona el servicio de tu recibo", serviceHelp: "Elige exactamente la oferta de tu recibo de pago. Cambiar esta selección no modifica el pago.",
      price: "Precio de la oferta: USD $", listedPrice: "Precio publicado de la oferta: USD $", paymentDetails: "DATOS DEL PAGO", paymentMethodLabel: "Medio de pago", optional: "opcional",
      methodPayPal: "PayPal", methodMercadoPago: "Link de pago de Mercado Pago", methodTransfer: "Transferencia al alias / CVU de Mercado Pago",
      methodHelpPayPal: "Usa el correo del comprobante de PayPal. Verificamos el pago en nuestra cuenta antes de confirmar tu proyecto.",
      methodHelpMercadoPago: "Ingresa el importe en pesos argentinos que figura en el comprobante de Mercado Pago. Verificamos el pago completado antes de confirmar tu proyecto.",
      methodHelpTransfer: "Ingresa el importe en pesos argentinos y el nombre del titular de la cuenta que envió la transferencia. Confirmamos el proyecto cuando se acredite y verifiquemos el pago.",
      payerEmailLabel: "Correo del pago / comprobante", transferEmailLabel: "Correo del comprobante de transferencia", transactionLabelPayPal: "ID de transacción de PayPal",
      transactionLabelMercadoPago: "ID de operación de Mercado Pago", transactionLabelTransfer: "ID de operación / referencia de transferencia", arsAmountLabel: "Importe pagado (ARS)", transferSenderLabel: "Nombre del titular de la cuenta de origen",
      projectDetails: "DATOS DEL PROYECTO", contactNameLabel: "Tu nombre", contactEmailLabel: "Correo de contacto", projectTitleLabel: "Título del tema o EP",
      downloadLabel: "Enlace privado de descarga de tus archivos", downloadHelp: "Sube tus WAV o stems a Google Drive, Dropbox, WeTransfer o un servicio similar. Comparte un enlace HTTPS privado que permita descargar sin solicitar acceso. Mantenlo activo hasta la entrega. Esta página no sube archivos. Envía un proyecto de DAW solo si te lo pedimos.",
      accessLabel: "Instrucciones de acceso", accessHelp: "Si el enlace requiere contraseña o autorización, indícanos cómo acceder. No incluyas credenciales de tu cuenta.",
      referencesLabel: "Referencias sonoras", notesLabel: "Dirección y notas", openDraft: "Abrir borrador de correo", copyDetails: "Copiar datos de entrega",
      sendNote: "Esta página solo abre un borrador. Pulsa Enviar en tu aplicación de correo para entregarnos los datos. Puedes editar el borrador antes de enviarlo.",
      manualCopyLabel: "Copia este texto en un correo a tonart.space@gmail.com", guideKicker: "LISTA DE ARCHIVOS", guideTitle: "Prepara tus archivos<br /><em>para trabajar.</em>", forService: "PARA EL SERVICIO ELEGIDO",
      guide1: "Pon nombres claros a los archivos con el artista y título del tema.", guide2: "Exporta el audio con la frecuencia de muestreo y profundidad de bits originales de la sesión. Preferimos WAV.",
      guide3: "Comprueba que se puede descargar sin entrar en tu cuenta.", needHelpKicker: "¿NECESITAS AYUDA ANTES DE ENVIAR?", needHelpText: "Si los archivos no encajan con la oferta o necesitas trabajo de producción, escríbenos antes de enviar la entrega.",
      footer: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL", legal: "AVISO LEGAL ↗", chooseHint: "Selecciona el servicio que pagaste para ver los archivos necesarios.",
      hints: {
        stereo: "Envía una mezcla estéreo final en WAV. Deja margen de pico y quita el limitador de volumen usado solo para previsualizar. Puedes incluir una mezcla de referencia.",
        stem: "Envía hasta cuatro stems estéreo WAV agrupados. Expórtalos todos desde el mismo punto de inicio para que queden alineados y reproduzcan tu mezcla juntos.",
        mix: "Envía hasta 24 pistas individuales de audio WAV, exportadas desde el mismo punto de inicio. Incluye una mezcla preliminar y notas sobre efectos o producción importantes.",
        epStereo: "Envía juntas las {count} mezclas estéreo finales en WAV, con nombres y orden claros. Cada tema puede durar hasta 10 minutos.",
        epStem: "Envía los {count} temas juntos. Para cada uno, incluye hasta cuatro stems estéreo WAV agrupados y alineados desde el mismo punto de inicio.",
        epMix: "Envía los {count} temas juntos. Para cada uno, incluye hasta 24 pistas WAV alineadas, una mezcla preliminar y el orden previsto.",
      },
      httpsError: "Introduce un enlace de descarga HTTPS válido que empiece por https://.", invalid: "Completa los campos obligatorios y comprueba el enlace de descarga.",
      draftStatus: "Si se abre tu aplicación de correo, revisa el borrador y pulsa Enviar allí. Esta página no ha enviado nada. Si no se abre, usa Copiar datos de entrega.",
      copied: "Datos copiados. Pégalos en un correo a tonart.space@gmail.com y pulsa Enviar.",
      copyFailed: "No se pudo copiar automáticamente. Selecciona el texto de abajo, cópialo y envíalo a tonart.space@gmail.com.",
      tooLong: "El enlace de tu proyecto hace que el borrador sea demasiado largo para abrirse con fiabilidad. Copia los datos de abajo y envíalos a tonart.space@gmail.com.",
    },
    de: {
      pageTitle: "Projekt einsenden — Tonart", metaDescription: "Sende Tonart nach der Zahlung deine Projektdaten und einen privaten Download-Link für Mixing oder Mastering.",
      skip: "Zum Inhalt springen", homeLabel: "Tonart Startseite", back: "Zurück zur Buchung", eyebrow: "TONART / PROJEKTÜBERGABE", title: "Bezahlt? Schick uns<br /><em>deine Musik.</em>",
      lede: "Deine Zahlung überträgt keine Audiodateien. Fülle diese Übergabe aus und sende anschließend den Entwurf in deinem E-Mail-Programm ab.",
      processLabel: "Ablauf der Projektübergabe", step1Title: "Zahlung abschließen", step1Text: "Bezahle das gewählte Angebot. Bewahre deinen Zahlungsbeleg oder die Überweisungsdaten auf.",
      step2Title: "Projekt einsenden", step2Text: "Fülle diese Seite aus, öffne den E-Mail-Entwurf und klicke in deinem E-Mail-Programm auf Senden.",
      step3Title: "Wir bestätigen den Termin", step3Text: "Wir gleichen die abgeschlossene Zahlung, Leistung und Summe persönlich ab, prüfen die Dateien und bestätigen dann den Termin der ersten Version.",
      formKicker: "PROJEKT EINSENDEN", formTitle: "Projektübergabe", formIntro: "Wähle deine Zahlungsart und gib die Angaben vom Beleg ein. Damit gleichen wir die Zahlung ab, bevor wir dein Projekt bestätigen.",
      serviceLabel: "Bezahlte Leistung", servicePlaceholder: "Leistung laut Zahlungsbeleg auswählen", serviceHelp: "Wähle genau das Angebot auf deinem Zahlungsbeleg. Die Auswahl ändert keine Zahlung.",
      price: "Angebotspreis: USD $", listedPrice: "Ausgewiesener Angebotspreis: USD $", paymentDetails: "ZAHLUNGSANGABEN", paymentMethodLabel: "Zahlungsart", optional: "optional",
      methodPayPal: "PayPal", methodMercadoPago: "Mercado Pago Zahlungslink", methodTransfer: "Überweisung an Mercado Pago Alias / CVU",
      methodHelpPayPal: "Verwende die E-Mail-Adresse auf deinem PayPal-Beleg. Wir prüfen die Zahlung in unserem Konto, bevor wir dein Projekt bestätigen.",
      methodHelpMercadoPago: "Gib den Betrag in argentinischen Pesos von deinem Mercado Pago Beleg ein. Wir prüfen die abgeschlossene Zahlung, bevor wir dein Projekt bestätigen.",
      methodHelpTransfer: "Gib den Betrag in argentinischen Pesos und den Namen des Absenderkontos laut Überweisungsbeleg ein. Wir bestätigen dein Projekt, sobald die Überweisung gutgeschrieben und geprüft wurde.",
      payerEmailLabel: "Zahlungs- / Beleg-E-Mail", transferEmailLabel: "E-Mail auf dem Überweisungsbeleg", transactionLabelPayPal: "PayPal-Transaktions-ID",
      transactionLabelMercadoPago: "Mercado Pago Vorgangs-ID", transactionLabelTransfer: "Überweisungs-ID / Referenz", arsAmountLabel: "Gezahlter Betrag (ARS)", transferSenderLabel: "Name des Absenderkontos",
      projectDetails: "PROJEKTDATEN", contactNameLabel: "Dein Name", contactEmailLabel: "Kontakt-E-Mail", projectTitleLabel: "Titel des Tracks oder der EP",
      downloadLabel: "Privater Download-Link zu deinen Dateien", downloadHelp: "Lade deine WAVs oder Stems zu Google Drive, Dropbox, WeTransfer oder einem ähnlichen Dienst hoch. Teile einen privaten HTTPS-Download-Link, der ohne Freigabeanfrage funktioniert. Halte ihn bis zur Lieferung aktiv. Diese Seite lädt keine Dateien hoch. Ein DAW-Projekt sende bitte nur auf Anfrage.",
      accessLabel: "Zugangshinweise", accessHelp: "Wenn der Link ein Passwort oder eine Freigabe benötigt, beschreibe den Zugang. Sende keine Zugangsdaten für dein Benutzerkonto.",
      referencesLabel: "Klangreferenzen", notesLabel: "Klangwünsche und Hinweise", openDraft: "E-Mail-Entwurf öffnen", copyDetails: "Übergabeangaben kopieren",
      sendNote: "Diese Seite öffnet nur einen Entwurf. Klicke in deinem E-Mail-Programm auf Senden, um die Angaben an Tonart zu übermitteln. Du kannst den Entwurf vorher bearbeiten.",
      manualCopyLabel: "Kopiere diesen Text in eine E-Mail an tonart.space@gmail.com", guideKicker: "DATEI-CHECKLISTE", guideTitle: "Mach deine Dateien<br /><em>startklar.</em>", forService: "FÜR DIE GEWÄHLTE LEISTUNG",
      guide1: "Benenne jede Datei klar mit Künstlername und Tracktitel.", guide2: "Exportiere Audio mit der ursprünglichen Samplerate und Bittiefe der Session. WAV ist bevorzugt.",
      guide3: "Prüfe, ob der Download ohne Anmeldung bei deinem Konto funktioniert.", needHelpKicker: "FRAGEN VOR DEM VERSAND?", needHelpText: "Wenn deine Dateien nicht zum Angebot passen oder du Produktionsarbeit brauchst, schreib uns vor der Übergabe eine E-Mail.",
      footer: "MIXING / MASTERING / MUSIKPRODUKTION", legal: "IMPRESSUM ↗", chooseHint: "Wähle die bezahlte Leistung, um die passende Datei-Checkliste zu sehen.",
      hints: {
        stereo: "Sende einen finalen Stereo-WAV-Mix. Lass etwas Spitzenpegel-Reserve und entferne einen Limiter, den du nur zum Vorhören verwendet hast. Ein Referenzmix ist hilfreich.",
        stem: "Sende bis zu vier gruppierte Stereo-WAV-Stems. Exportiere alle ab demselben Startpunkt, damit sie synchron sind und zusammen deinen Mix ergeben.",
        mix: "Sende bis zu 24 einzelne WAV-Audiospuren, alle ab demselben Startpunkt exportiert. Lege einen Rohmix und Hinweise zu wichtigen Effekten oder Produktionsdetails bei.",
        epStereo: "Sende alle {count} finalen Stereo-WAV-Mixe zusammen, mit klaren Tracknamen und der Reihenfolge. Jeder Track darf bis zu 10 Minuten lang sein.",
        epStem: "Sende alle {count} Tracks zusammen. Pro Track bis zu vier gruppierte Stereo-WAV-Stems, die ab demselben Startpunkt exportiert wurden.",
        epMix: "Sende alle {count} Tracks zusammen. Pro Track bis zu 24 synchronisierte WAV-Spuren, einen Rohmix und die geplante Reihenfolge.",
      },
      httpsError: "Gib einen gültigen HTTPS-Download-Link ein, der mit https:// beginnt.", invalid: "Fülle die Pflichtfelder aus und prüfe den Download-Link.",
      draftStatus: "Wenn sich dein E-Mail-Programm öffnet, prüfe den Entwurf und klicke dort auf Senden. Diese Seite hat noch nichts verschickt. Falls sich nichts öffnet, kopiere die Übergabeangaben.",
      copied: "Übergabeangaben kopiert. Füge sie in eine E-Mail an tonart.space@gmail.com ein und klicke auf Senden.",
      copyFailed: "Automatisches Kopieren ist nicht verfügbar. Markiere den Text unten, kopiere ihn und sende ihn an tonart.space@gmail.com.",
      tooLong: "Dein Projekt-Link macht den E-Mail-Entwurf zu lang, um ihn zuverlässig zu öffnen. Kopiere die Angaben unten und sende sie an tonart.space@gmail.com.",
    },
  };

  const form = document.getElementById("handover-form");
  const languageSelect = document.getElementById("language-select");
  const serviceSelect = document.getElementById("service-select");
  const paymentMethodSelect = document.getElementById("payment-method");
  const payerEmailInput = document.getElementById("payer-email");
  const paymentAmountInput = document.getElementById("payment-amount");
  const transferSenderInput = document.getElementById("transfer-sender");
  const downloadInput = document.getElementById("download-url");
  const status = document.getElementById("handover-status");
  const manualCopy = document.getElementById("manual-copy");
  const manualCopyText = document.getElementById("manual-copy-text");
  const savedLanguage = (() => { try { return localStorage.getItem("tonart-language"); } catch { return null; } })();
  const browserLanguage = (navigator.language || "").toLowerCase();
  let language = ["en", "es", "de"].includes(savedLanguage) ? savedLanguage : browserLanguage.startsWith("es") ? "es" : browserLanguage.startsWith("de") ? "de" : "en";

  function renderServices() {
    const current = serviceSelect.value;
    serviceSelect.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = copy[language].servicePlaceholder;
    serviceSelect.append(placeholder);
    for (const [key, offer] of Object.entries(offers)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = offer[language];
      serviceSelect.append(option);
    }
    serviceSelect.value = offers[current] ? current : "";
    renderServiceHint();
  }

  function renderServiceHint() {
    const offer = offers[serviceSelect.value];
    const t = copy[language];
    const priceLabel = paymentMethodSelect.value === "paypal" ? t.price : t.listedPrice;
    document.getElementById("service-price").textContent = offer ? `${priceLabel}${offer.price}` : "";
    document.getElementById("file-hint").textContent = offer ? t.hints[offer.type].replace("{count}", offer.count ?? "") : t.chooseHint;
    const service = serviceSelect.value.replace(/-(4|5|6)$/, "");
    const tracks = offer?.count > 3 ? `&tracks=${offer.count}` : "";
    const payment = paymentMethodSelect.value !== "paypal" ? `&payment=${encodeURIComponent(paymentMethodSelect.value)}` : "";
    document.getElementById("booking-back").href = offer ? `booking.html?service=${encodeURIComponent(service)}${tracks}${payment}` : "booking.html";
  }

  function renderPaymentMethod() {
    const t = copy[language];
    const method = paymentMethodSelect.value;
    paymentMethodSelect.querySelector('[value="paypal"]').textContent = t.methodPayPal;
    paymentMethodSelect.querySelector('[value="mercadopago"]').textContent = t.methodMercadoPago;
    paymentMethodSelect.querySelector('[value="transfer"]').textContent = t.methodTransfer;
    document.getElementById("payment-method-help").textContent = method === "transfer" ? t.methodHelpTransfer : method === "mercadopago" ? t.methodHelpMercadoPago : t.methodHelpPayPal;
    document.getElementById("payer-email-label").textContent = method === "transfer" ? t.transferEmailLabel : t.payerEmailLabel;
    document.getElementById("payer-email-required").hidden = method === "transfer";
    const optionalEmail = document.getElementById("payer-email-optional");
    optionalEmail.hidden = method !== "transfer";
    optionalEmail.textContent = t.optional;
    payerEmailInput.required = method !== "transfer";
    document.getElementById("transaction-label").textContent = method === "transfer" ? t.transactionLabelTransfer : method === "mercadopago" ? t.transactionLabelMercadoPago : t.transactionLabelPayPal;
    document.getElementById("ars-payment-fields").hidden = method === "paypal";
    paymentAmountInput.required = method !== "paypal";
    document.getElementById("transfer-sender-field").hidden = method !== "transfer";
    transferSenderInput.required = method === "transfer";
    renderServiceHint();
  }

  function renderLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    languageSelect.value = language;
    const t = copy[language];
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]').content = t.metaDescription;
    document.querySelectorAll("[data-handover-i18n]").forEach((node) => {
      node.textContent = t[node.dataset.handoverI18n];
    });
    document.querySelectorAll("[data-handover-i18n-html]").forEach((node) => {
      node.innerHTML = t[node.dataset.handoverI18nHtml];
    });
    document.querySelector(".handover-process").setAttribute("aria-label", t.processLabel);
    document.querySelector(".handover-header .wordmark").setAttribute("aria-label", t.homeLabel);
    downloadInput.setCustomValidity("");
    status.textContent = "";
    renderServices();
    renderPaymentMethod();
  }

  function validateForm() {
    downloadInput.setCustomValidity("");
    const link = downloadInput.value.trim();
    if (link) {
      try {
        const url = new URL(link);
        if (url.protocol !== "https:" || !url.hostname) throw new Error("Invalid HTTPS URL");
      } catch {
        downloadInput.setCustomValidity(copy[language].httpsError);
      }
    }
    if (!form.reportValidity()) {
      status.textContent = copy[language].invalid;
      return false;
    }
    status.textContent = "";
    return true;
  }

  function value(id) {
    return document.getElementById(id).value.trim();
  }

  function emailContent() {
    const offer = offers[serviceSelect.value];
    const method = paymentMethodSelect.value;
    const projectTitle = value("project-title");
    const subject = `Tonart handover | ${serviceSelect.value} | ${projectTitle.slice(0, 70)}`;
    const body = [
      "TONART PROJECT HANDOVER",
      "",
      `Service: ${offer.en}`,
      `Service key: ${serviceSelect.value}`,
      `Payment method: ${method === "transfer" ? "Transfer to Mercado Pago alias / CVU" : method === "mercadopago" ? "Mercado Pago payment link" : "PayPal"}`,
      `${method === "paypal" ? "Offer price" : "Listed offer price"}: USD $${offer.price}`,
      `Checkout / receipt email: ${value("payer-email") || "Not provided"}`,
      `${method === "transfer" ? "Transfer operation / reference ID" : method === "mercadopago" ? "Mercado Pago operation ID" : "Buyer PayPal transaction ID"}: ${value("transaction-id") || "Not available"}`,
      ...(method === "paypal" ? [] : [`Amount paid: ARS $${value("payment-amount")}`]),
      ...(method === "transfer" ? [`Name on the sending account: ${value("transfer-sender")}`] : []),
      "",
      `Contact name: ${value("contact-name")}`,
      `Contact email: ${value("contact-email")}`,
      `Track / EP title: ${projectTitle}`,
      `Private HTTPS download link: ${value("download-url")}`,
      `Access instructions: ${value("access-instructions") || "None"}`,
      `Sound references: ${value("references") || "None"}`,
      `Direction and notes: ${value("notes") || "None"}`,
      "",
      `Customer site language: ${language}`,
      "Tonart will check the payment, service, amount and usable files before confirming the first-preview date.",
    ].join("\n");
    return { subject, body };
  }

  function showManualCopy(content) {
    manualCopyText.value = `To: ${recipient}\nSubject: ${content.subject}\n\n${content.body}`;
    manualCopy.hidden = false;
    manualCopyText.focus();
    manualCopyText.select();
  }

  languageSelect.addEventListener("change", () => {
    renderLanguage(languageSelect.value);
    try { localStorage.setItem("tonart-language", language); } catch {}
  });
  serviceSelect.addEventListener("change", renderServiceHint);
  paymentMethodSelect.addEventListener("change", renderPaymentMethod);
  downloadInput.addEventListener("input", () => downloadInput.setCustomValidity(""));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const content = emailContent();
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(content.subject)}&body=${encodeURIComponent(content.body)}`;
    if (mailto.length > maxMailtoLength) {
      showManualCopy(content);
      status.textContent = copy[language].tooLong;
      return;
    }
    manualCopy.hidden = true;
    status.textContent = copy[language].draftStatus;
    window.location.href = mailto;
  });

  document.getElementById("copy-details").addEventListener("click", async () => {
    if (!validateForm()) return;
    const content = emailContent();
    const details = `To: ${recipient}\nSubject: ${content.subject}\n\n${content.body}`;
    try {
      await navigator.clipboard.writeText(details);
      manualCopy.hidden = true;
      status.textContent = copy[language].copied;
    } catch {
      showManualCopy(content);
      status.textContent = copy[language].copyFailed;
    }
  });

  renderLanguage(language);
  const urlParams = new URLSearchParams(window.location.search);
  const serviceFromUrl = urlParams.get("service");
  if (serviceFromUrl && offers[serviceFromUrl]) {
    serviceSelect.value = serviceFromUrl;
    renderServiceHint();
  }
  const paymentFromUrl = urlParams.get("payment") || urlParams.get("method");
  if (["paypal", "mercadopago", "transfer"].includes(paymentFromUrl)) {
    paymentMethodSelect.value = paymentFromUrl;
    renderPaymentMethod();
  }
})();
