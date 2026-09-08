// modelo-detalhe.js — Página de detalhe do modelo (render dinâmico via ?m=slug)
// Reutiliza VEHICLES, MODEL_DETAILS, slugify, waLink, fmtPrice de data.js

const SHIELD_SVGS = {
  vasco: `<svg class="shield-mini" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2 L28 6 L28 19 C28 27 22 33 16 36 C10 33 4 27 4 19 L4 6 Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
    <path d="M4 9 L28 26 L28 32 L4 15 Z" fill="#000"/>
    <g transform="translate(16,7)"><path d="M0,-5 L2,-2 L5,0 L2,2 L0,5 L-2,2 L-5,0 L-2,-2 Z" fill="#cc0000"/></g>
  </svg>`,
  palmeiras: `<svg class="shield-mini" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2 L28 6 L28 19 C28 27 22 33 16 36 C10 33 4 27 4 19 L4 6 Z" fill="#006437" stroke="#fff" stroke-width="1.5"/>
    <text x="16" y="25" text-anchor="middle" fill="#fff" font-size="18" font-weight="900" font-family="Arial,sans-serif">P</text>
  </svg>`
};

const EDITION_COLORS = { vasco: "#cc0000", palmeiras: "#006437" };

// Bandeira do Reino Unido (Union Jack) para o círculo da cor UK
const UK_FLAG_SVG = `<svg class="uk-flag" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs><clipPath id="uk-dot-clip"><circle cx="30" cy="30" r="30"/></clipPath></defs>
  <g clip-path="url(#uk-dot-clip)">
    <rect width="60" height="60" fill="#012169"/>
    <path d="M-6,-6 L66,66 M66,-6 L-6,66" stroke="#fff" stroke-width="12"/>
    <path d="M-6,-6 L66,66 M66,-6 L-6,66" stroke="#C8102E" stroke-width="6"/>
    <rect x="20" width="20" height="60" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#fff"/>
    <rect x="24" width="12" height="60" fill="#C8102E"/>
    <rect y="24" width="60" height="12" fill="#C8102E"/>
  </g>
</svg>`;

// Slug com remoção de acentos — mesma chave usada pelo sincronizador do Google Drive (scripts/drive-sync.js)
const slugKey = (s) => slugify(String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("m");

  if (!slug) { window.location.href = "./modelos.html"; return; }

  const vehicle = VEHICLES.find(v => slugify(v.name) === slug);
  if (!vehicle) {
    document.getElementById("model-page").innerHTML = `
      <section class="model-error">
        <div class="container">
          <h1>Modelo não encontrado</h1>
          <p>O modelo solicitado não está disponível em nosso catálogo.</p>
          <a href="./modelos.html" class="btn btn-outline" style="margin-top:24px;display:inline-flex;">Ver Catálogo Completo</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${vehicle.name} — Motochefe Itaim`;

  const details = MODEL_DETAILS[slug] || {};
  const colors = details.colors || [];
  let selectedColorIndex = 0;
  let heroIndex = 0;
  let driveManifest = null; // fotos sincronizadas do Google Drive (modelos/manifest.json)

  const page = document.getElementById("model-page");
  page.innerHTML = renderAll();
  setupColorSelector();
  setupCarousel();
  updateColorSelection();

  // Manifesto de fotos sincronizadas do Google Drive (gerado por scripts/drive-sync.js)
  fetch("modelos/manifest.json").then(r => r.ok ? r.json() : {}).then(m => {
    if (Object.keys(m).length) {
      driveManifest = m;
      updateColorSelection(); // re-renderiza com as fotos da pasta do Drive
    }
  }).catch(() => {});

  // --- helpers ---
  function getCurrentColor() { return colors[selectedColorIndex]; }

  function getSelectedEdition() {
    const c = getCurrentColor();
    return (c && c.type === "shield") ? c.edition : null;
  }

  function getColorLabel() {
    const c = getCurrentColor();
    if (!c) return "";
    return c.name || (c.type === "shield" ? "Edição Especial" : "");
  }

  function getEditionData() {
    const ed = getSelectedEdition();
    return ed ? details[ed] : null;
  }

  function getCurrentImageList() {
    // Fotos sincronizadas do Google Drive (modelos/manifest.json) têm prioridade.
    // A galeria NÃO filtra por cor: mostra todas as fotos do modelo (gerais +
    // todas as cores). A cor selecionada só muda a ordem — as fotos daquela cor
    // vêm primeiro, depois as gerais do modelo e, por último, as demais cores.
    const c = getCurrentColor();
    if (driveManifest) {
      const colorKey = c ? `${slug}/${slugKey(c.name)}` : null;
      const colorPics = colorKey ? (driveManifest[colorKey] || []) : [];
      const generalPics = driveManifest[slug] || [];
      const others = [];
      for (const key in driveManifest) {
        if (key !== slug && key !== colorKey && key.startsWith(slug + "/")) {
          others.push(...driveManifest[key]);
        }
      }
      const full = [...colorPics, ...generalPics, ...others];
      if (full.length) return full;
    }
    const ed = getEditionData();
    if (ed && ed.gallery && ed.gallery.length) return ed.gallery;
    if (c && c.images && c.images.length) return c.images;
    const list = [vehicle.image_url];
    (details.gallery || []).forEach(g => { if (!list.includes(g)) list.push(g); });
    return list;
  }

  function updateHero() {
    const list = getCurrentImageList();
    if (heroIndex >= list.length) heroIndex = 0;
    const mainImg = document.getElementById("model-main-img");
    if (mainImg) mainImg.src = list[heroIndex] || vehicle.image_url;
    const show = list.length > 1;
    ["hero-prev", "hero-next"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? "flex" : "none";
    });
    const counter = document.getElementById("hero-counter");
    if (counter) {
      counter.style.display = show ? "block" : "none";
      counter.textContent = (heroIndex + 1) + " / " + list.length;
    }
  }

  function openLightbox(index) {
    if (window.ModelLightbox) {
      ModelLightbox.open({ images: getCurrentImageList(), index, name: vehicle.name });
    }
  }

  function setupCarousel() {
    const prev = document.getElementById("hero-prev");
    const next = document.getElementById("hero-next");
    const mainImg = document.getElementById("model-main-img");
    const step = (dir) => {
      const list = getCurrentImageList();
      heroIndex = (heroIndex + dir + list.length) % list.length;
      updateHero();
    };
    if (prev) prev.addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
    if (next) next.addEventListener("click", (e) => { e.stopPropagation(); step(1); });
    if (mainImg) mainImg.addEventListener("click", () => openLightbox(heroIndex));
  }

  function getWhatsAppLink() {
    const colorLabel = colors.length > 0 ? ` (${getColorLabel()})` : "";
    return waLink(vehicle.name + colorLabel, vehicle.price, window.location.href);
  }

  // --- render ---
  function renderAll() {
    return renderHero() + renderColors() + renderEditions() + renderDescription() + renderFeatures() + renderSpecs() + renderGallery() + renderCTA();
  }

  function renderHero() {
    const specs = [
      { value: vehicle.top_speed_kmh, unit: "km/h", label: "Velocidade" },
      { value: vehicle.power_w, unit: "W", label: "Potência" },
      { value: vehicle.range_km, unit: "km", label: "Autonomia" },
    ].filter(s => s.value);

    const badge = details.badge ? `<div class="model-edition-badge">${details.badge}</div>` : "";

    return `
      <section class="model-hero">
        <div class="model-hero-blob1"></div>
        <div class="model-hero-blob2"></div>
        <div class="model-hero-inner">
          ${badge}
          <span class="eyebrow">${vehicle.category}</span>
          <h1>${vehicle.name}</h1>
          <div class="model-hero-grid">
            <div class="model-hero-image">
              <img src="${vehicle.image_url}" alt="${vehicle.name}" id="model-main-img" title="Clique para ampliar">
              <button class="hero-arrow" id="hero-prev" aria-label="Imagem anterior">❮</button>
              <button class="hero-arrow" id="hero-next" aria-label="Próxima imagem">❯</button>
              <div class="hero-counter" id="hero-counter"></div>
            </div>
            <div class="model-hero-specs">
              ${specs.map(s => `
                <div class="model-stat">
                  <span class="model-stat-value">${s.value}</span>
                  <span class="model-stat-unit">${s.unit}</span>
                  <span class="model-stat-label">${s.label}</span>
                </div>`).join("")}
            </div>
          </div>
        </div>
      </section>`;
  }

  function renderColors() {
    if (!colors.length) return "";
    return `
      <section class="model-colors">
        <div class="container">
          <h2 class="section-title">Escolha sua <span class="accent">cor</span></h2>
          <div class="bar" style="margin: 0 auto 40px;"></div>
          <div class="color-swatches" id="color-swatches">
            ${colors.map((c, i) => {
              if (c.type === "shield") {
                const svg = SHIELD_SVGS[c.edition] || "";
                return `<button class="color-swatch color-swatch-shield ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Edição ${c.edition}">
                  ${svg}
                  <span class="color-swatch-label">${c.name || c.edition}</span>
                </button>`;
              }
              if (c.type === "uk") {
                return `<button class="color-swatch ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="UK">
                  <span class="color-dot color-dot-uk">${UK_FLAG_SVG}</span>
                  <span class="color-swatch-label">UK</span>
                </button>`;
              }
              if (c.type === "carbono") {
                return `<button class="color-swatch ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Carbono">
                  <span class="color-dot color-dot-carbono"></span>
                  <span class="color-swatch-label">Carbono</span>
                </button>`;
              }
              return `<button class="color-swatch ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="${c.name}">
                <span class="color-dot" style="background: ${c.hex}"></span>
                <span class="color-swatch-label">${c.name}</span>
              </button>`;
            }).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderEditions() {
    const editions = colors.filter(c => c.type === "shield" && details[c.edition]);
    return editions.map(c => {
      const ed = details[c.edition];
      const color = EDITION_COLORS[c.edition] || "#cc0000";
      return `
        <section class="edition-section" id="edition-${c.edition}" style="display:none;">
          <div class="container">
            <div class="edition-badge" style="color: ${color}; border-color: ${color}66;">${ed.badge || "EDIÇÃO ESPECIAL"}</div>
            <h2 class="edition-title">${ed.title}</h2>
            ${ed.subtitle ? `<p class="edition-subtitle">${ed.subtitle}</p>` : ""}
            <p class="edition-description">${ed.description}</p>
            ${ed.limitedUnits ? `<div class="edition-limited" style="background: ${color}26; border-color: ${color}4d;">Edição limitada a ${ed.limitedUnits} unidades</div>` : ""}
            ${(ed.details && ed.details.length) ? `
              <div class="edition-details">
                ${ed.details.map((d, i) => `
                  <div class="edition-detail-item">
                    <span class="edition-detail-num" style="color: ${color}99;">0${i + 1}</span>
                    <h3>${d.title}</h3>
                    <p>${d.text}</p>
                  </div>`).join("")}
              </div>` : ""}
          </div>
        </section>`;
    }).join("");
  }

  function renderDescription() {
    if (!vehicle.description) return "";
    return `
      <section class="model-description section-pad">
        <div class="container">
          <div class="reveal">
            <h2 class="section-title">Sobre o <span class="accent">${vehicle.name}</span></h2>
            <div class="bar" style="margin: 0 auto 40px;"></div>
            <p class="model-desc-text" id="model-desc-text">${vehicle.description}</p>
          </div>
        </div>
      </section>`;
  }

  function renderFeatures() {
    if (!details.features || !details.features.length) return "";
    return `
      <section class="model-features">
        <div class="container">
          <div class="reveal">
            <h2 class="section-title">Diferenciais <span class="accent">do modelo</span></h2>
            <div class="bar" style="margin: 0 auto 40px;"></div>
          </div>
          <div class="features-grid">
            ${details.features.map(f => `
              <div class="feature-item reveal">
                <span class="feature-icon">${f.icon || "✓"}</span>
                <span class="feature-text">${f.text}</span>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderSpecs() {
    if (!details.specs || !details.specs.length) return "";
    return `
      <section class="model-specs section-pad">
        <div class="container">
          <div class="reveal">
            <h2 class="section-title">Especificações <span class="accent">técnicas</span></h2>
            <div class="bar" style="margin: 0 auto 40px;"></div>
          </div>
          <div class="specs-table">
            ${details.specs.map(s => `
              <div class="spec-row">
                <span class="spec-label">${s.label}</span>
                <span class="spec-value">${s.value}</span>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderGallery() {
    return `
      <section class="model-gallery">
        <div class="container">
          <div class="reveal">
            <h2 class="section-title">Galeria <span class="accent">do modelo</span></h2>
            <div class="bar" style="margin: 0 auto 40px;"></div>
          </div>
          <div class="gallery-grid" id="gallery-grid">
            ${getCurrentImageList().map(img => `
              <div class="gallery-item">
                <img src="${img}" alt="${vehicle.name}" loading="lazy">
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderCTA() {
    if (!vehicle.price) {
      return `
        <section class="model-cta">
          <div class="model-cta-blob"></div>
          <div class="container model-cta-inner">
            <h2>Pronto para o seu ${vehicle.name}?</h2>
            <p>Sob Consulta — Fale com nossa equipe pelo WhatsApp</p>
            <a class="btn-cta-wa" href="${getWhatsAppLink()}" target="_blank" rel="noopener" id="model-cta-wa">💬 Falar no WhatsApp</a>
          </div>
        </section>`;
    }
    const pixPrice = fmtPrice(vehicle.price);
    const price12x = vehicle.price_12x ? fmtPrice(vehicle.price_12x) : null;
    const price21x = vehicle.price_21x ? fmtPrice(vehicle.price_21x) : null;
    return `
      <section class="model-cta">
        <div class="model-cta-blob"></div>
        <div class="container model-cta-inner">
          <h2>Pronto para o seu ${vehicle.name}?</h2>
          <div class="model-pricing">
            <p class="model-price-pix">PIX ${pixPrice}</p>
            ${price12x ? `<p class="model-price-12x">12x sem juros de ${price12x}</p>` : ''}
            ${price21x ? `<p class="model-price-21x">21x de ${price21x}</p>` : ''}
          </div>
          <p class="model-price-neg">Outros valores negociáveis com valor de entrada pequeno</p>
          <a class="btn-cta-wa" href="${getWhatsAppLink()}" target="_blank" rel="noopener" id="model-cta-wa">💬 Consultar em nosso WhatsApp</a>
        </div>
      </section>`;
  }

  // --- interação ---
  function setupColorSelector() {
    document.querySelectorAll(".color-swatch").forEach(sw => {
      sw.addEventListener("click", () => {
        selectedColorIndex = parseInt(sw.dataset.index, 10);
        updateColorSelection();
      });
    });
  }

  function updateColorSelection() {
    // Atualiza estado ativo dos swatches
    document.querySelectorAll(".color-swatch").forEach((sw, i) => {
      sw.classList.toggle("active", i === selectedColorIndex);
    });

    // Atualiza imagem principal e carrossel
    heroIndex = 0;
    updateHero();

    // Mostra/esconde seções de edição especial
    const selectedEd = getSelectedEdition();
    colors.filter(c => c.type === "shield").forEach(c => {
      const section = document.getElementById(`edition-${c.edition}`);
      if (section) section.style.display = (c.edition === selectedEd) ? "block" : "none";
    });

    // Atualiza texto de descrição
    const ed = getEditionData();
    const descText = document.getElementById("model-desc-text");
    if (descText) {
      descText.textContent = (ed && ed.description) ? ed.description : (vehicle.description || "");
    }

    // Atualiza galeria (imagens da cor selecionada, se houver)
    const galleryGrid = document.getElementById("gallery-grid");
    if (galleryGrid) {
      const gallery = getCurrentImageList();
      galleryGrid.innerHTML = gallery.map((img, i) => `
        <div class="gallery-item" data-index="${i}" title="Clique para ampliar">
          <img src="${img}" alt="${vehicle.name}" loading="lazy">
        </div>`).join("");
      galleryGrid.querySelectorAll(".gallery-item").forEach((item, i) => {
        item.addEventListener("click", () => openLightbox(i));
      });
    }

    // Atualiza link do CTA
    const ctaWa = document.getElementById("model-cta-wa");
    if (ctaWa) ctaWa.href = getWhatsAppLink();
  }
});
