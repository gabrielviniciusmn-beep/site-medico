/* =====================================
   SITE DR. GABRIEL VINÍCIUS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarHeader();

    iniciarScroll();

    iniciarAnimacoes();

    configurarAnalytics();

});


/* =====================================
   HEADER
===================================== */

function iniciarHeader(){

    const header = document.querySelector(".header");

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 40){

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

        }else{

            header.style.boxShadow="0 2px 10px rgba(0,0,0,.08)";

        }

    });

}


/* =====================================
   SCROLL SUAVE
===================================== */

function iniciarScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",function(e){

            e.preventDefault();

            const destino=document.querySelector(this.getAttribute("href"));

            if(destino){

                destino.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}


/* =====================================
   ANIMAÇÕES
===================================== */

function iniciarAnimacoes(){

    const elementos=document.querySelectorAll("section");

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("mostrar");

            }

        });

    },{

        threshold:0.15

    });

    elementos.forEach(sec=>{

        observer.observe(sec);

    });

}


/* =====================================
   GOOGLE ANALYTICS
===================================== */

function configurarAnalytics(){

    document.querySelectorAll("a").forEach(botao=>{

        botao.addEventListener("click",()=>{

            if(typeof gtag==="function"){

                gtag("event","click",{

                    event_category:"Botao",

                    event_label:botao.innerText

                });

            }

        });

    });

}


/* =====================================
   FORMULÁRIO
===================================== */

async function enviarFormulario(dados){

    const endpoint="https://script.google.com/macros/s/AKfycbwYa5HId5Uv2Vw6dTuhSyc44DCJEQW5w1l3KHWfp7l3twTJ-e1GwqFxsfPjB8k7bUyW/exec";

    try{

        const resposta=await fetch(endpoint,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(dados)

        });

        const json=await resposta.json();

        console.log(json);

    }

    catch(erro){

        console.error(erro);

    }

}


/* =====================================
   FUTURAS FUNÇÕES
===================================== */

// Doctoralia

// WhatsApp

// Avaliações Google

// Avaliações Doctoralia

// Menu Mobile

// FAQ

// Dark Mode

// Google Maps
