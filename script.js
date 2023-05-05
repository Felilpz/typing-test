const texto = document.getElementById('texto')
const entrada = document.getElementById('input-text')
const reiniciar = document.getElementById('btn-resetar')
const resultado = document.getElementById('tempo')
const historico = document.getElementById('historico')
const alterarTema = document.getElementById('btn-tema')

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
    if(entrada.value === texto.textContent) {
        verificar()
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem('testeEmAndamento'))

    if(!statusDoTeste) {
        localStorage.setItem('tempoInicial', new Date().getTime()) //Pega a data que o usuario começou a digitar para calcular o tempo dps
        localStorage.setItem('testeEmAndamento', true) //teste em andamento
    }
}

function verificar() {
    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem('tempoInicial'))
    const tempoGasto = (tempoFinal - tempoInicial) / 1000
    const resultado = document.getElementById('resultado')
    resultado.innerHTML = 
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

    itemHistorico.innerHTML = `<span class="marcar">Texto: </span>${textoDigitado}`
    itemHistorico.innerHTML += `<p><span class="marcar">Tempo: </span>${tempoGasto}</p>`
    historico.appendChild(itemHistorico)

    const divHistorico = document.createElement('div')
    const itens
}

entrada.addEventListener('keyup', atualizarTeste)

novoTexto();