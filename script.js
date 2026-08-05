const API_URL = "https://script.google.com/macros/s/AKfycbwYa5HId5Uv2Vw6dTuhSyc44DCJEQW5w1l3KHWfp7l3twTJ-e1GwqFxsfPjB8k7bUyW/exec";

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const botao = form.querySelector("button");

        botao.disabled = true;
        botao.innerText = "Enviando...";

        const dados = {
            nome: document.getElementById("nome").value,
            whatsapp: document.getElementById("whatsapp").value,
            email: document.getElementById("email").value,
            motivo: document.getElementById("motivo").value,
            mensagem: document.getElementById("mensagem").value,
            origem: "Site"
        };

        try {

            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const json = await resposta.json();

            if (json.success) {

                alert("Solicitação enviada com sucesso!");

                form.reset();

            } else {

                alert("Erro ao enviar a solicitação.");

            }

        } catch (erro) {

            console.error(erro);

            alert("Erro de conexão com o servidor.");

        }

        botao.disabled = false;
        botao.innerText = "Solicitar Contato";

    });

}
