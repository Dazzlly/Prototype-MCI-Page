// Lógica do formulário de contato -> WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const text = `Olá! Meu nome é ${name}.\n${message || "Gostaria de mais informações sobre as scooters elétricas da Motochefe."}${phone ? `\nTelefone: ${phone}` : ""}${email ? `\nE-mail: ${email}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
    if (status) status.style.display = "block";
  });
});
