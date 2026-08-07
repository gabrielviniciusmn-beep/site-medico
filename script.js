document.addEventListener('DOMContentLoaded', () => {
  // 1. Estilo/Sombra no cabeçalho ao rolar a página
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Rolagem suave (Smooth Scroll) para todos os links internos
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Se for apenas "#", ignora
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Deslocamento para compensar a altura do cabeçalho fixo
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Animação suave de surgimento dos elementos (Fade in)
  const fadeElements = document.querySelectorAll('.fade-in-element');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
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

  // 4. Rastreamento no Google Analytics
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
