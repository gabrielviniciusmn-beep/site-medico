document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // MENU MOBILE (HAMBÚRGUER)
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Fechar o menu ao clicar em qualquer link
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // ==========================================
  // EFEITO DE ROLAGEM (SCROLL FADE)
  // ==========================================
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Opcional: parar de observar após animar
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".scroll-fade").forEach(el => {
    observer.observe(el);
  });
});
