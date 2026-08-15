document.addEventListener('DOMContentLoaded', () => {
  // Controle do Menu Mobile (Abertura/Fechamento)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer item
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Interatividade das Perguntas Frequentes (FAQ Acordeão)
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');

      const span = question.querySelector('span');
      if (span) {
        span.textContent = item.classList.contains('active') ? '−' : '+';
      }
    });
  });
});
