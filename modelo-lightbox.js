// modelo-lightbox.js — Visualizador de imagem em tela cheia com zoom
// Uso: ModelLightbox.open({ images: [...], index: 0, name: "MC Roma" })

window.ModelLightbox = (function () {
  let state = null; // { images, index, name, scale, tx, ty, overlay, img, counter }

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;
  const TOGGLE_SCALE = 2.5;

  function open(opts) {
    if (state) close();
    const images = (opts.images || []).filter(Boolean);
    if (!images.length) return;
    state = { images, index: opts.index || 0, name: opts.name || "", scale: 1, tx: 0, ty: 0, dragging: false, startX: 0, startY: 0, panMoved: false };

    const overlay = document.createElement("div");
    overlay.className = "mlb-overlay";
    overlay.innerHTML = `
      <button class="mlb-close" aria-label="Fechar">✕</button>
      <button class="mlb-nav mlb-prev" aria-label="Imagem anterior">❮</button>
      <img class="mlb-img" alt="${state.name}">
      <button class="mlb-nav mlb-next" aria-label="Próxima imagem">❯</button>
      <div class="mlb-counter"></div>
      <div class="mlb-zoom-hint">clique ou role para dar zoom</div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    state.overlay = overlay;
    state.img = overlay.querySelector(".mlb-img");
    state.counter = overlay.querySelector(".mlb-counter");

    overlay.querySelector(".mlb-close").addEventListener("click", close);
    overlay.querySelector(".mlb-prev").addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
    overlay.querySelector(".mlb-next").addEventListener("click", (e) => { e.stopPropagation(); step(1); });
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    state.img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (state.dragging) return;
      // zoom centrado no ponto clicado
      if (state.scale > MIN_SCALE && state.panMoved) { resetZoom(); return; }
      const next = state.scale > MIN_SCALE ? MIN_SCALE : TOGGLE_SCALE;
      zoomAt(e.clientX, e.clientY, next);
    });

    overlay.addEventListener("wheel", (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.25 : 0.8;
      zoomAt(e.clientX, e.clientY, Math.min(MAX_SCALE, Math.max(MIN_SCALE, state.scale * factor)));
    }, { passive: false });

    state.img.addEventListener("mousedown", (e) => {
      if (state.scale <= MIN_SCALE) return;
      state.dragging = true;
      state.panMoved = false;
      state.startX = e.clientX - state.tx;
      state.startY = e.clientY - state.ty;
      e.preventDefault();
    });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    window.addEventListener("keydown", onKey);

    render();
  }

  function onMouseMove(e) {
    if (!state || !state.dragging) return;
    const nx = e.clientX - state.startX;
    const ny = e.clientY - state.startY;
    if (Math.abs(nx - state.tx) > 3 || Math.abs(ny - state.ty) > 3) state.panMoved = true;
    state.tx = nx;
    state.ty = ny;
    applyTransform();
  }

  function onMouseUp() {
    if (state) state.dragging = false;
  }

  function onKey(e) {
    if (!state) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  }

  function step(dir) {
    if (!state) return;
    const n = state.images.length;
    state.index = (state.index + dir + n) % n;
    resetZoom();
    render();
  }

  function zoomAt(clientX, clientY, nextScale) {
    const rect = state.img.getBoundingClientRect();
    const cx = clientX - rect.left - rect.width / 2 - state.tx;
    const cy = clientY - rect.top - rect.height / 2 - state.ty;
    const ratio = nextScale / state.scale;
    if (nextScale <= MIN_SCALE) {
      resetZoom();
      return;
    }
    state.tx = cx * (1 - ratio) + state.tx;
    state.ty = cy * (1 - ratio) + state.ty;
    state.scale = nextScale;
    applyTransform();
  }

  function resetZoom() {
    state.scale = MIN_SCALE;
    state.tx = 0;
    state.ty = 0;
    state.panMoved = false;
    applyTransform();
  }

  function applyTransform() {
    state.img.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
    state.img.classList.toggle("mlb-zoomed", state.scale > MIN_SCALE);
  }

  function render() {
    state.img.src = state.images[state.index];
    state.counter.textContent = `${state.index + 1} / ${state.images.length}`;
    const hint = state.overlay.querySelector(".mlb-zoom-hint");
    if (hint) hint.style.opacity = "1";
    clearTimeout(state.hintTimer);
    state.hintTimer = setTimeout(() => { if (hint) hint.style.opacity = "0"; }, 2500);
  }

  function close() {
    if (!state) return;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("keydown", onKey);
    state.overlay.remove();
    document.body.style.overflow = "";
    state = null;
  }

  return { open, close };
})();
