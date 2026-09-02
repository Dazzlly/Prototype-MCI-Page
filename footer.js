document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('footer-dinamico').innerHTML = `
  <footer class="site-footer">
    <div class="footer-blob"></div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="./index.html"><img class="site-logo" src="./MCI-Tw.png" alt="Motochefe Itaim"></a>
          <p>Loja Oficial Motochefe em São Paulo. O melhor em Bikes, Motos e Scooters Elétricas!</p>
          <div class="social-row">
            <a class="social-ig" href="https://www.instagram.com/motochefe.itaim/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a class="social-fb" href="https://www.facebook.com/profile.php?id=61562114171718" target="_blank" rel="noopener" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a class="social-wa" href="https://wa.me/5511948711047" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navegação</h4>
          <ul><li><a href="./index.html">Início</a></li><li><a href="./modelos.html">Modelos</a></li><li><a href="./contato.html">Contato</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>Categorias</h4>
          <ul><li><a href="./modelos.html">Scooters</a></li><li><a href="./modelos.html">Bicicletas</a></li><li><a href="./modelos.html">Triciclos</a></li><li><a href="./modelos.html">Autopropelidos</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <ul>
            <li><a href="https://www.google.com/maps/search/?api=1&query=Rua+João+Cachoeira+1387+Itaim+Bibi+São+Paulo" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Rua João Cachoeira, 1387 — Itaim Bibi, SP</a></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> (11) 3044-7089</li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> atendimento@motochefeitaim.com.br</li>
          </ul>
        </div>
      </div>
      <div class="footer-base">
        <p>© <span id="year"></span> Motochefe Itaim. Todos os direitos reservados.</p>
        <p>Loja Oficial Motochefe em São Paulo</p>
      </div>
    </div>
  </footer>
`;
  document.getElementById("year").textContent = new Date().getFullYear();
});
