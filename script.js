document.addEventListener('DOMContentLoaded', () => {
  // 1. Sombra e estilo no cabeçalho ao rolar
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Animação suave ao rolar a página
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

  // 3. Envio assíncrono do formulário de contato
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      formStatus.style.color = '#122b40';
      formStatus.textContent = 'Enviando sua solicitação...';

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = '#00b090';
          formStatus.textContent = 'Obrigado! Sua mensagem foi enviada. Entraremos em contato em breve.';
          contactForm.reset();
        } else {
          formStatus.style.color = '#e53e3e';
          formStatus.textContent = 'Ops! Houve um problema ao enviar. Tente novamente ou use o agendamento da Doctoralia.';
        }
      } catch (error) {
        formStatus.style.color = '#e53e3e';
        formStatus.textContent = 'Erro de conexão. Por favor, tente novamente.';
      }
    });
  }

  // 4. Rastreamento de cliques no Analytics
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
