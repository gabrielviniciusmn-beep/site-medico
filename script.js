/* ==========================================
   DR. GABRIEL VINÍCIUS
   SCRIPT.JS
========================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbwYa5HId5Uv2Vw6dTuhSyc44DCJEQW5w1l3KHWfp7l3twTJ-e1GwqFxsfPjB8k7bUyW/exec";

/* ==========================================
   HEADER
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow = "0 12px 35px rgba(0,0,0,.08)";
        header.style.background = "rgba(255,255,255,.98)";

    } else {

        header.style.boxShadow = "0 2px 20px rgba(0,0,0,.05)";
        header.style.background = "rgba(255,255,255,.95)";

    }

});

/* ==========================================
   ANIMAÇÃO DAS SEÇÕES
========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: .15
});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

/* ==========================================
   SCROLL SUAVE
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            destino.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
