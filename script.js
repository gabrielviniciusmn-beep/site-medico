document.addEventListener('DOMContentLoaded', () => {
  // 1. Estilo no cabeçalho ao rolar a página
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Animações de Scroll Reveal
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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 3. Controle dos botões do Carrossel de Avaliações
  const slider = document.getElementById('reviewsSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -340, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  // 4. Rastreamento no Analytics
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
