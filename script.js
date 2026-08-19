// --- MENU RESPONSIVO ---
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Fecha o menu ao clicar em um link (opcional, mas recomendado)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// --- FAQ ACORDEÃO ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const parent = question.parentElement;
        
        // Fecha outros itens abertos (opcional, remova se quiser manter vários abertos)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== parent) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Alterna o estado do item atual
        parent.classList.toggle('active');
        const answer = parent.querySelector('.faq-answer');
        
        if (parent.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// --- INICIALIZAÇÃO DO AOS (ANIMAÇÕES) ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true, // As animações ocorrem apenas uma vez
        offset: 50, // Distância do trigger
        duration: 800 // Duração padrão
    });
});
