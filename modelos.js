// Render do catálogo com busca e filtro (página Modelos)
const FILTERS = ["Todos", "Autopropelidos", "Ciclomotores", "Triciclos", "E-bikes"];

function specIcon(type) {
  // ícones SVG simples
  const zap = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
  const bat = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line><line x1="6" y1="10" x2="6" y2="14"></line><line x1="10" y1="10" x2="10" y2="14"></line><line x1="14" y1="10" x2="14" y2="14"></line></svg>';
  const gau = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14l4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>';
  return type === "power" ? zap : type === "range" ? bat : gau;
}

function vehicleCard(v) {
  const specs = [];
  if (v.power_w) specs.push(`<span class="veh-spec">${specIcon("power")} ${v.power_w}W</span>`);
  if (v.range_km) specs.push(`<span class="veh-spec">${specIcon("range")} ${v.range_km} km</span>`);
  if (v.top_speed_kmh) specs.push(`<span class="veh-spec">${specIcon("speed")} ${v.top_speed_kmh} km/h</span>`);
  
  const priceBlock = v.price 
    ? `<p class="veh-price">PIX ${fmtPrice(v.price)}</p>${v.price_12x ? `<p class="veh-price-12x">ou 12x de ${fmtPrice(v.price_12x)}</p>` : ''}<p class="veh-price-neg">Outros valores negociáveis com entrada pequena</p>` 
    : `<p class="veh-consult">Sob Consulta</p><p class="veh-price-install">em nosso WhatsApp</p>`;
    
  return `
    <article class="veh-card reveal" data-delay="0">
      <a class="veh-img-link" href="./modelo.html?m=${slugify(v.name)}">
        <div class="veh-img">
          <img src="${v.image_url}" alt="${v.name}" loading="lazy">
          <span class="veh-badge">${v.category}</span>
        </div>
      </a>
      <div class="veh-body">
        <a href="./modelo.html?m=${slugify(v.name)}" class="veh-title-link"><h3>${v.name}</h3></a>
        <p class="veh-desc">${v.description || ""}</p>
        <div class="veh-specs">${specs.join("")}</div>
        <div class="veh-foot">
          <div>${priceBlock}</div>
          <div class="veh-foot-actions">
            <a class="veh-details-link" href="./modelo.html?m=${slugify(v.name)}">Ver detalhes</a>
            <a class="veh-arrow" href="${waLink(v.name, v.price, v.product_url)}" target="_blank" rel="noopener" aria-label="Consultar ${v.name}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    </article>`;
}

function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  const empty = document.getElementById("catalog-empty");
  if (!grid) return;
  
  const search = document.getElementById("catalog-search").value.trim().toLowerCase();
  const filter = document.getElementById("catalog-filter").dataset.current || "Todos";

  const normalizeCategory = (str) => {
    return (str || "").toLowerCase()
      .replace(/es$/, '')
      .replace(/s$/, '');
  };

  const filtered = VEHICLES.filter((v) => {
    const productCategories = (v.category || "").split(',').map((c) => normalizeCategory(c.trim()));
    const cleanFilter = normalizeCategory(filter);
    
    const matchCat = (filter === "Todos") || productCategories.some((cat) => cat === cleanFilter || cat.includes(cleanFilter));
    
    const searchStr = (search || "").toLowerCase();
    const matchSearch = !search || 
      (v.name || "").toLowerCase().includes(searchStr) || 
      (v.description || "").toLowerCase().includes(searchStr) || 
      (v.category || "").toLowerCase().includes(searchStr);
      
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(vehicleCard).join("");
  if (empty) empty.style.display = filtered.length === 0 ? "block" : "none";

  // re-observe novos reveals
  document.querySelectorAll("#catalog-grid .reveal").forEach((el) => el.classList.add("visible"));
}

document.addEventListener("DOMContentLoaded", () => {
  // Lê a categoria enviada via URL (ex: ?cat=Triciclos vindo da Home)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const initialFilter = catParam ? decodeURIComponent(catParam) : "Todos";
  
  // Define o filtro inicial no dataset
  const filterTarget = document.getElementById("catalog-filter");
  if (filterTarget) filterTarget.dataset.current = initialFilter;

  // filtros
  const filterRow = document.getElementById("filter-row");
  if (filterRow) {
    FILTERS.forEach((f) => {
      const b = document.createElement("button");
      const isActive = f.toLowerCase() === initialFilter.toLowerCase();
      b.className = "filter-btn" + (isActive ? " active" : "");
      b.textContent = f;
      
      b.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("catalog-filter").dataset.current = f;
        renderCatalog();
      });
      filterRow.appendChild(b);
    });
  }
  
  const search = document.getElementById("catalog-search");
  if (search) search.addEventListener("input", renderCatalog);
  
  renderCatalog();
});
