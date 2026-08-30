// Lógica compartilhada: header scroll, menu mobile, animações reveal, footer.

document.addEventListener("DOMContentLoaded", () => {
  // Header scroll state
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || "0", 10);
          setTimeout(() => e.target.classList.add("visible"), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) { el.classList.add("visible"); }
      else { obs.observe(el); }
    });
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
});
