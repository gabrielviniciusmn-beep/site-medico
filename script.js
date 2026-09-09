document.addEventListener('DOMContentLoaded', () => {
  // Controle do menu mobile (hambúrguer)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Fecha o menu ao clicar em qualquer link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Controle interativo do FAQ (Acordeão)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    if (questionButton && answerDiv) {
      questionButton.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        });

        // Alterna o item atual se não estava aberto
        if (!isOpen) {
          item.classList.add('active');
          answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
        }
      });
    }
  });

  // Ocultar automaticamente a barra fixa mobile ao chegar na seção da Doctoralia
  const mobileCtaBar = document.querySelector('.mobile-cta-bar');
  const doctoraliaSection = document.getElementById('doctoralia');

  if (mobileCtaBar && doctoraliaSection) {
    window.addEventListener('scroll', () => {
      const rect = doctoraliaSection.getBoundingClientRect();
      // Se a seção da Doctoralia estiver visível na tela, esconde a barra fixa para não sobrepor os horários
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        mobileCtaBar.classList.add('hidden');
      } else {
        mobileCtaBar.classList.remove('hidden');
      }
    });
  }
});
