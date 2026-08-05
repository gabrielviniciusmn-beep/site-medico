/*
=========================================================
Dr. Gabriel Vinícius
script.js
Versão 2.0
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const body = document.body;

    const header = document.querySelector(".header");

    const menuToggle = document.querySelector(".menu-toggle");

    const navigation = document.querySelector(".nav");

    const navLinks = [...document.querySelectorAll(".nav a")];

    const sections = [...document.querySelectorAll("main section[id]")];

    const floatingButton = document.querySelector(".floating-cta");

    const faqItems = [...document.querySelectorAll(".faq-item")];

    const reviewCards = [...document.querySelectorAll(".review")];

    const form = document.querySelector("#contactForm");

    const whatsappInput = document.querySelector("#whatsapp");

    let lastScroll = 0;

    /* ======================================================
       UTILITÁRIOS
    ====================================================== */

    const debounce = (callback, delay = 80) => {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => callback(...args), delay);

        };

    };

    const getHeaderHeight = () =>

        header ? header.offsetHeight : 0;

    const scrollToElement = selector => {

        const target = document.querySelector(selector);

        if (!target) return;

        const position =

            target.getBoundingClientRect().top +

            window.pageYOffset -

            getHeaderHeight();

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    };

    /* ======================================================
       MENU MOBILE
    ====================================================== */

    function openMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        body.classList.add("menu-open");

    }

    function closeMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        body.classList.remove("menu-open");

    }

    function toggleMenu() {

        navigation.classList.contains("active")

            ? closeMenu()

            : openMenu();

    }

    if (menuToggle) {

        menuToggle.addEventListener("click", toggleMenu);

    }

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {

                event.preventDefault();

                closeMenu();

                scrollToElement(href);

            }

        });

    });

    document.addEventListener("click", event => {

        if (!navigation || !menuToggle) return;

        if (

            navigation.classList.contains("active") &&

            !navigation.contains(event.target) &&

            !menuToggle.contains(event.target)

        ) {

            closeMenu();

        }

    });

    document.addEventListener("keydown", event => {

        if (

            event.key === "Escape" &&

            navigation?.classList.contains("active")

        ) {

            closeMenu();

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeMenu();

        }

    });

    /* ======================================================
       HEADER
    ====================================================== */

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(

            "scrolled",

            window.scrollY > 40

        );

        const currentScroll = window.pageYOffset;

        if (

            currentScroll > lastScroll &&

            currentScroll > 120

        ) {

            header.classList.add("hide");

        } else {

            header.classList.remove("hide");

        }

        lastScroll = currentScroll;

    }

    /* ======================================================
       MENU ATIVO
    ====================================================== */

    function updateActiveMenu() {

        const current =

            window.scrollY +

            getHeaderHeight() +

            120;

        sections.forEach(section => {

            const top = section.offsetTop;

            const bottom = top + section.offsetHeight;

            const link = document.querySelector(

                `.nav a[href="#${section.id}"]`

            );

            if (!link) return;

            link.classList.toggle(

                "active",

                current >= top && current < bottom

            );

        });

    }

    /* ======================================================
       SCROLL
    ====================================================== */

    const onScroll = debounce(() => {

        updateHeader();

        updateActiveMenu();

    });

    window.addEventListener("scroll", onScroll);

    updateHeader();

    updateActiveMenu();

    /*
    ======================================================
    CONTINUA NA PARTE 2
    ======================================================
    */    /* ======================================================
       FAQ
    ====================================================== */

    function initFaq() {

        if (!faqItems.length) return;

        faqItems.forEach(item => {

            const button = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (!button || !answer) return;

            button.setAttribute("aria-expanded", "false");
            answer.style.maxHeight = "0px";

            button.addEventListener("click", () => {

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

                    button.setAttribute("aria-expanded", "true");

                    answer.style.maxHeight =
                        `${answer.scrollHeight}px`;

                }

            });

        });

    }

    /* ======================================================
       BOTÃO FLUTUANTE
    ====================================================== */

    function initFloatingButton() {

        if (!floatingButton) return;

        function updateFloatingButton() {

            floatingButton.classList.toggle(

                "show",

                window.scrollY > 450

            );

        }

        updateFloatingButton();

        window.addEventListener(

            "scroll",

            debounce(updateFloatingButton)

        );

        floatingButton.addEventListener("click", event => {

            event.preventDefault();

            scrollToElement("#agendamento");

        });

    }

    /* ======================================================
       ANIMAÇÕES
    ====================================================== */

    function initAnimations() {

        if (!("IntersectionObserver" in window)) return;

        const animated = document.querySelectorAll(

            ".card, .section-title, .hero-content, .hero-image"

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

                threshold:0.15

            }

        );

        animated.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    }

    /* ======================================================
       AVALIAÇÕES
    ====================================================== */

    function initReviews() {

        if (reviewCards.length <= 1) return;

        let current = 0;

        function render() {

            reviewCards.forEach((card,index)=>{

                card.classList.toggle(

                    "active",

                    index===current

                );

            });

        }

        render();

        setInterval(()=>{

            current++;

            if(current>=reviewCards.length){

                current=0;

            }

            render();

        },6000);

        let startX = 0;

        reviewCards.forEach(card=>{

            card.addEventListener("touchstart",event=>{

                startX = event.changedTouches[0].clientX;

            });

            card.addEventListener("touchend",event=>{

                const endX = event.changedTouches[0].clientX;

                if(Math.abs(endX-startX)<50) return;

                if(endX<startX){

                    current++;

                }else{

                    current--;

                }

                if(current<0){

                    current=reviewCards.length-1;

                }

                if(current>=reviewCards.length){

                    current=0;

                }

                render();

            });

        });

    }

    /* ======================================================
       ACESSIBILIDADE
    ====================================================== */

    if(

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches

    ){

        document.documentElement.classList.add(

            "reduce-motion"

        );

    }

    /* ======================================================
       ANIMAÇÃO EM CASCATA
    ====================================================== */

    document.querySelectorAll(".cards-grid").forEach(grid=>{

        [...grid.children].forEach((card,index)=>{

            card.style.transitionDelay=`${index*120}ms`;

        });

    });

    /* ======================================================
       INICIALIZAÇÃO
    ====================================================== */

    initFaq();

    initFloatingButton();

    initAnimations();

    initReviews();

    /*
    ======================================================
    CONTINUA NA PARTE 3
    ======================================================
    */    /* ======================================================
       FORMULÁRIO
    ====================================================== */

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    function phoneMask(value) {

        value = value.replace(/\D/g, "").substring(0, 11);

        if (value.length > 10) {

            return value.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                "($1) $2-$3"
            );

        }

        if (value.length > 6) {

            return value.replace(
                /^(\d{2})(\d{4})(\d+)/,
                "($1) $2-$3"
            );

        }

        if (value.length > 2) {

            return value.replace(
                /^(\d{2})(\d+)/,
                "($1) $2"
            );

        }

        return value;

    }

    function showFieldError(input, message) {

        removeFieldError(input);

        input.classList.add("input-error");

        const error = document.createElement("small");

        error.className = "field-error";

        error.textContent = message;

        input.insertAdjacentElement("afterend", error);

    }

    function removeFieldError(input) {

        input.classList.remove(

            "input-error",

            "input-success"

        );

        const error = input.nextElementSibling;

        if (

            error &&

            error.classList.contains("field-error")

        ) {

            error.remove();

        }

    }

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.textContent = message;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    function initForm() {

        if (!form) return;

        if (whatsappInput) {

            whatsappInput.addEventListener("input", event => {

                event.target.value = phoneMask(

                    event.target.value

                );

            });

        }

        form.addEventListener("submit", event => {

            event.preventDefault();

            const nome =
                document.querySelector("#nome");

            const whatsapp =
                document.querySelector("#whatsapp");

            const email =
                document.querySelector("#email");

            const mensagem =
                document.querySelector("#mensagem");

            const inputs = [

                nome,

                whatsapp,

                email,

                mensagem

            ];

            inputs.forEach(removeFieldError);

            let valid = true;

            if (nome.value.trim().length < 3) {

                showFieldError(

                    nome,

                    "Informe seu nome."

                );

                valid = false;

            } else {

                nome.classList.add("input-success");

            }

            if (

                whatsapp.value.replace(/\D/g, "").length < 10

            ) {

                showFieldError(

                    whatsapp,

                    "WhatsApp inválido."

                );

                valid = false;

            } else {

                whatsapp.classList.add("input-success");

            }

            if (

                email.value.trim() &&

                !validateEmail(email.value)

            ) {

                showFieldError(

                    email,

                    "E-mail inválido."

                );

                valid = false;

            } else if (email.value.trim()) {

                email.classList.add("input-success");

            }

            if (mensagem.value.trim().length < 10) {

                showFieldError(

                    mensagem,

                    "Escreva uma mensagem mais detalhada."

                );

                valid = false;

            } else {

                mensagem.classList.add("input-success");

            }

            if (!valid) return;

            const button = form.querySelector("button");

            const originalText = button.textContent;

            button.disabled = true;

            button.textContent = "Enviando...";

            setTimeout(() => {

                form.reset();

                document

                    .querySelectorAll(".input-success")

                    .forEach(input => {

                        input.classList.remove(

                            "input-success"

                        );

                    });

                button.disabled = false;

                button.textContent = originalText;

                showToast(

                    "Mensagem enviada com sucesso!"

                );

            }, 1500);

        });

    }

    /* ======================================================
       LUCIDE
    ====================================================== */

    if (window.lucide) {

        lucide.createIcons();

    }

    /* ======================================================
       INICIALIZAÇÃO
    ====================================================== */

    initForm();

    console.info(

        "%c✓ Site carregado com sucesso.",

        "color:#0D3B66;font-weight:bold;font-size:14px"

    );

});
