// Lista de palavras com suas dicas e respostas
const listaPalavras = [
    {
        dica: "Formas de ingressar no ensino superior",
        respostas: ["ENEM", "FIES", "SISU", "PROUNI"]
    },
    {
        dica: "Que se aplica a tudo e todos",
        respostas: ["GERAL", "GLOBAL", "COMUM", "TOTAL"]
    },
    {
        dica: "Linguagem para estilizar web",
        respostas: ["HTML", "CSS", "JavaScript", "Ruby"]
    },
    {
        dica: "Medidas de Tempo",
        respostas: ["MINUTOS", "SÉCULOS", "HORAS", "DÉCADAS"]
    }
];

// Objeto que armazena os detalhes da palavra atual sendo adivinhada
let palavraAtual = {};

// Função para carregar uma nova palavra e iniciar o jogo
function carregarPalavra() {
    // Seleciona um índice aleatório da lista de palavras
    const indicePalavra = Math.floor(Math.random() * listaPalavras.length);
    // Obtém a palavra atual com base no índice aleatório
    palavraAtual = listaPalavras[indicePalavra];
    // Inicializa um array para armazenar as respostas encontradas
    palavraAtual.respostasEncontradas = []; 
    // Define a dica da palavra atual na interface
    document.querySelector(".dica").textContent = `Dica: ${palavraAtual.dica}`;
    // Limpa e reinicializa os quadrados de resposta na interface
    document.querySelectorAll(".quadrado").forEach(quadrado => {
        quadrado.textContent = "";
        quadrado.querySelector('.content')?.classList.remove('rotated');
    });
    // Limpa a mensagem de feedback na interface
    document.querySelector(".mensagem").textContent = "";
}

// Função para verificar a resposta fornecida pelo jogador
function verificarResposta() {
    // Obtém o elemento de entrada de texto para a resposta
    const inputResposta = document.querySelector(".resposta");
    // Obtém a resposta digitada pelo jogador e remove espaços em branco
    const respostaDigitada = inputResposta.value.trim().toLowerCase();
    // Converte todas as respostas possíveis da palavra atual para minúsculas
    const respostasMinusculas = palavraAtual.respostas.map(resposta => resposta.toLowerCase());

    // Verifica se a resposta digitada está na lista de respostas e se ainda não foi encontrada
    if (respostasMinusculas.includes(respostaDigitada) && !palavraAtual.respostasEncontradas.includes(respostaDigitada)) {
        // Adiciona a resposta encontrada ao array de respostas encontradas da palavra atual
        palavraAtual.respostasEncontradas.push(respostaDigitada);
        // Limpa o campo de entrada de texto
        inputResposta.value = "";
        // Encontra o índice da resposta correta na lista de respostas
        const indiceRespostaCorreta = respostasMinusculas.indexOf(respostaDigitada);
        // Encontra o quadrado correspondente ao índice da resposta correta na interface
        const quadradoCorrespondente = document.getElementById(`quadrado${indiceRespostaCorreta + 1}`);
        // Exibe a resposta correta no quadrado correspondente
        quadradoCorrespondente.querySelector('.content').innerText = palavraAtual.respostas[indiceRespostaCorreta];
        // Adiciona a classe 'rotated' para girar o quadrado correspondente
        quadradoCorrespondente.querySelector('.content').classList.add('rotated');

        // Verifica se todas as respostas foram encontradas
        if (palavraAtual.respostasEncontradas.length === palavraAtual.respostas.length) {
            // Exibe uma mensagem de parabéns na interface
            document.querySelector(".mensagem").textContent = "Parabéns! Você acertou todas as respostas.";
        }
    } else {
        // Se a resposta estiver incorreta ou já tiver sido encontrada, exibe um alerta
        alert("Resposta incorreta. Tente novamente.");
    }
}

// Inicia o jogo carregando a primeira palavra
carregarPalavra();
