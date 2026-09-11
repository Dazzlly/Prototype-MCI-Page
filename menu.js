document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('header-dinamico').innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a href="./index.html"><img class="site-logo" src="./images/MCI-Tw.png" alt="Motochefe Itaim"></a>
      <nav class="nav-links">
        <a href="./index.html">Início</a>
        <a href="./modelos.html">Modelos</a>
        <a href="./oficina.html">Oficina</a>
        <a href="./contato.html">Contato</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Ativar modo claro" aria-pressed="false">
          <span class="theme-toggle-icon" aria-hidden="true">☼</span>
          <span class="theme-toggle-label">Modo claro</span>
        </button>
        <a class="icon-btn" data-social-link="instagram" href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c72eff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a class="icon-btn" data-social-link="facebook" href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#148aff" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a class="btn btn-wa" data-social-link="whatsapp" href="https://wa.me/${SOCIAL_LINKS.whatsapp}" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          WhatsApp
        </a>
      </div>
      <button class="menu-toggle" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
    <nav class="mobile-menu" id="mobile-menu">
      <a href="./index.html">Início</a>
      <a href="./modelos.html">Modelos</a>
      <a href="./oficina.html">Oficina</a>
      <a href="./contato.html">Contato</a>
      <div class="mobile-social-links">
        <a class="icon-btn" data-social-link="instagram" href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c72eff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a class="icon-btn" data-social-link="facebook" href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#148aff" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
      </div>
      <button class="theme-toggle theme-toggle-mobile" type="button" data-theme-toggle aria-label="Ativar modo claro" aria-pressed="false">
        <span class="theme-toggle-icon" aria-hidden="true">☼</span>
        <span class="theme-toggle-label">Modo claro</span>
      </button>
      <a class="btn btn-wa" data-social-link="whatsapp" href="https://wa.me/${SOCIAL_LINKS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
    </nav>
  </header>
`;

  const updateThemeControls = () => {
    const isLight = ThemeController.get() === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isLight));
      button.setAttribute("aria-label", isLight ? "Ativar modo escuro" : "Ativar modo claro");
      const label = button.querySelector(".theme-toggle-label");
      const icon = button.querySelector(".theme-toggle-icon");
      if (label) label.textContent = isLight ? "Modo escuro" : "Modo claro";
      if (icon) icon.textContent = isLight ? "☾" : "☼";
    });
    document.querySelectorAll(".site-logo").forEach((logo) => {
      logo.src = isLight ? "./images/MCI-Tb.png" : "./images/MCI-Tw.png";
    });
  };

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => ThemeController.toggle());
  });
  document.addEventListener("themechange", updateThemeControls);
  updateThemeControls();
});
