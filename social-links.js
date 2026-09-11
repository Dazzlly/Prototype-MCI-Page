// Links centrais das redes sociais e canais de atendimento.
// Edite este arquivo para atualizar os links em todo o site.
const SOCIAL_LINKS = Object.freeze({
  instagram: "https://www.instagram.com/motochefe.itaim/",
  facebook: "https://www.facebook.com/profile.php?id=61562114171718",
  whatsapp: "5511948711047"
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-social-link]").forEach((element) => {
    const key = element.dataset.socialLink;
    if (SOCIAL_LINKS[key]) element.href = key === "whatsapp" ? `https://wa.me/${SOCIAL_LINKS[key]}` : SOCIAL_LINKS[key];
  });
});
