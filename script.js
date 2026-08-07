document.addEventListener('DOMContentLoaded', () => {
  // Sombra no cabeçalho ao rolar a página
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  });

  // Função auxiliar para enviar evento ao Google Analytics
  const trackClick = (eventName, label) => {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        'event_category': 'Agendamento',
        'event_label': label
      });
    }
  };

  // Rastreamento WhatsApp
  const btnWaNav = document.getElementById('btn-whatsapp-nav');
  const btnWaHero = document.getElementById('btn-whatsapp-hero');
  const btnWaFooter = document.getElementById('btn-whatsapp-footer');

  if (btnWaNav) btnWaNav.addEventListener('click', () => trackClick('click_whatsapp', 'Nav Bar'));
  if (btnWaHero) btnWaHero.addEventListener('click', () => trackClick('click_whatsapp', 'Hero Section'));
  if (btnWaFooter) btnWaFooter.addEventListener('click', () => trackClick('click_whatsapp', 'Footer Section'));

  // Rastreamento Doctoralia Nav
  const btnDocNav = document.getElementById('btn-doctoralia-nav');
  if (btnDocNav) btnDocNav.addEventListener('click', () => trackClick('click_doctoralia', 'Nav Bar'));
});
