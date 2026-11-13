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
    "ep-stereo-4": "https://www.paypal.com/ncp/payment/39WWMDV7A299G",
    "ep-stereo-5": "https://www.paypal.com/ncp/payment/7G3H75ERYRSGL",
    "ep-stereo-6": "https://www.paypal.com/ncp/payment/XH6YSYGNYR768",
    "ep-stem-4": "https://www.paypal.com/ncp/payment/4XBEQ5MKNHELU",
    "ep-stem-5": "https://www.paypal.com/ncp/payment/L4KFNWCRGHWTN",
    "ep-stem-6": "https://www.paypal.com/ncp/payment/CNYZ2B6CDSB6G",
    "ep-mixmaster-4": "https://www.paypal.com/ncp/payment/RYG4775NV2VZY",
    "ep-mixmaster-5": "https://www.paypal.com/ncp/payment/KBEQVJWXP5LNU",
    "ep-mixmaster-6": "https://www.paypal.com/ncp/payment/UGBMYWJFMDPV6",
  };
  // Mercado Pago Argentina collects ARS. Refresh these three values together
  // from the chosen DolarHoy USD/ARS selling quote. Use the source's last-update
  // time. An ISO timestamp must include a timezone offset; amounts disappear
  // 24 hours after the source update. If any
  // value is unset, customers can request an exact ARS quote by email.
  const USD_ARS_SELL_RATE = 1565;
  const USD_ARS_RATE_LABEL = "DolarHoy dólar blue venta";
  const USD_ARS_RATE_CHECKED_AT = "2026-11-12T21:17:00-03:00";
  const MERCADO_PAGO_LINK = "https://link.mercadopago.com.ar/tonart";
  const TRANSFER_ALIAS = "enrique.berlin";
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
      en: { name: "4–6-track EP — stereo mastering", summary: "Stereo mastering for 4–6 tracks, each up to 10 minutes, from final stereo mixes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "Submit all 4–6 tracks together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 4–6 temas — masterización estéreo", summary: "Masterización estéreo de 4–6 temas de hasta 10 minutos cada uno, a partir de mezclas finales.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 4–6 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
      de: { name: "EP mit 4–6 Tracks — Stereo-Mastering", summary: "Stereo-Mastering für 4–6 Tracks bis je 10 Minuten auf Basis der finalen Stereo-Mixe.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "1 gebündelte Korrekturrunde pro Track", caveat: "Bitte reiche alle 4–6 Tracks zusammen ein. Wir bestätigen den Zeitplan der EP vor Arbeitsbeginn." },
    },
    "ep-stem": {
      price: 179,
      en: { name: "4–6-track EP — stem mastering", summary: "Stem mastering for 4–6 tracks, each up to 4 aligned grouped stems and 10 minutes.", timeline: "Agreed after file review", revisions: "1 consolidated round per track", caveat: "Submit all 4–6 tracks together. We confirm the EP timeline before work begins." },
      es: { name: "EP de 4–6 temas — masterización por stems", summary: "Masterización de 4–6 temas, cada uno de hasta 4 stems agrupados y alineados y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "1 ronda por tema", caveat: "Envía los 4–6 temas juntos. Confirmamos el plazo del EP antes de comenzar." },
      de: { name: "EP mit 4–6 Tracks — Stem-Mastering", summary: "Stem-Mastering für 4–6 Tracks bis je 10 Minuten und mit jeweils bis zu 4 gruppierten, zeitlich ausgerichteten Stems.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "1 gebündelte Korrekturrunde pro Track", caveat: "Bitte reiche alle 4–6 Tracks zusammen ein. Wir bestätigen den Zeitplan der EP vor Arbeitsbeginn." },
    },
    "ep-mixmaster": {
      price: 399,
      en: { name: "4–6-track EP — mixing + mastering", summary: "Mixing and mastering for 4–6 tracks, each up to 24 aligned audio tracks and 10 minutes.", timeline: "Agreed after file review", revisions: "2 mix rounds + 1 master round per track", caveat: "Submit all 4–6 tracks together. Editing, tuning and new production are not included." },
      es: { name: "EP de 4–6 temas — mezcla + masterización", summary: "Mezcla y masterización de 4–6 temas, cada uno de hasta 24 pistas alineadas y 10 minutos.", timeline: "A acordar tras revisar archivos", revisions: "2 rondas de mezcla + 1 de máster por tema", caveat: "Envía los 4–6 temas juntos. No incluye edición, afinación ni nueva producción." },
      de: { name: "EP mit 4–6 Tracks — Mixing + Mastering", summary: "Mixing und Mastering für 4–6 Tracks mit jeweils bis zu 24 zeitlich ausgerichteten Audiospuren und 10 Minuten Länge.", timeline: "Nach Sichtung der Dateien vereinbart", revisions: "2 Mix-Korrekturen + 1 Master-Korrektur pro Track", caveat: "Bitte reiche alle 4–6 Tracks zusammen ein. Editing, Tonhöhenkorrektur und zusätzliche Produktion sind nicht enthalten." },
    },
  };

  const translations = {
    skip: "Ir al contenido", back: "Volver a precios", eyebrow: "TONART / RESERVA DE PROYECTO",
    title: "Un buen sonido empieza<br /><em>con una buena idea.</em>",
    lede: "Elige una oferta de lanzamiento. Paga en USD con PayPal o consulta el importe actual en ARS para Mercado Pago o transferencia. Luego envíanos tu música y los datos del proyecto.",
    choose: "ELIGE TU SERVICIO", offerTitle: "Tu oferta", serviceLabel: "SERVICIO", epTrackCountLabel: "TEMAS DE TU EP",
    timelineLabel: "PRIMERA VERSIÓN", revisionLabel: "RONDAS DE CAMBIOS",
    payButton: "Pagar con tarjeta o PayPal",
    payNote: "El pago seguro se abre en PayPal en otra pestaña. Se aceptan tarjetas de débito y crédito; la opción de pagar sin cuenta de PayPal puede variar según el comprador y el país. Comprueba el vendedor y el importe antes de pagar. El idioma del pago puede ser distinto al de esta página.",
    arsTitle: "¿Pagas desde Argentina?", arsIntro: "Mercado Pago y las transferencias a Mercado Pago se cobran en pesos argentinos. Pídenos el importe exacto en ARS para esta oferta antes de pagar.",
    mpTitle: "Mercado Pago", mpAmountLabel: "Importe a ingresar", mpQuoteButton: "Pedir cotización en ARS", mpQuoteNote: "Te enviaremos el importe exacto en ARS. Ingresa solo ese importe en el link; el vendedor aparecerá como Enrique Herranz. Comprueba los datos antes de pagar.", mpPayButton: "Pagar el importe indicado en ARS",
    transferTitle: "Transferencia a Mercado Pago", transferAmountLabel: "Importe a transferir", transferQuoteButton: "Pedir importe en ARS", transferQuoteNote: "Espera nuestra confirmación del importe exacto en ARS antes de transferir al alias indicado. Comprueba el destinatario en tu banco o billetera.", transferAliasLabel: "Alias de destino", arsHandoverButton: "¿Ya pagaste? Envía los datos del proyecto",
    payPendingNote: "El pago en línea no está disponible temporalmente. Contacta con Tonart antes de pagar.",
    epPayPendingNote: "El pago en línea para esta opción de EP no está disponible temporalmente. Escríbenos antes de pagar.",
    epContactButton: "Escríbenos por este EP",
    handoverPrompt: "¿Ya pagaste con PayPal? Envíanos tu música y los datos del proyecto.", handoverButton: "Enviar datos del proyecto", handoverNote: "¿Ya pagaste? Elige tu método de pago en la página de entrega. Puedes volver más tarde sin pagar otra vez.",
    next: "QUÉ SIGUE", stepsTitle: "Paga. Envía. Confirma.",
    step1Title: "Paga tu servicio", step1Text: "Paga el importe indicado en USD con PayPal. Para Mercado Pago o transferencia, usa el importe actual en ARS de abajo o pide una cotización actualizada. Conserva el comprobante o la referencia de la transferencia.",
    step2Title: "Envía los datos del proyecto", step2Text: "Usa la página de entrega para enviar los datos del tema, el método y comprobante de pago y un enlace privado de descarga de los archivos finales.",
    step3Title: "Comprobamos y confirmamos", step3Text: "Vinculamos el pago con tu proyecto, revisamos los archivos y el alcance, y confirmamos la fecha de la primera versión. El plazo comienza al recibir el pago y archivos utilizables.",
    faqKicker: "ANTES DE PAGAR", faqTitle: "Algunos detalles<br /><em>útiles.</em>",
    faq1Title: "¿Cuándo empieza el plazo?", faq1Text: "Después de recibir el pago, tu brief y los archivos finales utilizables, y confirmar el alcance. Los días hábiles excluyen fines de semana y feriados. Los plazos indicados son para una primera versión, no para todo el proceso de cambios.",
    faq2Title: "¿Y si mi proyecto supera los límites de la oferta?", faq2Text: "Escríbenos antes de pagar si el tema dura más de 10 minutos, tiene más pistas o stems que los incluidos, o necesita edición, afinación, producción o versiones alternativas.",
    faq3Title: "¿La reserva es instantánea?", faq3Text: "El pago o la transferencia no confirma el proyecto por sí solo. Lo confirmamos después de verificar el importe recibido, los archivos y la disponibilidad. Si la oferta no corresponde, te propondremos una nueva cotización o el reintegro completo antes de comenzar.",
    faq4Title: "¿Cómo vinculan mi pago con mi música?", faq4Text: "Después de pagar, usa la página de entrega del proyecto. Indica el método de pago, el comprobante o referencia de la transferencia, los datos del pagador y un enlace privado de descarga. Verificamos el pago en la cuenta receptora antes de confirmar el proyecto.",
    terms: "Estas son tarifas introductorias. Los cambios incluidos se aplican al material enviado; nuevas grabaciones o cambios importantes de arreglo requieren un nuevo alcance. Tus derechos legales siguen vigentes.",
    policiesKicker: "POLÍTICAS DE PEDIDO", policiesTitle: "Expectativas claras<br /><em>para ambas partes.</em>",
    refundTitle: "Cancelaciones y reintegros", refundText: "Si cancelas antes de que comience el trabajo, o si no podemos aceptar tus archivos dentro del alcance de la oferta, reintegramos el pago completo. Una vez iniciado el trabajo, escríbenos para resolver el problema; cualquier reintegro se evalúa según la ley aplicable y el trabajo ya entregado. Tus derechos legales siguen vigentes.",
    privacyTitle: "Privacidad y tu música", privacyText: "Este sitio guarda tu elección de idioma en el navegador y carga fuentes de Google. PayPal o Mercado Pago procesa los pagos en línea; tu banco o billetera procesa las transferencias; tu proveedor de correo transmite la cotización y los datos del proyecto; el servicio de archivos que elijas aloja el audio. Usamos tus datos de contacto y pago, el brief y el audio para trabajar en tu proyecto. No publicamos tu música sin permiso. Puedes pedir por correo que borremos los archivos del proyecto después de la entrega.",
    cancelRequest: "Solicitudes de cancelación o desistimiento",
    footer: "MEZCLA / MASTERIZACIÓN / PRODUCCIÓN MUSICAL", policiesLink: "POLÍTICAS ↑", legalLink: "AVISO LEGAL ↗", contact: "CONTACTO ↗",
  };
  const germanTranslations = {
    skip: "Zum Inhalt springen", back: "Zurück zu den Preisen", eyebrow: "TONART / PROJEKT BUCHEN",
    title: "Guter Sound beginnt<br /><em>mit einem guten Briefing.</em>",
    lede: "Wähle ein Einführungsangebot. Bezahle in USD mit PayPal oder prüfe den aktuellen ARS-Betrag für Mercado Pago oder eine Überweisung. Sende uns danach deine Musik und Projektdaten.",
    choose: "SERVICE WÄHLEN", offerTitle: "Dein Angebot", serviceLabel: "SERVICE", epTrackCountLabel: "TRACKS AUF DEINER EP",
    timelineLabel: "ERSTE VERSION", revisionLabel: "KORREKTURRUNDEN",
    payButton: "Mit Karte oder PayPal bezahlen",
    payNote: "Die sichere Zahlungsseite von PayPal öffnet sich in einem neuen Tab. Debit- und Kreditkarten werden akzeptiert; die Zahlung ohne PayPal-Konto wird nicht für alle Käufer oder Länder angeboten. Prüfe Anbieter und Gesamtbetrag vor der Zahlung. Die Zahlungsseite kann in einer anderen Sprache erscheinen.",
    arsTitle: "Zahlung aus Argentinien?", arsIntro: "Mercado Pago und Überweisungen an Mercado Pago erfolgen in argentinischen Pesos. Frage vor der Zahlung den genauen ARS-Betrag für dieses Angebot an.",
    mpTitle: "Mercado Pago", mpAmountLabel: "Einzugebender Betrag", mpQuoteButton: "ARS-Angebot anfragen", mpQuoteNote: "Wir senden dir den genauen ARS-Betrag. Gib im Zahlungslink nur diesen Betrag ein; als Anbieter erscheint Enrique Herranz. Prüfe die Angaben vor der Zahlung.", mpPayButton: "Angezeigten ARS-Betrag bezahlen",
    transferTitle: "Überweisung an Mercado Pago", transferAmountLabel: "Zu überweisender Betrag", transferQuoteButton: "ARS-Betrag anfragen", transferQuoteNote: "Warte auf unsere Bestätigung des genauen ARS-Betrags, bevor du an den angegebenen Alias überweist. Prüfe den Empfänger in deiner Bank oder Wallet.", transferAliasLabel: "Empfänger-Alias", arsHandoverButton: "Schon bezahlt? Projektdaten senden",
    payPendingNote: "Die Online-Zahlung ist vorübergehend nicht verfügbar. Kontaktiere Tonart bitte vor einer Zahlung.",
    epPayPendingNote: "Die Online-Zahlung für diese EP-Option ist vorübergehend nicht verfügbar. Kontaktiere uns vor der Zahlung.",
    epContactButton: "EP per E-Mail anfragen",
    handoverPrompt: "Schon mit PayPal bezahlt? Sende uns deine Musik und Projektdaten.", handoverButton: "Projektdaten senden", handoverNote: "Schon bezahlt? Wähle auf der Übergabeseite deine Zahlungsart. Du kannst später zurückkehren, ohne erneut zu bezahlen.",
    next: "SO GEHT ES WEITER", stepsTitle: "Bezahlen. Senden. Bestätigen.",
    step1Title: "Service bezahlen", step1Text: "Bezahle den angezeigten USD-Betrag mit PayPal. Für Mercado Pago oder eine Überweisung nutze den aktuellen ARS-Betrag unten oder frage ein neues Angebot an. Bewahre Beleg oder Überweisungsreferenz auf.",
    step2Title: "Projektdaten senden", step2Text: "Sende über die Übergabeseite Trackdaten, Zahlungsart und Beleg sowie einen privaten Download-Link zu den finalen Dateien.",
    step3Title: "Wir prüfen und bestätigen", step3Text: "Wir ordnen deine Zahlung zu, prüfen Dateien und Leistungsumfang und bestätigen den Termin der ersten Version. Die Bearbeitungszeit beginnt, wenn Zahlung und verwendbare Dateien vorliegen.",
    faqKicker: "VOR DER ZAHLUNG", faqTitle: "Ein paar wichtige<br /><em>Details.</em>",
    faq1Title: "Wann beginnt die Bearbeitungszeit?", faq1Text: "Sobald Zahlung, Briefing und verwendbare finale Dateien eingegangen sind und wir den Leistungsumfang bestätigt haben. Wochenenden und Feiertage zählen nicht als Arbeitstage. Die angegebenen Zeiten gelten für die erste Version, nicht für den gesamten Korrekturprozess.",
    faq2Title: "Was, wenn mein Projekt über den Angebotsumfang hinausgeht?", faq2Text: "Schreibe uns vor der Zahlung, wenn der Track länger als 10 Minuten ist, mehr Spuren oder Stems enthält als im Angebot vorgesehen oder Editing, Tonhöhenkorrektur, Produktion oder alternative Versionen benötigt.",
    faq3Title: "Ist die Buchung sofort bestätigt?", faq3Text: "Eine Zahlung oder Überweisung bestätigt das Projekt nicht automatisch. Wir bestätigen es nach Prüfung des eingegangenen Betrags, der Dateien und unserer Verfügbarkeit. Falls das Angebot nicht passt, bieten wir vor Arbeitsbeginn ein angepasstes Angebot oder eine vollständige Erstattung an.",
    faq4Title: "Wie ordnet ihr meine Zahlung meiner Musik zu?", faq4Text: "Nutze nach der Zahlung die Projekt-Übergabeseite. Gib Zahlungsart, Beleg oder Überweisungsreferenz, Angaben zum Zahlenden und einen privaten Download-Link an. Wir prüfen den Zahlungseingang im Empfängerkonto, bevor wir dein Projekt bestätigen.",
    terms: "Dies sind Einführungspreise. Die enthaltenen Korrekturen beziehen sich auf das eingereichte Material. Neue Aufnahmen oder größere Änderungen am Arrangement erfordern eine neue Vereinbarung. Deine gesetzlichen Rechte bleiben unberührt.",
    policiesKicker: "BESTELLBEDINGUNGEN", policiesTitle: "Klare Absprachen<br /><em>für beide Seiten.</em>",
    refundTitle: "Stornierungen und Erstattungen", refundText: "Wenn du vor Arbeitsbeginn stornierst oder wir deine Dateien im Rahmen des Angebots nicht annehmen können, erstatten wir die Zahlung vollständig. Hat die Arbeit bereits begonnen, kontaktiere uns bitte, damit wir das Problem lösen können. Eine Erstattung richtet sich dann nach geltendem Recht und den bereits erbrachten Leistungen. Deine gesetzlichen Rechte bleiben unberührt.",
    privacyTitle: "Datenschutz und deine Musik", privacyText: "Diese Website speichert deine Sprachauswahl im Browser und lädt Schriftarten von Google. PayPal oder Mercado Pago verarbeitet Online-Zahlungen; deine Bank oder Wallet verarbeitet Überweisungen; dein E-Mail-Anbieter übermittelt Angebots- und Projektdaten; der von dir gewählte Dateidienst speichert die Audiodateien. Wir verwenden deine Kontakt- und Zahlungsdaten, dein Briefing und die Audiodateien zur Bearbeitung deines Projekts. Wir veröffentlichen deine Musik nicht ohne Erlaubnis. Nach der Lieferung kannst du per E-Mail die Löschung der Projektdateien verlangen.",
    cancelRequest: "Anfragen zu Stornierung oder Widerruf",
    footer: "MIXING / MASTERING / MUSIKPRODUKTION", policiesLink: "BEDINGUNGEN ↑", legalLink: "IMPRESSUM ↗", contact: "KONTAKT ↗",
  };
  const localizedTranslations = { es: translations, de: germanTranslations };
  const quoteCopy = {
    en: {
      mercadoPago: "Mercado Pago",
      transfer: "transfer to Mercado Pago",
      subject: "Tonart ARS quote",
      greeting: "Hello Tonart,",
      request: "Please send me the exact ARS amount and payment instructions for this offer before I pay.",
      confirmRequest: "Please confirm the displayed ARS amount for this offer before I pay.",
      method: "Payment method",
      offer: "Offer",
      tracks: "Tracks in EP",
      usd: "Listed USD price",
      ars: "Displayed ARS amount",
    },
    es: {
      mercadoPago: "Mercado Pago",
      transfer: "transferencia a Mercado Pago",
      subject: "Cotización Tonart en ARS",
      greeting: "Hola, Tonart:",
      request: "Por favor, envíenme el importe exacto en ARS y las instrucciones antes de pagar esta oferta.",
      confirmRequest: "Por favor, confirmen el importe en ARS indicado para esta oferta antes de pagar.",
      method: "Método de pago",
      offer: "Oferta",
      tracks: "Temas del EP",
      usd: "Precio publicado en USD",
      ars: "Importe indicado en ARS",
    },
    de: {
      mercadoPago: "Mercado Pago",
      transfer: "Überweisung an Mercado Pago",
      subject: "Tonart-Angebot in ARS",
      greeting: "Hallo Tonart,",
      request: "Bitte sendet mir vor der Zahlung den genauen ARS-Betrag und die Zahlungsanleitung für dieses Angebot.",
      confirmRequest: "Bitte bestätigt mir vor der Zahlung den angezeigten ARS-Betrag für dieses Angebot.",
      method: "Zahlungsart",
      offer: "Angebot",
      tracks: "Tracks auf der EP",
      usd: "Angezeigter USD-Preis",
      ars: "Angezeigter ARS-Betrag",
    },
  };
  const rateCopy = {
    en: {
      locale: "en-US",
      activeIntro: "These ARS amounts use the DolarHoy selling rate shown below. Enter or transfer exactly the amount shown while it is current; you can also ask us to confirm it.",
      rateMeta: (label, rate, checked) => `${label}: ARS ${rate} per USD. Source updated ${checked} (Buenos Aires time). Amounts are rounded to whole pesos and shown for 24 hours after that update.`,
      mpNote: "Enter exactly the shown ARS amount at the variable-amount link. The merchant appears as Enrique Herranz; review the details before paying.",
      transferNote: "Transfer exactly the shown ARS amount to the alias below. Check the recipient in your bank or wallet.",
      confirm: "Ask us to confirm this amount",
    },
    es: {
      locale: "es-AR",
      activeIntro: "Estos importes en ARS usan la cotización de venta de DolarHoy indicada abajo. Ingresa o transfiere exactamente el importe mostrado mientras esté vigente; también puedes pedirnos confirmación.",
      rateMeta: (label, rate, checked) => `${label}: ARS ${rate} por USD. Fuente actualizada el ${checked} (hora de Buenos Aires). Los importes se redondean a pesos enteros y se muestran durante 24 horas desde esa actualización.`,
      mpNote: "Ingresa exactamente el importe indicado en ARS en el link de monto variable. El vendedor aparece como Enrique Herranz; comprueba los datos antes de pagar.",
      transferNote: "Transfiere exactamente el importe indicado en ARS al alias de abajo. Comprueba el destinatario en tu banco o billetera.",
      confirm: "Pedir confirmación de este importe",
    },
    de: {
      locale: "de-DE",
      activeIntro: "Diese ARS-Beträge beruhen auf dem unten angegebenen DolarHoy-Verkaufskurs. Gib den angezeigten Betrag ein oder überweise ihn, solange er aktuell ist; du kannst ihn auch von uns bestätigen lassen.",
      rateMeta: (label, rate, checked) => `${label}: ARS ${rate} je USD. Quelle aktualisiert am ${checked} (Ortszeit Buenos Aires). Die Beträge werden auf ganze Pesos gerundet und 24 Stunden nach dieser Aktualisierung angezeigt.`,
      mpNote: "Gib im Link mit frei wählbarem Betrag genau den angezeigten ARS-Betrag ein. Als Anbieter erscheint Enrique Herranz; prüfe die Angaben vor der Zahlung.",
      transferNote: "Überweise genau den angezeigten ARS-Betrag an den Alias unten. Prüfe den Empfänger in deiner Bank oder Wallet.",
      confirm: "Diesen Betrag bestätigen lassen",
    },
  };
  const select = document.getElementById("service-select");
  const epTrackChoice = document.getElementById("ep-track-choice");
  const epTrackCountSelect = document.getElementById("ep-track-count");
  const languageSelect = document.getElementById("language-select");
  const payButton = document.getElementById("pay-button");
  const arsIntro = document.querySelector(".ars-intro");
  const arsRateMeta = document.getElementById("ars-rate-meta");
  const mpAmountRow = document.getElementById("mp-ars-amount");
  const mpAmountValue = document.getElementById("mp-ars-value");
  const transferAmountRow = document.getElementById("transfer-ars-amount");
  const transferAmountValue = document.getElementById("transfer-ars-value");
  const mpQuoteNote = document.querySelector("#mp-quote + .ars-payment-note");
  const transferQuoteNote = document.querySelector("#transfer-quote + .ars-payment-note");
  const mpQuoteButton = document.getElementById("mp-quote");
  const transferQuoteButton = document.getElementById("transfer-quote");
  const mpPayButton = document.getElementById("mp-pay-link");
  const transferAliasRow = document.getElementById("transfer-alias-row");
  const transferAliasText = document.getElementById("transfer-alias");
  const mpHandoverLink = document.getElementById("mp-handover");
  const transferHandoverLink = document.getElementById("transfer-handover");
  const epContactButton = document.getElementById("ep-contact");
  const handoverLinks = [...document.querySelectorAll("[data-handover-link]")];
  const textNodes = [...document.querySelectorAll("[data-book-i18n]")];
  const htmlNodes = [...document.querySelectorAll("[data-book-i18n-html]")];
  const originals = new Map([...textNodes, ...htmlNodes].map((node) => [node, node.innerHTML]));
  const englishTitle = document.title;
  const englishDescription = document.querySelector('meta[name="description"]')?.content;
  const initialParams = new URLSearchParams(location.search);
  const initialKey = initialParams.get("service");
  let selected = Object.hasOwn(offers, initialKey) ? initialKey : "stereo";
  let epTrackCount = [4, 5, 6].includes(Number(initialParams.get("tracks"))) ? Number(initialParams.get("tracks")) : 4;
  const browserLanguage = (navigator.language || "").toLowerCase();
  let language = browserLanguage.startsWith("de") ? "de" : browserLanguage.startsWith("es") ? "es" : "en";
  try {
    const savedLanguage = localStorage.getItem("tonart-language");
    if (["en", "es", "de"].includes(savedLanguage)) language = savedLanguage;
  } catch {}
  let arsExpiryTimer = null;

  function checkoutUrlFor(key) {
    if (!CHECKOUT_ENABLED) return "";
    const raw = PAYMENT_LINKS[key];
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return url.protocol === "https:" && ["paypal.com", "www.paypal.com"].includes(url.hostname) && url.pathname.startsWith("/ncp/payment/") ? url.href : "";
    } catch { return ""; }
  }

  function mercadoPagoUrl() {
    if (!MERCADO_PAGO_LINK) return "";
    try {
      const url = new URL(MERCADO_PAGO_LINK);
      return url.protocol === "https:" && url.hostname === "link.mercadopago.com.ar" && /^\/[A-Za-z0-9._-]+\/?$/.test(url.pathname) ? url.href : "";
    } catch { return ""; }
  }

  function currentArsRate() {
    if (typeof USD_ARS_SELL_RATE !== "number" || !Number.isFinite(USD_ARS_SELL_RATE) || USD_ARS_SELL_RATE <= 0 || !USD_ARS_RATE_LABEL.trim()) return null;
    if (!/T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/.test(USD_ARS_RATE_CHECKED_AT)) return null;
    const checkedAt = new Date(USD_ARS_RATE_CHECKED_AT);
    const age = Date.now() - checkedAt.getTime();
    if (!Number.isFinite(age) || age < -5 * 60 * 1000 || age >= 24 * 60 * 60 * 1000) return null;
    return { rate: USD_ARS_SELL_RATE, label: USD_ARS_RATE_LABEL.trim(), checkedAt };
  }

  function formatArs(amount) {
    return `ARS ${new Intl.NumberFormat(rateCopy[language].locale, { maximumFractionDigits: 0 }).format(amount)}`;
  }

  function quoteUrl(method, name, price, epCount, arsAmount) {
    const copy = quoteCopy[language];
    const methodName = method === "mercadopago" ? copy.mercadoPago : copy.transfer;
    const subject = `${copy.subject} | ${methodName} | ${name}${epCount ? ` | ${epCount}` : ""}`;
    const body = [copy.greeting, "", arsAmount ? copy.confirmRequest : copy.request, "", `${copy.method}: ${methodName}`, `${copy.offer}: ${name}`, ...(epCount ? [`${copy.tracks}: ${epCount}`] : []), `${copy.usd}: $${price}`, ...(arsAmount ? [`${copy.ars}: ${formatArs(arsAmount)}`] : []), ""].join("\n");
    return `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function isEp(key) {
    return key.startsWith("ep-");
  }

  function priceFor(key, count = epTrackCount) {
    const offer = offers[key];
    return isEp(key) ? Math.round(offer.price * count / 3) : offer.price;
  }

  function updateUrl() {
    const params = new URLSearchParams({ service: selected });
    if (isEp(selected)) params.set("tracks", String(epTrackCount));
    history.replaceState(null, "", `?${params}`);
  }

  function renderOffer() {
    const offer = offers[selected];
    const copy = offer[language];
    const ep = isEp(selected);
    select.innerHTML = Object.entries(offers).map(([key, value]) => {
      const priceLabel = isEp(key) ? `$${priceFor(key, 4)}–$${priceFor(key, 6)}` : `$${value.price}`;
      return `<option value="${key}">${value[language].name} — ${priceLabel}</option>`;
    }).join("");
    select.value = selected;
    epTrackChoice.hidden = !ep;
    epTrackCountSelect.value = String(epTrackCount);
    const price = priceFor(selected);
    document.getElementById("service-price").textContent = `$${price}`;
    document.getElementById("service-summary").textContent = copy.summary;
    document.getElementById("service-timeline").textContent = copy.timeline;
    document.getElementById("service-revisions").textContent = copy.revisions;
    document.getElementById("service-caveat").textContent = copy.caveat;
    const handoverKey = ep ? `${selected}-${epTrackCount}` : selected;
    const handoverUrl = `handover.html?service=${encodeURIComponent(handoverKey)}&payment=paypal`;
    for (const link of handoverLinks) link.href = handoverUrl;
    mpHandoverLink.href = `handover.html?service=${encodeURIComponent(handoverKey)}&payment=mercadopago`;
    transferHandoverLink.href = `handover.html?service=${encodeURIComponent(handoverKey)}&payment=transfer`;
    const checkedRate = currentArsRate();
    const arsAmount = checkedRate ? Math.round(price * checkedRate.rate) : 0;
    const hasArsAmounts = Boolean(checkedRate && Number.isSafeInteger(arsAmount) && arsAmount > 0);
    if (arsExpiryTimer) clearTimeout(arsExpiryTimer);
    arsExpiryTimer = hasArsAmounts
      ? setTimeout(() => { arsExpiryTimer = null; renderOffer(); }, Math.max(0, checkedRate.checkedAt.getTime() + 24 * 60 * 60 * 1000 - Date.now() + 50))
      : null;
    const rateText = rateCopy[language];
    const localized = localizedTranslations[language];
    arsIntro.textContent = hasArsAmounts ? rateText.activeIntro : localized?.arsIntro ?? originals.get(arsIntro);
    mpQuoteNote.textContent = hasArsAmounts ? rateText.mpNote : localized?.mpQuoteNote ?? originals.get(mpQuoteNote);
    transferQuoteNote.textContent = hasArsAmounts ? rateText.transferNote : localized?.transferQuoteNote ?? originals.get(transferQuoteNote);
    mpQuoteButton.querySelector("span").textContent = hasArsAmounts ? rateText.confirm : localized?.mpQuoteButton ?? "Request an ARS quote";
    transferQuoteButton.querySelector("span").textContent = hasArsAmounts ? rateText.confirm : localized?.transferQuoteButton ?? "Request the ARS amount";
    const checkedText = hasArsAmounts ? new Intl.DateTimeFormat(rateText.locale, { dateStyle: "medium", timeStyle: "short", hourCycle: "h23", timeZone: "America/Argentina/Buenos_Aires" }).format(checkedRate.checkedAt) : "";
    const exchangeText = hasArsAmounts ? new Intl.NumberFormat(rateText.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(checkedRate.rate) : "";
    arsRateMeta.textContent = hasArsAmounts ? rateText.rateMeta(checkedRate.label, exchangeText, checkedText) : "";
    arsRateMeta.hidden = !hasArsAmounts;
    mpAmountValue.textContent = hasArsAmounts ? formatArs(arsAmount) : "";
    transferAmountValue.textContent = hasArsAmounts ? formatArs(arsAmount) : "";
    mpAmountRow.hidden = !hasArsAmounts;
    transferAmountRow.hidden = !hasArsAmounts;
    mpQuoteButton.href = quoteUrl("mercadopago", copy.name, price, ep ? epTrackCount : null, hasArsAmounts ? arsAmount : 0);
    transferQuoteButton.href = quoteUrl("transfer", copy.name, price, ep ? epTrackCount : null, hasArsAmounts ? arsAmount : 0);
    const mpLink = mercadoPagoUrl();
    if (mpLink) mpPayButton.href = mpLink;
    else mpPayButton.removeAttribute("href");
    mpPayButton.hidden = !hasArsAmounts || !mpLink;
    const alias = /^[a-z0-9._-]{3,40}$/i.test(TRANSFER_ALIAS) ? TRANSFER_ALIAS : "";
    transferAliasText.textContent = alias;
    transferAliasRow.hidden = !alias;
    const subject = `Tonart EP booking | ${copy.name} | ${epTrackCount} tracks | USD $${price}`;
    epContactButton.href = `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(subject)}`;
    const checkoutUrl = checkoutUrlFor(handoverKey);
    epContactButton.hidden = !ep || Boolean(checkoutUrl);
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
    const pending = document.getElementById("pay-pending");
    pending.textContent = ep
      ? localizedTranslations[language]?.epPayPendingNote ?? "Online checkout for this EP option is temporarily unavailable. Contact us before paying."
      : localizedTranslations[language]?.payPendingNote ?? "Online checkout is temporarily unavailable. Please contact Tonart before paying.";
    pending.hidden = Boolean(checkoutUrl);
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
      ? "Elige un servicio de mezcla o masterización de Tonart, consulta los precios y organiza el pago y la entrega de archivos."
      : language === "de"
        ? "Wähle einen Mixing- oder Mastering-Service von Tonart, prüfe die Preise und vereinbare Zahlung und Projektübergabe."
        : englishDescription;
    const emailSubjects = {
      en: "Tonart cancellation request",
      es: "Solicitud de cancelación Tonart",
      de: "Tonart Stornierung oder Widerruf",
    }[language];
    document.getElementById("cancellation-email").href = `mailto:tonart.space@gmail.com?subject=${encodeURIComponent(emailSubjects)}`;
    renderOffer();
  }

  select.addEventListener("change", () => { selected = select.value; updateUrl(); renderOffer(); });
  epTrackCountSelect.addEventListener("change", () => { epTrackCount = Number(epTrackCountSelect.value); updateUrl(); renderOffer(); });
  mpPayButton.addEventListener("click", (event) => {
    if (!currentArsRate() || mpPayButton.hidden) {
      event.preventDefault();
      renderOffer();
    }
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) renderOffer(); });
  languageSelect.addEventListener("change", () => {
    language = languageSelect.value;
    try { localStorage.setItem("tonart-language", language); } catch {}
    renderLanguage();
  });
  renderLanguage();
})();
