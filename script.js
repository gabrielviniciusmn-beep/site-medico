/*
==========================================================
DR. GABRIEL VINÍCIUS
SCRIPT.JS V5
==========================================================
*/

"use strict";

/*
==========================================================
INICIALIZAÇÃO
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSite();

});

/*
==========================================================
FUNÇÃO PRINCIPAL
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
LUCIDE ICONS
==========================================================
*/

function initializeIcons(){

    if(typeof lucide !== "undefined"){

        lucide.createIcons();

    }

}

/*
==========================================================
CACHE DOS ELEMENTOS
==========================================================
*/

let header;

let menu;

let menuToggle;

let navLinks;

let faqItems;

let floatingButton;

let toast;

let hero;

let sections;

function cacheElements(){

    header=document.querySelector(".header");

    menu=document.querySelector(".nav");

    menuToggle=document.querySelector(".menu-toggle");

    navLinks=document.querySelectorAll(".nav a");

    faqItems=document.querySelectorAll(".faq-item");

    floatingButton=document.querySelector(".floating-cta");

    toast=document.querySelector("#toast");

    hero=document.querySelector(".hero");

    sections=document.querySelectorAll("section");

}

/*
==========================================================
VARIÁVEIS GLOBAIS
==========================================================
*/

let lastScroll=0;

let isMenuOpen=false;

let observer=null;

/*
==========================================================
CONFIGURAÇÃO
==========================================================
*/

function initializeVariables(){

    lastScroll=window.scrollY;

}

/*
==========================================================
UTILIDADES
==========================================================
*/

function debounce(callback,delay=150){

    let timeout;

    return(...args)=>{

        clearTimeout(timeout);

        timeout=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}

function throttle(callback,limit=150){

    let waiting=false;

    return(...args)=>{

        if(waiting){

            return;

        }

        callback(...args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },limit);

    };

}

function showToast(message){

    if(!toast){

        return;

    }

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}/*
==========================================================
MENU MOBILE
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
MENU
==========================================================
*/

function initializeMobileMenu(){

    if(!menuToggle || !menu){

        return;

    }

    menuToggle.addEventListener("click",toggleMenu);

    navLinks.forEach(link=>{

        link.addEventListener("click",closeMenu);

    });

    document.addEventListener("click",handleOutsideClick);

    document.addEventListener("keydown",handleEscapeKey);

}

/*
==========================================================
ABRIR / FECHAR
==========================================================
*/

function toggleMenu(event){

    event.stopPropagation();

    isMenuOpen=!isMenuOpen;

    menu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute(

        "aria-expanded",

        isMenuOpen

    );

    document.body.style.overflow=isMenuOpen

        ? "hidden"

        : "";

}

/*
==========================================================
FECHAR
==========================================================
*/

function closeMenu(){

    if(!isMenuOpen){

        return;

    }

    isMenuOpen=false;

    menu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(

        "aria-expanded",

        "false"

    );

    document.body.style.overflow="";

}

/*
==========================================================
CLIQUE FORA
==========================================================
*/

function handleOutsideClick(event){

    if(!isMenuOpen){

        return;

    }

    if(

        menu.contains(event.target) ||

        menuToggle.contains(event.target)

    ){

        return;

    }

    closeMenu();

}

/*
==========================================================
ESC
==========================================================
*/

function handleEscapeKey(event){

    if(event.key==="Escape"){

        closeMenu();

    }

}/*
==========================================================
HEADER INTELIGENTE
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
HEADER
==========================================================
*/

function initializeHeader(){

    updateHeader();

    window.addEventListener(

        "scroll",

        throttle(updateHeader,10)

    );

}

/*
==========================================================
ATUALIZA HEADER
==========================================================
*/

function updateHeader(){

    const currentScroll=window.scrollY;

    if(currentScroll>40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

    if(currentScroll>lastScroll && currentScroll>150){

        header.classList.add("header-hidden");

    }else{

        header.classList.remove("header-hidden");

    }

    lastScroll=currentScroll;

    highlightCurrentSection();

}

/*
==========================================================
MENU ATIVO
==========================================================
*/

function highlightCurrentSection(){

    if(!sections.length){

        return;

    }

    const scrollPosition=window.scrollY+180;

    sections.forEach(section=>{

        const sectionTop=section.offsetTop;

        const sectionHeight=section.offsetHeight;

        const id=section.getAttribute("id");

        if(

            scrollPosition>=sectionTop &&

            scrollPosition<sectionTop+sectionHeight

        ){

            navLinks.forEach(link=>{

                link.classList.remove("active");

                if(

                    link.getAttribute("href")==="#" + id

                ){

                    link.classList.add("active");

                }

            });

        }

    });

}/*
==========================================================
FAQ
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
FAQ
==========================================================
*/

function initializeFAQ(){

    if(!faqItems.length){

        return;

    }

    faqItems.forEach(item=>{

        const question=item.querySelector(".faq-question");

        if(!question){

            return;

        }

        question.addEventListener("click",()=>{

            toggleFAQ(item);

        });

    });

}

/*
==========================================================
ABRIR / FECHAR
==========================================================
*/

function toggleFAQ(currentItem){

    const isActive=currentItem.classList.contains("active");

    faqItems.forEach(item=>{

        closeFAQ(item);

    });

    if(!isActive){

        openFAQ(currentItem);

    }

}

/*
==========================================================
ABRIR
==========================================================
*/

function openFAQ(item){

    const answer=item.querySelector(".faq-answer");

    const button=item.querySelector(".faq-question");

    if(!answer){

        return;

    }

    item.classList.add("active");

    button.setAttribute(

        "aria-expanded",

        "true"

    );

    answer.style.maxHeight=

        answer.scrollHeight+"px";

}

/*
==========================================================
FECHAR
==========================================================
*/

function closeFAQ(item){

    const answer=item.querySelector(".faq-answer");

    const button=item.querySelector(".faq-question");

    if(!answer){

        return;

    }

    item.classList.remove("active");

    button.setAttribute(

        "aria-expanded",

        "false"

    );

    answer.style.maxHeight=null;

}/*
==========================================================
SCROLL REVEAL
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
SCROLL REVEAL
==================================================================
*/

function initializeScrollReveal(){

    const animatedElements=document.querySelectorAll(

        ".hero-content,"+
        ".hero-image,"+
        ".about-card,"+
        ".feature-card,"+
        ".process-card,"+
        ".review-card,"+
        ".contact-item,"+
        ".contact-card,"+
        ".faq-item,"+
        ".section-header"

    );

    if(!animatedElements.length){

        return;

    }

    observer=new IntersectionObserver(

        revealElements,

        {

            threshold:.15,

            rootMargin:"0px 0px -80px 0px"

        }

    );

    animatedElements.forEach((element,index)=>{

        element.style.opacity="0";

        element.style.transform="translateY(40px)";

        element.style.transition=

            `opacity .7s ease ${index*40}ms,
             transform .7s ease ${index*40}ms`;

        observer.observe(element);

    });

}

/*
==========================================================
REVELAR
==========================================================
*/

function revealElements(entries){

    entries.forEach(entry=>{

        if(!entry.isIntersecting){

            return;

        }

        const element=entry.target;

        element.style.opacity="1";

        element.style.transform="translateY(0)";

        observer.unobserve(element);

    });

}

/*
==========================================================
ROLAGEM SUAVE
==========================================================
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(event){

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(!target){

            return;

        }

        event.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});/*
==========================================================
GOOGLE ANALYTICS
GOOGLE ADS
EVENTOS
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    initializeAnalytics();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
ANALYTICS
==========================================================
*/

function initializeAnalytics(){

    trackButtons();

    trackDoctoralia();

    trackWhatsApp();

    trackSections();

}

/*
==========================================================
GTAG
==========================================================
*/

function sendEvent(eventName,parameters={}){

    if(typeof gtag!=="function"){

        return;

    }

    gtag(

        "event",

        eventName,

        parameters

    );

}

/*
==========================================================
BOTÕES
==========================================================
*/

function trackButtons(){

    const buttons=document.querySelectorAll(".btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            sendEvent(

                "button_click",

                {

                    button_text:

                        button.innerText.trim(),

                    page:

                        window.location.pathname

                }

            );

        });

    });

}

/*
==========================================================
WHATSAPP
==========================================================
*/

function trackWhatsApp(){

    const whatsappLinks=document.querySelectorAll(

        'a[href*="wa.me"]'

    );

    whatsappLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            sendEvent(

                "whatsapp_click",

                {

                    page:

                        window.location.pathname

                }

            );

        });

    });

}

/*
==========================================================
DOCTORALIA
==========================================================
*/

function trackDoctoralia(){

    const doctoraliaLinks=document.querySelectorAll(

        'a[href*="doctoralia"]'

    );

    doctoraliaLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            sendEvent(

                "doctoralia_click",

                {

                    page:

                        window.location.pathname

                }

            );

        });

    });

}

/*
==========================================================
SEÇÕES
==========================================================
*/

function trackSections(){

    const options={

        threshold:.60

    };

    const analyticsObserver=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(!entry.isIntersecting){

                        return;

                    }

                    sendEvent(

                        "section_view",

                        {

                            section:

                                entry.target.id

                        }

                    );

                    analyticsObserver.unobserve(

                        entry.target

                    );

                });

            },

            options

        );

    sections.forEach(section=>{

        analyticsObserver.observe(section);

    });

}/*
==========================================================
UX
BOTÃO FLUTUANTE
SCROLL TOP
TOAST
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    initializeAnalytics();

    initializeUX();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
UX
==========================================================
*/

function initializeUX(){

    initializeFloatingButton();

    initializeBackToTop();

    initializeButtons();

}

/*
==========================================================
BOTÃO FLUTUANTE
==========================================================
*/

function initializeFloatingButton(){

    if(!floatingButton){

        return;

    }

    floatingButton.style.opacity="0";

    floatingButton.style.pointerEvents="none";

    window.addEventListener(

        "scroll",

        throttle(updateFloatingButton,20)

    );

}

function updateFloatingButton(){

    if(window.scrollY>500){

        floatingButton.style.opacity="1";

        floatingButton.style.pointerEvents="auto";

        floatingButton.style.transform="translateY(0)";

    }else{

        floatingButton.style.opacity="0";

        floatingButton.style.pointerEvents="none";

        floatingButton.style.transform="translateY(20px)";

    }

}

/*
==========================================================
SCROLL PARA TOPO
==========================================================
*/

function initializeBackToTop(){

    const logo=document.querySelector(".logo");

    if(!logo){

        return;

    }

    logo.addEventListener("click",event=>{

        event.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*
==========================================================
EFEITO BOTÕES
==========================================================
*/

function initializeButtons(){

    const buttons=document.querySelectorAll(".btn");

    buttons.forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            button.style.transform="translateY(-2px)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="";

        });

    });

}

/*
==========================================================
TOAST PERSONALIZADO
==========================================================
*/

function successToast(message){

    showToast(message);

}

function errorToast(message){

    showToast(message);

}

function infoToast(message){

    showToast(message);

}

/*
==========================================================
LOADING
==========================================================
*/

function setLoading(element,status=true){

    if(!element){

        return;

    }

    if(status){

        element.classList.add("loading");

    }else{

        element.classList.remove("loading");

    }

}/*
==========================================================
PERFORMANCE
LAZY LOADING
OTIMIZAÇÕES
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    initializeAnalytics();

    initializeUX();

    initializePerformance();

    console.log("Site carregado com sucesso.");

}

/*
==========================================================
PERFORMANCE
==========================================================
*/

function initializePerformance(){

    lazyLoadImages();

    preloadImportantImages();

    optimizeResize();

    optimizeVisibility();

}

/*
==========================================================
LAZY LOAD
==========================================================
*/

function lazyLoadImages(){

    const images=document.querySelectorAll(

        'img[loading="lazy"]'

    );

    if(!images.length){

        return;

    }

    const imageObserver=new IntersectionObserver(

        (entries,observer)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting){

                    return;

                }

                const image=entry.target;

                image.classList.add("loaded");

                observer.unobserve(image);

            });

        },

        {

            rootMargin:"150px"

        }

    );

    images.forEach(image=>{

        imageObserver.observe(image);

    });

}

/*
==========================================================
PRÉ-CARREGAMENTO
==========================================================
*/

function preloadImportantImages(){

    const heroImage=document.querySelector(

        ".hero-image img"

    );

    if(!heroImage){

        return;

    }

    const preload=new Image();

    preload.src=heroImage.src;

}

/*
==========================================================
RESIZE
==========================================================
*/

function optimizeResize(){

    window.addEventListener(

        "resize",

        debounce(handleResize,250)

    );

}

function handleResize(){

    if(

        window.innerWidth>768 &&

        isMenuOpen

    ){

        closeMenu();

    }

}

/*
==========================================================
VISIBILIDADE
==========================================================
*/

function optimizeVisibility(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                console.log(

                    "Página em segundo plano."

                );

            }else{

                console.log(

                    "Página ativa."

                );

            }

        }

    );

}

/*
==========================================================
RECONEXÃO
==========================================================
*/

window.addEventListener(

    "online",

    ()=>{

        console.log("Conexão restaurada.");

    }

);

window.addEventListener(

    "offline",

    ()=>{

        console.log("Sem conexão.");

    }

);

/*
==========================================================
MEMÓRIA
==========================================================
*/

window.addEventListener(

    "beforeunload",

    ()=>{

        if(observer){

            observer.disconnect();

        }

    }

);/*
==========================================================
SCRIPT.JS V5
PARTE 9
SEGURANÇA E PRODUÇÃO
==========================================================
*/

/*
==========================================================
SEGURANÇA
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    initializeAnalytics();

    initializeUX();

    initializePerformance();

    initializeSecurity();

    console.log("Sistema iniciado.");

}

/*
==========================================================
SECURITY
==========================================================
*/

function initializeSecurity(){

    preventEmptyLinks();

    externalLinks();

    sanitizeForms();

    monitorErrors();

}

/*
==========================================================
LINKS VAZIOS
==========================================================
*/

function preventEmptyLinks(){

    document

    .querySelectorAll('a[href="#"]')

    .forEach(link=>{

        link.addEventListener(

            "click",

            event=>{

                event.preventDefault();

            }

        );

    });

}

/*
==========================================================
LINKS EXTERNOS
==========================================================
*/

function externalLinks(){

    document

    .querySelectorAll('a[target="_blank"]')

    .forEach(link=>{

        if(

            !link.hasAttribute("rel")

        ){

            link.setAttribute(

                "rel",

                "noopener noreferrer"

            );

        }

    });

}

/*
==========================================================
FORMULÁRIOS
==========================================================
*/

function sanitizeForms(){

    const forms=document.querySelectorAll("form");

    forms.forEach(form=>{

        form.setAttribute(

            "autocomplete",

            "off"

        );

    });

}

/*
==========================================================
ERROS
==========================================================
*/

function monitorErrors(){

    window.addEventListener(

        "error",

        event=>{

            console.error(

                "Erro:",

                event.message

            );

        }

    );

}

/*
==========================================================
ATALHOS
==========================================================
*/

function $(selector){

    return document.querySelector(selector);

}

function $$(selector){

    return document.querySelectorAll(selector);

}

/*
==========================================================
UTILIDADES
==========================================================
*/

function isMobile(){

    return window.innerWidth<=768;

}

function isTablet(){

    return window.innerWidth<=992;

}

function isDesktop(){

    return window.innerWidth>992;

}

function scrollTopSmooth(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*
==========================================================
VERSÃO
==========================================================
*/

const SITE_VERSION="5.0.0"; /*
==========================================================
SCRIPT.JS V5
PARTE 10
FINALIZAÇÃO
==========================================================
*/

/*
==========================================================
INICIALIZAÇÃO DEFINITIVA
==========================================================
*/

function initializeSite(){

    initializeIcons();

    cacheElements();

    initializeVariables();

    initializeMobileMenu();

    initializeHeader();

    initializeFAQ();

    initializeScrollReveal();

    initializeAnalytics();

    initializeUX();

    initializePerformance();

    initializeSecurity();

    console.info(

        `Dr. Gabriel Vinícius - Site V${SITE_VERSION}`

    );

}

/*
==========================================================
VERIFICAÇÕES
==========================================================
*/

function runDiagnostics(){

    const diagnostics={

        header:!!header,

        menu:!!menu,

        menuToggle:!!menuToggle,

        faq:faqItems.length,

        sections:sections.length,

        floatingButton:!!floatingButton,

        toast:!!toast

    };

    console.table(diagnostics);

}

/*
==========================================================
PRODUÇÃO
==========================================================
*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    runDiagnostics();

});

/*
==========================================================
TRATAMENTO DE ERROS
==========================================================
*/

window.addEventListener("unhandledrejection",(event)=>{

    console.error(

        "Promise rejeitada:",

        event.reason

    );

});

/*
==========================================================
MODO DEBUG
==========================================================
*/

const DEBUG=false;

if(!DEBUG){

    console.log=function(){};

    console.debug=function(){};

}

/*
==========================================================
FIM DO SCRIPT
==========================================================
*/
