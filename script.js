/*
=========================================================
Dr. Gabriel Vinícius
script.js
Versão 1.0
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================================================
    ELEMENTOS
    =========================================================
    */

    const body = document.body;

    const header = document.querySelector(".header");

    const menuToggle = document.querySelector(".menu-toggle");

    const navigation = document.querySelector(".nav");

    const navLinks = document.querySelectorAll(".nav a");

    const sections = document.querySelectorAll("main section[id]");

    const floatingButton = document.querySelector(".floating-cta");

    const faqItems = document.querySelectorAll(".faq-item");

    const reviewCards = document.querySelectorAll(".review");

    const form = document.querySelector("#contactForm");

    const whatsappInput = document.querySelector("#whatsapp");

    /*
    =========================================================
    MENU MOBILE
    =========================================================
    */

    function openMenu() {

        navigation.classList.add("active");

        menuToggle.classList.add("active");

        body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");

    }

    function closeMenu() {

        navigation.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

    }

    function toggleMenu() {

        if (navigation.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }

    if (menuToggle) {

        menuToggle.addEventListener("click", toggleMenu);

    }

    navLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", event => {

        if (!navigation) return;

        const insideNav = navigation.contains(event.target);

        const insideButton = menuToggle.contains(event.target);

        if (

            navigation.classList.contains("active") &&

            !insideNav &&

            !insideButton

        ) {

            closeMenu();

        }

    });

    document.addEventListener("keydown", event => {

        if (

            event.key === "Escape" &&

            navigation.classList.contains("active")

        ) {

            closeMenu();

        }

    });

    /*
    =========================================================
    HEADER
    =========================================================
    */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();

    /*
    =========================================================
    SCROLL SUAVE
    =========================================================
    */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href.startsWith("#")) return;

            event.preventDefault();

            const target = document.querySelector(href);

            if (!target) return;

            const offset = header.offsetHeight;

            const position =

                target.getBoundingClientRect().top +

                window.pageYOffset -

                offset;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        });

    });

    /*
    =========================================================
    MENU ATIVO
    =========================================================
    */

    function updateActiveMenu() {

        const scroll =

            window.scrollY +

            header.offsetHeight +

            120;

        sections.forEach(section => {

            const top = section.offsetTop;

            const bottom = top + section.offsetHeight;

            const id = section.id;

            const link = document.querySelector(

                `.nav a[href="#${id}"]`

            );

            if (!link) return;

            if (scroll >= top && scroll < bottom) {

                navLinks.forEach(item =>

                    item.classList.remove("active")

                );

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveMenu);

    updateActiveMenu();

    /*
    =========================================================
    CONTINUA NA PARTE 2
    =========================================================
    */

});

    /*
    =========================================================
    FAQ ACCORDION
    =========================================================
    */

    function initFaq() {

        if (!faqItems.length) return;

        faqItems.forEach(item => {

            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (!question || !answer) return;

            question.setAttribute("aria-expanded", "false");

            answer.style.maxHeight = "0px";

            question.addEventListener("click", () => {

                const opened = item.classList.contains("active");

                faqItems.forEach(faq => {

                    faq.classList.remove("active");

                    const q = faq.querySelector(".faq-question");
                    const a = faq.querySelector(".faq-answer");

                    if (q) q.setAttribute("aria-expanded", "false");

                    if (a) a.style.maxHeight = "0px";

                });

                if (!opened) {

                    item.classList.add("active");

                    question.setAttribute("aria-expanded", "true");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            });

        });

    }

    /*
    =========================================================
    BOTÃO FLUTUANTE
    =========================================================
    */

    function initFloatingButton() {

        if (!floatingButton) return;

        function updateFloatingButton() {

            if (window.scrollY > 450) {

                floatingButton.classList.add("show");

            } else {

                floatingButton.classList.remove("show");

            }

        }

        updateFloatingButton();

        window.addEventListener("scroll", updateFloatingButton);

        floatingButton.addEventListener("click", () => {

            const section =
                document.querySelector("#agendamento");

            if (!section) return;

            const offset = header.offsetHeight;

            const position =
                section.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        });

    }

    /*
    =========================================================
    ANIMAÇÕES
    =========================================================
    */

    function initAnimations() {

        if (!("IntersectionObserver" in window)) return;

        const elements = document.querySelectorAll(

            ".card, .hero-content, .hero-image, .section-title"

        );

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold: 0.15

            }

        );

        elements.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    }

    /*
    =========================================================
    CARROSSEL DAS AVALIAÇÕES
    =========================================================
    */

    function initReviews() {

        if (reviewCards.length <= 1) return;

        let current = 0;

        function showReview(index) {

            reviewCards.forEach((card, i) => {

                card.classList.toggle(

                    "active",

                    i === index

                );

            });

        }

        showReview(current);

        setInterval(() => {

            current++;

            if (current >= reviewCards.length) {

                current = 0;

            }

            showReview(current);

        }, 6000);

    }

    /*
    =========================================================
    INICIALIZAÇÃO
    =========================================================
    */

    initFaq();

    initFloatingButton();

    initAnimations();

    initReviews();

    /*
    =========================================================
    CONTINUA NA PARTE 3
    =========================================================
    */

    /*
    =========================================================
    FORMULÁRIO PREMIUM
    =========================================================
    */

    function showFieldError(input, message) {

        removeFieldError(input);

        input.classList.add("input-error");

        const error = document.createElement("small");

        error.className = "field-error";

        error.textContent = message;

        input.parentNode.appendChild(error);

    }

    function removeFieldError(input) {

        input.classList.remove("input-error");

        input.classList.remove("input-success");

        const error = input.parentNode.querySelector(".field-error");

        if (error) {

            error.remove();

        }

    }

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    function phoneMask(value) {

        value = value.replace(/\D/g, "");

        value = value.substring(0,11);

        if(value.length > 10){

            value = value.replace(

                /^(\d{2})(\d{5})(\d{4}).*/,

                "($1) $2-$3"

            );

        }

        else if(value.length > 6){

            value = value.replace(

                /^(\d{2})(\d{4})(\d+)/,

                "($1) $2-$3"

            );

        }

        else if(value.length > 2){

            value = value.replace(

                /^(\d{2})(\d+)/,

                "($1) $2"

            );

        }

        return value;

    }

    if (whatsappInput) {

        whatsappInput.addEventListener("input", e => {

            e.target.value = phoneMask(e.target.value);

        });

    }

    /*
    =========================================================
    TOAST
    =========================================================
    */

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        },50);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },3000);

    }

    /*
    =========================================================
    ENVIO
    =========================================================
    */

    function initForm(){

        if(!form) return;

        form.addEventListener("submit",(event)=>{

            event.preventDefault();

            const nome = form.nome;

            const whatsapp = form.whatsapp;

            const email = form.email;

            const mensagem = form.mensagem;

            [nome,whatsapp,email,mensagem].forEach(removeFieldError);

            let valid = true;

            if(nome.value.trim().length < 3){

                showFieldError(nome,"Informe seu nome.");

                valid = false;

            }else{

                nome.classList.add("input-success");

            }

            if(

                whatsapp.value.replace(/\D/g,"").length < 10

            ){

                showFieldError(

                    whatsapp,

                    "WhatsApp inválido."

                );

                valid = false;

            }else{

                whatsapp.classList.add("input-success");

            }

            if(

                email.value.trim()!=="" &&

                !validateEmail(email.value)

            ){

                showFieldError(

                    email,

                    "E-mail inválido."

                );

                valid = false;

            }else{

                if(email.value.trim()!==""){

                    email.classList.add("input-success");

                }

            }

            if(mensagem.value.trim().length < 10){

                showFieldError(

                    mensagem,

                    "Descreva melhor sua mensagem."

                );

                valid = false;

            }else{

                mensagem.classList.add("input-success");

            }

            if(!valid){

                return;

            }

            const button = form.querySelector("button");

            const original = button.innerHTML;

            button.disabled = true;

            button.innerHTML = "Enviando...";

            setTimeout(()=>{

                form.reset();

                document

                .querySelectorAll(".input-success")

                .forEach(input=>{

                    input.classList.remove("input-success");

                });

                button.disabled = false;

                button.innerHTML = original;

                showToast("Mensagem enviada com sucesso!");

            },1500);

        });

    }

    /*
    =========================================================
    LUCIDE
    =========================================================
    */

    if(window.lucide){

        lucide.createIcons();

    }

    /*
    =========================================================
    INICIALIZAÇÃO
    =========================================================
    */

    initForm();

    /*
    =========================================================
    MELHORIAS PREMIUM
    =========================================================
    */

    /*
    =========================================================
    HEADER INTELIGENTE
    =========================================================
    */

    let lastScroll = 0;

    function smartHeader() {

        if (!header) return;

        const current = window.pageYOffset;

        if (current <= 20) {

            header.classList.remove("hide");

            lastScroll = current;

            return;

        }

        if (current > lastScroll && current > 120) {

            header.classList.add("hide");

        } else {

            header.classList.remove("hide");

        }

        lastScroll = current;

    }

    window.addEventListener("scroll", smartHeader);

    /*
    =========================================================
    FECHAR MENU AO REDIMENSIONAR
    =========================================================
    */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeMenu();

        }

    });

    /*
    =========================================================
    REVEAL EM CASCATA
    =========================================================
    */

    document.querySelectorAll(".cards-grid").forEach(grid => {

        [...grid.children].forEach((card, index) => {

            card.style.transitionDelay = `${index * 120}ms`;

        });

    });

    /*
    =========================================================
    RESPEITAR ACESSIBILIDADE
    =========================================================
    */

    if (

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches

    ) {

        document.documentElement.classList.add(

            "reduce-motion"

        );

    }

    /*
    =========================================================
    PRELOAD DA IMAGEM PRINCIPAL
    =========================================================
    */

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage) {

        heroImage.fetchPriority = "high";

        heroImage.loading = "eager";

        heroImage.decoding = "async";

    }

    /*
    =========================================================
    DEBOUNCE
    =========================================================
    */

    function debounce(callback, delay = 80) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

    window.addEventListener(

        "scroll",

        debounce(() => {

            updateHeader();

            updateActiveMenu();

        })

    );

    /*
    =========================================================
    SWIPE NAS AVALIAÇÕES
    =========================================================
    */

    if (reviewCards.length > 1) {

        let startX = 0;

        let currentReview = 0;

        function showReview(index) {

            reviewCards.forEach((card, i) => {

                card.classList.toggle(

                    "active",

                    i === index

                );

            });

        }

        reviewCards.forEach(card => {

            card.addEventListener("touchstart", event => {

                startX = event.changedTouches[0].clientX;

            });

            card.addEventListener("touchend", event => {

                const endX = event.changedTouches[0].clientX;

                const distance = endX - startX;

                if (Math.abs(distance) < 50) return;

                if (distance < 0) {

                    currentReview++;

                } else {

                    currentReview--;

                }

                if (currentReview >= reviewCards.length) {

                    currentReview = 0;

                }

                if (currentReview < 0) {

                    currentReview = reviewCards.length - 1;

                }

                showReview(currentReview);

            });

        });

    }

    /*
    =========================================================
    LOG
    =========================================================
    */

    console.info(

        "%cSite carregado com sucesso",

        "color:#0D3B66;font-size:14px;font-weight:bold"

    );

});
