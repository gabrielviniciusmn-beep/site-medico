document.addEventListener('DOMContentLoaded', () => {
  // 1. ANIMAÇÃO DE ENTRADA (Fade-in ao rolar a página)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-element');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // 2. FUNCIONALIDADE DO FAQ (Abre e fecha as perguntas)
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Fecha todos os itens abertos
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Se não estava ativo, abre o item clicado
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
});
