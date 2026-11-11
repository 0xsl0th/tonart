(() => {
  const copy = {
    en: {
      skip: "Skip to content",
      back: "Back",
      kicker: "PROVIDER & CONTACT",
      title: "Legal notice",
      subtitle: "/ Contact",
      providerTitle: "Provider",
      providerText: "Tonart is operated by Enrique Folte as an individual.",
      contactTitle: "Address & contact",
      country: "Germany",
      contactLink: "Contact ↗",
      languageLabel: "Language",
      homeLabel: "Tonart home",
      pageTitle: "Legal notice — Tonart",
      description: "Legal notice and contact details for Tonart.",
    },
    es: {
      skip: "Ir al contenido",
      back: "Volver",
      kicker: "RESPONSABLE Y CONTACTO",
      title: "Aviso legal",
      subtitle: "/ Contacto",
      providerTitle: "Responsable",
      providerText: "Tonart es operado por Enrique Folte como persona física.",
      contactTitle: "Dirección y contacto",
      country: "Alemania",
      contactLink: "Contacto ↗",
      languageLabel: "Idioma",
      homeLabel: "Inicio de Tonart",
      pageTitle: "Aviso legal — Tonart",
      description: "Aviso legal y datos de contacto de Tonart.",
    },
    de: {
      skip: "Zum Inhalt springen",
      back: "Zurück",
      kicker: "KONTAKT & ANBIETER",
      title: "Impressum",
      subtitle: "/ Kontakt",
      providerTitle: "Anbieter",
      providerText: "Tonart wird von Enrique Folte als natürliche Person betrieben.",
      contactTitle: "Anschrift & Kontakt",
      country: "Deutschland",
      contactLink: "Kontakt ↗",
      languageLabel: "Sprache",
      homeLabel: "Tonart Startseite",
      pageTitle: "Impressum — Tonart",
      description: "Impressum und Kontaktangaben für Tonart.",
    },
  };

  const languageSelect = document.getElementById("language-select");
  const languageLabel = document.getElementById("legal-language-label");
  const wordmark = document.querySelector(".impressum-header .wordmark");
  const description = document.querySelector('meta[name="description"]');
  const supported = ["en", "es", "de"];
  languageSelect?.removeAttribute("hidden");

  function initialLanguage() {
    try {
      const saved = localStorage.getItem("tonart-language");
      if (supported.includes(saved)) return saved;
    } catch {
      // Browser storage can be unavailable without affecting the page.
    }
    const browserLanguage = (navigator.language || "").toLowerCase().split(/[-_]/)[0];
    return browserLanguage === "de" || browserLanguage === "es" ? browserLanguage : "en";
  }

  function setLanguage(language) {
    const selected = copy[language] || copy.en;
    document.documentElement.lang = language;
    document.title = selected.pageTitle;
    if (description) description.content = selected.description;
    if (wordmark) wordmark.setAttribute("aria-label", selected.homeLabel);
    if (languageLabel) languageLabel.textContent = selected.languageLabel;
    if (languageSelect) languageSelect.value = language;
    for (const node of document.querySelectorAll("[data-legal-i18n]")) {
      node.textContent = selected[node.dataset.legalI18n];
    }
  }

  setLanguage(initialLanguage());
  languageSelect?.addEventListener("change", () => {
    const language = supported.includes(languageSelect.value) ? languageSelect.value : "en";
    setLanguage(language);
    try {
      localStorage.setItem("tonart-language", language);
    } catch {
      // The selection still works for this page view.
    }
  });
})();
