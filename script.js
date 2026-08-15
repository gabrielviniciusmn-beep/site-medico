document.addEventListener("DOMContentLoaded", () => {
  // Controle do Accordion do FAQ
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-question");

    questionButton.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha todos os outros itens
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        otherAnswer.style.maxHeight = null;
      });

      // Abre ou fecha o item clicado
      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
