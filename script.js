/* ==========================================
   DR. GABRIEL VINÍCIUS
   SCRIPT.JS
========================================== */

const API_URL = "https://script.google.com/macros/s/AKfycbwYa5HId5Uv2Vw6dTuhSyc44DCJEQW5w1l3KHWfp7l3twTJ-e1GwqFxsfPjB8k7bUyW/exec";

/* ==========================================
   HEADER
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("header-scroll");

    } else {

        header.classList.remove("header-scroll");

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

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

/* ==========================================
   SCROLL SUAVE
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================
   FORMULÁRIO
========================================== */

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const botao = form.querySelector("button");

botao.disabled = true;

const textoOriginal = botao.innerHTML;

botao.innerHTML = "Enviando...";

const dados = {

nome: document.getElementById("nome").value,

whatsapp: document.getElementById("whatsapp").value,

email: document.getElementById("email").value,

motivo: document.getElementById("motivo").value,

mensagem: document.getElementById("mensagem").value,

origem: "Site"

};

try{

await fetch(API_URL,{

method:"POST",

mode:"no-cors",

body:JSON.stringify(dados)

});

form.reset();

mostrarMensagem(

"✅ Solicitação enviada com sucesso! Em breve entrarei em contato.",

true

);

if(typeof gtag==="function"){

gtag("event","generate_lead",{

event_category:"Contato",

event_label:"Formulario"

});

}

}catch(erro){

console.error(erro);

mostrarMensagem(

"❌ Não foi possível enviar sua solicitação. Tente novamente.",

false

);

}

botao.disabled=false;

botao.innerHTML=textoOriginal;

});

}

/* ==========================================
   MENSAGEM
========================================== */

function mostrarMensagem(texto,sucesso){

let caixa=document.getElementById("mensagemSite");

if(!caixa){

caixa=document.createElement("div");

caixa.id="mensagemSite";

caixa.style.marginTop="25px";

document.querySelector(".contact-form").appendChild(caixa);

}

caixa.innerHTML=texto;

caixa.style.padding="18px";

caixa.style.borderRadius="12px";

caixa.style.fontWeight="600";

caixa.style.textAlign="center";

caixa.style.transition=".3s";

if(sucesso){

caixa.style.background="#DCFCE7";

caixa.style.color="#166534";

}else{

caixa.style.background="#FEE2E2";

caixa.style.color="#991B1B";

}

setTimeout(()=>{

caixa.style.opacity="0";

setTimeout(()=>{

caixa.remove();

},500);

},5000);

}
/* ==========================================
   MÁSCARA WHATSAPP
========================================== */

const whatsapp = document.getElementById("whatsapp");

if (whatsapp) {

    whatsapp.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        if (valor.length > 11) {

            valor = valor.substring(0, 11);

        }

        if (valor.length > 10) {

            valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");

        } else {

            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");

        }

        this.value = valor;

    });

}

/* ==========================================
   MENU ATIVO
========================================== */

const secoes = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let scroll = window.scrollY + 150;

    secoes.forEach(secao => {

        const topo = secao.offsetTop;
        const altura = secao.offsetHeight;
        const id = secao.getAttribute("id");

        if (scroll >= topo && scroll < topo + altura) {

            links.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {

                    link.classList.add("active");

                }

            });

        }

    });

});

/* ==========================================
   HOVER DOS CARDS
========================================== */

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

/* ==========================================
   ANO AUTOMÁTICO
========================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Dr. Gabriel Vinícius • Todos os direitos reservados.`;

}

/* ==========================================
   CONSOLE
========================================== */

console.log("Site carregado com sucesso.");
