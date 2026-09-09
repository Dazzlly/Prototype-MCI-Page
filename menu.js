document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('header-dinamico').innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a href="./index.html"><img class="site-logo" src="./MCI-Tw.png" alt="Motochefe Itaim"></a>
      <nav class="nav-links">
        <a href="./index.html">Início</a>
        <a href="./modelos.html">Modelos</a>
        <a href="./contato.html">Contato</a>
      </nav>
      <div class="header-actions">
        <a class="icon-btn" href="https://www.instagram.com/motochefe.itaim/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c72eff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a class="icon-btn" href="https://www.facebook.com/profile.php?id=61562114171718" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#148aff" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a class="btn btn-wa" href="https://wa.me/5511948711047" target="_blank" rel="noopener">
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
      <a href="./contato.html">Contato</a>
      <a class="btn btn-wa" href="https://wa.me/5511948711047" target="_blank" rel="noopener">WhatsApp</a>
    </nav>
  </header>
`;
});
