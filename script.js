document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito de alteração do cabeçalho ao rolar a página
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Animação de Scroll Reveal (Aparecer elementos com elegância)
  const fadeElements = document.querySelectorAll('.fade-in-element');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 3. Rastreamento de Agendamento no Google Analytics
  const trackClick = (label) => {
    if (typeof gtag === 'function') {
      gtag('event', 'click_agendamento', {
        'event_category': 'Agendamento',
        'event_label': label
      });
    }
  };

  const btnNavAgendar = document.getElementById('btn-nav-agendar');
  const btnHeroAgendar = document.getElementById('btn-hero-agendar');

  if (btnNavAgendar) btnNavAgendar.addEventListener('click', () => trackClick('Header Nav'));
  if (btnHeroAgendar) btnHeroAgendar.addEventListener('click', () => trackClick('Hero Section'));
});
