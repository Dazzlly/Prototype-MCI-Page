/* Configuracao da oficina: posso alterar textos, etapas e comportamento por comando sem mexer no layout. */
const WORKSHOP_CONFIG = Object.freeze({
  totalSteps: 6,
  whatsappIntro: "Ola! Gostaria de solicitar um pre-agendamento na Oficina da Concessionaria Itaim."
});

/* Edite somente este bloco para atualizar as quatro secoes informativas da oficina. */
const WORKSHOP_INFO_CONFIG = Object.freeze([
  {
    label: "Valores",
    title: "Revisao periodica",
    text: "Confira o investimento para manter seu veiculo em dia.",
    highlight: "R$ 290,00",
    note: "Manutencoes e pecas sao avaliadas e orcadas separadamente."
  },
  {
    label: "Garantia",
    title: "Revisoes em dia",
    text: "A revisao preventiva ajuda a preservar as condicoes de garantia do seu veiculo.",
    highlight: "Consulte seu cronograma",
    note: "A equipe confirma os prazos conforme o modelo e a quilometragem."
  },
  {
    label: "Comodidade",
    title: "Leva e traz",
    text: "Consulte a disponibilidade para retirada e devolucao do seu veiculo.",
    highlight: "A partir de R$ 200,00",
    note: "Valores variam conforme a regiao e a rota."
  },
  {
    label: "Prazo",
    title: "Como nos organizamos",
    text: "Apos a entrada, fazemos o check-list e iniciamos a avaliacao tecnica.",
    highlight: "Prazo sob consulta",
    note: "O prazo final depende do diagnostico, pecas e aprovacao do servico."
  }
]);

document.addEventListener("DOMContentLoaded", () => {
  const renderInfoCards = (items, offset) => items.map((item, index) => `
      <article class="workshop-info-card reveal" data-delay="${(offset + index) * 80}">
        <span class="eyebrow">${item.label}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <strong>${item.highlight}</strong>
        <small>${item.note}</small>
      </article>
    `).join("");
  const infoGrid = document.getElementById("workshop-info-grid");
  if (infoGrid) {
    infoGrid.innerHTML = renderInfoCards(WORKSHOP_INFO_CONFIG, 0);
  }

  const form = document.getElementById("workshop-form");
  if (!form) return;

  const steps = [...form.querySelectorAll(".form-step")];
  const progress = [...document.querySelectorAll(".progress-step")];
  let currentStep = 1;

  const value = (name) => (new FormData(form).get(name) || "").toString().trim();
  const values = (name) => new FormData(form).getAll(name).map((item) => item.toString());

  const showStep = (step) => {
    currentStep = Math.max(1, Math.min(WORKSHOP_CONFIG.totalSteps, step));
    steps.forEach((item) => item.classList.toggle("is-active", Number(item.dataset.step) === currentStep));
    progress.forEach((item) => {
      const number = Number(item.dataset.progress);
      item.classList.toggle("is-active", number === currentStep);
      item.classList.toggle("is-complete", number < currentStep);
    });
    if (currentStep === 3) {
      const isMaintenance = value("service") === "Manutencao";
      document.querySelectorAll(".conditional-service").forEach((item) => item.classList.toggle("is-hidden", item.dataset.service !== (isMaintenance ? "Manutencao" : "Revisao")));
      document.querySelector(".service-name").textContent = isMaintenance ? "Manutencao" : "Revisao";
    }
    if (currentStep === 6) renderSummary();
    document.getElementById("agendamento").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateCurrentStep = () => {
    const current = form.querySelector(`[data-step="${currentStep}"]`);
    const required = [...current.querySelectorAll("[required]")];
    const invalid = required.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return false;
    }
    if (currentStep === 1 && !value("service")) {
      form.querySelector("[name=\"service\"]").reportValidity();
      return false;
    }
    return true;
  };

  const renderSummary = () => {
    const summary = document.getElementById("workshop-summary");
    const problems = values("problem").join(", ");
    summary.innerHTML = [
      ["Servico", value("service")],
      ["Cliente", value("name")],
      ["Veiculo", `${value("model")}${value("km") ? ` (${value("km")})` : ""}`],
      ["Preferencia", `${value("date") || "A combinar"}${value("time") ? ` - ${value("time")}` : ""}`],
      ["Detalhes", value("message") || problems || "Nao informado"],
      ["Entrega", value("delivery") || "A combinar"]
    ].map(([label, content]) => `<div><strong>${label}</strong><span>${content || "Nao informado"}</span></div>`).join("");
  };

  form.querySelectorAll(".wizard-next").forEach((button) => button.addEventListener("click", () => {
    if (validateCurrentStep()) showStep(currentStep + 1);
  }));
  form.querySelectorAll(".wizard-back").forEach((button) => button.addEventListener("click", () => showStep(currentStep - 1)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    const data = new FormData(form);
    const get = (name) => (data.get(name) || "").toString().trim();
    const files = [...form.querySelector("#workshop-files").files].map((file) => file.name).join(", ");
    const lines = [
      WORKSHOP_CONFIG.whatsappIntro,
      `Tipo: ${get("service")}`,
      `Nome: ${get("name")}`,
      `Telefone: ${get("phone")}`,
      `E-mail: ${get("email") || "Nao informado"}`,
      `Veiculo: ${get("model")} (${get("km") || "km nao informada"})`,
      `Problemas: ${values("problem").join(", ") || "Nao informado"}`,
      `Descricao: ${get("message") || "Nao informada"}`,
      `Entrega: ${get("delivery") || "A combinar"} - ${get("responsible") || "Proprietario"}`,
      `Data: ${get("date") || "A combinar"} - ${get("time") || "A combinar"}`,
      `Anexos selecionados: ${files || "Nenhum"}`
    ];
    window.open(`https://wa.me/${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    document.getElementById("workshop-status").classList.add("is-visible");
  });
});
