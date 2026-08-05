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

/* ==========================================
   FORMULÁRIO
========================================== */

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const botao = form.querySelector("button");

        botao.disabled = true;
        botao.innerHTML = "Enviando...";

        const dados = {

            nome: document.getElementById("nome").value,

            whatsapp: document.getElementById("whatsapp").value,

            email: document.getElementById("email").value,

            motivo: document.getElementById("motivo").value,

            mensagem: document.getElementById("mensagem").value,

            origem: "Site"

        };

        try {

            await fetch(API_URL, {

                method: "POST",

                mode: "no-cors",

                body: JSON.stringify(dados)

            });

            form.reset();

            mostrarMensagem(

                "✅ Solicitação enviada com sucesso! Em breve entrarei em contato.",

                true

            );

            if (typeof gtag === "function") {

                gtag("event", "generate_lead", {

                    event_category: "Contato",

                    event_label: "Formulario"

                });

            }

        } catch (erro) {

            console.error(erro);

            mostrarMensagem(

                "❌ Não foi possível enviar sua solicitação. Tente novamente.",

                false

            );

        }

        botao.disabled = false;

        botao.innerHTML = "Solicitar Contato";

    });

}

/* ==========================================
   MENSAGEM
========================================== */

function mostrarMensagem(texto, sucesso) {

    let caixa = document.getElementById("mensagemSite");

    if (!caixa) {

        caixa = document.createElement("div");

        caixa.id = "mensagemSite";

        form.appendChild(caixa);

    }

    caixa.innerHTML = texto;

    caixa.style.marginTop = "20px";
    caixa.style.padding = "16px";
    caixa.style.borderRadius = "12px";
    caixa.style.textAlign = "center";
    caixa.style.fontWeight = "600";

    if (sucesso) {

        caixa.style.background = "#DCFCE7";
        caixa.style.color = "#166534";

    } else {

        caixa.style.background = "#FEE2E2";
        caixa.style.color = "#991B1B";

    }

}

/* ==========================================
   MÁSCARA DO WHATSAPP
========================================== */

const whatsapp = document.getElementById("whatsapp");

if (whatsapp) {

    whatsapp.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        this.value = valor;

    });

}

/* ==========================================
   MENU ATIVO
========================================== */

const sections = document.querySelectorAll("section[id]");
const menuLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let scrollY = window.pageYOffset;

    sections.forEach(sec => {

        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {

            menuLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {

                    link.classList.add("active");

                }

            });

        }

    });

});

/* ==========================================
   EFEITO NOS CARDS
========================================== */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

/* ==========================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Dr. Gabriel Vinícius • Todos os direitos reservados.`;

}

/* ==========================================
   FIM DO SCRIPT
========================================== */

console.log("Site carregado com sucesso.");
