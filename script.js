/* ==========================================
   DR. GABRIEL VINÍCIUS
   SCRIPT.JS
========================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbwYa5HId5Uv2Vw6dTuhSyc44DCJEQW5w1l3KHWfp7l3twTJ-e1GwqFxsfPjB8k7bUyW/exec";

/* ==========================================
   HEADER
========================================== */

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){

header.style.boxShadow="0 12px 30px rgba(0,0,0,.08)";

}else{

header.style.boxShadow="0 2px 20px rgba(0,0,0,.05)";

}

});

/* ==========================================
   ANIMAÇÃO
========================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(sec=>{

observer.observe(sec);

});

/* ==========================================
   SCROLL SUAVE
========================================== */

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

/* ==========================================
   FORMULÁRIO
========================================== */

const form=document.getElementById("contactForm");

if(form){

form.addEventListener("submit",async function(e){

e.preventDefault();

const botao=form.querySelector("button");

botao.disabled=true;

botao.innerHTML="Enviando...";

const dados={

nome:document.getElementById("nome").value,

whatsapp:document.getElementById("whatsapp").value,

email:document.getElementById("email").value,

motivo:document.getElementById("motivo").value,

mensagem:document.getElementById("mensagem").value,

origem:"Site"

};

try{

await fetch(API_URL,{

method:"POST",

mode:"no-cors",

body:JSON.stringify(dados)

});

form.reset();

mostrarMensagem(
"Solicitação enviada com sucesso!",
true
);

if(typeof gtag==="function"){

gtag("event","lead",{

event_category:"Formulario",

event_label:"Contato"

});

}

}catch(e){

mostrarMensagem(
"Erro ao enviar. Tente novamente.",
false
);

}

botao.disabled=false;

botao.innerHTML="Solicitar Contato";

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

document.querySelector(".contato .container")
.appendChild(caixa);

}

caixa.innerHTML=texto;

caixa.style.marginTop="25px";

caixa.style.padding="18px";

caixa.style.borderRadius="12px";

caixa.style.fontWeight="600";

caixa.style.textAlign="center";

if(sucesso){

caixa.style.background="#DCFCE7";

caixa.style.color="#166534";

}else{

caixa.style.background="#FEE2E2";

caixa.style.color="#991B1B";

}

}

/* ==========================================
   WHATSAPP
========================================== */

const whatsapp=document.getElementById("whatsapp");

if(whatsapp){

whatsapp.addEventListener("input",function(){

let v=this.value.replace(/\D/g,"");

v=v.replace(/^(\d{2})(\d)/g,"($1) $2");

v=v.replace(/(\d{5})(\d)/,"$1-$2");

this.value=v;

});

}

/* ==========================================
   FIM
========================================== */
