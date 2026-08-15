document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ROLAGEM SUAVE (SMOOTH SCROLL) ---
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 2. ACCORDION DO FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 3. ANIMAÇÃO AO ROLAR (INTERSECTION OBSERVER) ---
  const fadeElements = document.querySelectorAll('.fade-in-element');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      appearOnScroll.observe(element);
    });
  } else {
    fadeElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // --- 4. ROLAGEM ARRASTANDO O MOUSE NO CARROSSEL DE AVALIAÇÕES ---
  const slider = document.getElementById('reviewsSlider');

  if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // --- 5. RASTREAMENTO DE CLIQUES DO GOOGLE ANALYTICS (GTAG) ---
  const btnHeroAgendar = document.getElementById('btn-hero-agendar');
  const btnNavAgendar = document.getElementById('btn-nav-agendar');
  const btnFloat = document.getElementById('btn-whatsapp-float');
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  if (typeof gtag === 'function') {
    if (btnHeroAgendar) {
      btnHeroAgendar.addEventListener('click', () => {
        gtag('event', 'click', {
          'event_category': 'CTA',
          'event_label': 'Hero Agendar Doctoralia'
        });
      });
    }

    if (btnNavAgendar) {
      btnNavAgendar.addEventListener('click', () => {
        gtag('event', 'click', {
          'event_category': 'CTA',
          'event_label': 'Nav WhatsApp'
        });
      });
    }

    if (btnFloat) {
      btnFloat.addEventListener('click', () => {
        gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp Float Click'
        });
      });
    }

    whatsappLinks.forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp Click'
        });
      });
    });
  }

});
