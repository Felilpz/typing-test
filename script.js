const texto = document.getElementById('texto')
const entrada = document.getElementById('input-text')
const reiniciar = document.getElementById('btn-resetar')
const resultado = document.getElementById('tempo')
const historico = document.getElementById('historico')
const alterarTema = document.querySelector('#btn-tema')

// adicionar api para gerar textos dps.

const textos = [
    "bife wellignton comeu caça rato jogando no flamengo",
    "flamengo campeao da champions league em cima do time da casa tiquinho soares",
    "haaland da caneta em gerson após dar voadora em german cano gol do vasco",
    "lountzer pare de feedar e let us win with no dumbass in our team",
    "foi zica o 2022, me fez perder a linha, pra fechar a bruta a retrospectiva, alguém segura o fut que chegou lá em cima, número um de esportes é a firma.",
    "Exemplo de texto",
    "Digitar mais um texto",
    "Não tenho mais exemplos",
    "Que horas são",
    "What time is it ou Whats the time?"
]

function novoTexto() {
    const index = Math.floor((Math.random() * textos.length))
    texto.textContent = textos[index]
}

// evento a cada tecla digitada
function atualizarTeste() {
    iniciar()
    if (entrada.value === texto.textContent) {
        verificar()
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem('testeEmAndamento'))

    if (!statusDoTeste) {
        localStorage.setItem('tempoInicial', new Date().getTime()) //Pega a data que o usuario começou a digitar para calcular o tempo dps
        localStorage.setItem('testeEmAndamento', true) //teste em andamento
    }
}

function verificar() {
    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem('tempoInicial'))
    const tempoGasto = (tempoFinal - tempoInicial) / 1000
    const resultadoA = document.getElementById('resultado')
    resultadoA.innerHTML =
        `<p>
        Parabens! você terminou em <span class="marcar">${tempoGasto} segundos</span>
    </p>`

    addHistorico(texto.textContent, tempoGasto)

    localStorage.setItem('testeEmAndamento', false)
    entrada.value = ""
    novoTexto();
}

function addHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement('p')
    itemHistorico.innerHTML = `<span class="marcar">Texto: </span> "${textoDigitado}" // <span class="marcar">Tempo: </span>${tempoGasto}`

    historico.appendChild(itemHistorico)
}

function reiniciarTeste() {
    const resultadoFinal = document.getElementById('resultado');
    entrada.value = ""
    resultadoFinal.textContent = ""
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML = ""
}

function alternarTema() {
    const body = document.body;
    body.classList.toggle("escuro");

    const hSix = document.querySelector("h6");
    const spanS = document.querySelectorAll('.marcar');

    // Armazenar as cores atuais e anteriores do tema
    let corAtual, corAnterior;
    if (body.classList.contains("escuro")) {
        corAtual = "#fff";
        corAnterior = "#252525";
    } else {
        corAtual = "#252525";
        corAnterior = "#fff";
    }

    // Alterar a cor do elemento h6
    hSix.style.color = corAtual;

    // Alterar a cor do texto destacado (.marcar)
    spanS.forEach(function(span) {
        if (span.style.backgroundColor === corAnterior) {
            span.style.backgroundColor = corAtual;
        } else {
            span.style.backgroundColor = corAnterior;
        }
    });
}


entrada.addEventListener('keyup', atualizarTeste)
reiniciar.addEventListener('click', reiniciarTeste)
alterarTema.addEventListener('click', alternarTema)

novoTexto();