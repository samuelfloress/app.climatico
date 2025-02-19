const chaveDaApi = "4daef619091d41f39ed211335251102";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) {
        alert("Por favor, digite uma cidade!");
        return;
    }

    console.log("Cidade digitada:", cidade);

    const dados = await buscarDadosDaCidade(cidade);

    if (!dados || !dados.current) {
        alert("Cidade não encontrada. Verifique o nome e tente novamente.");
        return;
    }

    preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    try {
        const resposta = await fetch(apiUrl);

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        return null;
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = `${temperatura} °C`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("humidade").textContent = `${humidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} km/h`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);


}

document.addEventListener("DOMContentLoaded", function () {
  const inputBusca = document.getElementById("input-busca");
  const btnBusca = document.querySelector(".btn-busca");

  // Quando o usuário pressionar "Enter" no campo de busca
  inputBusca.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Evita o comportamento padrão do formulário
          btnBusca.click(); // Aciona o clique no botão de busca
      }
  });
});
const iconeClima = document.getElementById("icone-condicao");

function atualizarIcone(codigo) {
    iconeClima.src = `https://cdn.weatherapi.com/weather/64x64/day/${codigo}.png`;
}

function exibirMensagem(texto, tipo = "erro") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.style.color = tipo === "erro" ? "red" : "green";
}


document.addEventListener("DOMContentLoaded", function () {
    const inputBusca = document.getElementById("input-busca");
    const btnBusca = document.querySelector(".btn-busca");

    function buscarClima() {
        if (inputBusca.value.trim() === "") {
            exibirMensagem("Por favor, digite uma cidade!", "erro");
            return;
        }
        btnBusca.disabled = true; // Evita múltiplos cliques
        exibirMensagem("Carregando...", "info");

        // Simula busca (substitua pela API real)
        setTimeout(() => {
            btnBusca.disabled = false;
            exibirMensagem(""); // Limpa a mensagem
        }, 2000);
    }

    btnBusca.addEventListener("click", buscarClima);
    inputBusca.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            buscarClima();
        }
    });
});
