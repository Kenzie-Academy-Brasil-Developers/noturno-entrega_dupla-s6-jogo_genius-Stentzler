//Pegando nome para iniciar o jogo:
const jogoContainer = document.getElementById('container')
let nome
criandoNomeParaJogar()



function criandoNomeParaJogar(){
    jogoContainer.innerHTML = ""

    jogoContainer.innerHTML=`
    <div class="jogo-mensagem">
    <h3>Insira seu nome!</h3>
    <label for="name">
        <input type="text" id="nameinp" maxlength="15" required>
    </label>
    <button type="submit" class="btn-2" id="nameBtn" onclick="pegandoNome()">Estou Pronto!</button>
    </div>`
}

function pegandoNome(){
    let input = document.getElementById('nameinp')
    let inputValue = input.value
    nome = inputValue
    input.value = ""
    
    if(inputValue.length >= 1){
        iniciarJogoComNome(inputValue)
    } else {
        alert('Insira um nome!!!!')
    }
}

function iniciarJogoComNome(input){
    jogoContainer.innerHTML = ""

    jogoContainer.innerHTML = `
    <button class="btn verde" id="1" value="1" onclick=""></button>
    <button class="btn amarelo" id="2" value="2" onclick=""></button>
    <button class="btn vermelho" id="3" value="3" onclick=""></button>
    <button class="btn azul" id="4" value="4" onclick=""></button>

    <div class="jogo-mensagem" id="jogo-mensagem">
        <h3>Bem-Vindo ${input}</h3>
        <p>Maior Pontuacao: <small>${maiorPontuacao}</small> pontos</p>
        <button class="iniciar-btn" id="iniciar" onclick="rodadaDoPC()">Jogar!</button>
    </div>`

    criaSequenciaDasLuzes()
    getButtons()
}
//-----------------------------
//Jogo Iniciado!


let sequenciaDasLuzes = []
let sequenciaDoUsuario = []
let rodada = 1
let maiorPontuacao = 0

let btnVerde
let btnAmarelo
let btnVermelho
let btnAzul

function getButtons(){
    btnVerde = document.getElementById('1')
    btnAmarelo = document.getElementById('2')
    btnVermelho = document.getElementById('3')
    btnAzul = document.getElementById('4')
    btnIniciar = document.getElementById('iniciar')
}

function criaSequenciaDasLuzes() { //aqui pode ser passado um numero maximo de luzes
    sequenciaDasLuzes = []

    for(let i = 0; i < 5; i++) {
        let randomNumero = Math.ceil(Math.random() * 4)

        sequenciaDasLuzes.push(randomNumero)
    }
}


//---------------------------

function verdeFlash(){
    btnVerde.style.backgroundColor = 'rgb(7, 122, 7)';
}
function amareloFlash(){
    btnAmarelo.style.backgroundColor = 'rgb(175, 175, 5)'
}
function vermelhoFlash(){
    btnVermelho.style.backgroundColor = 'rgb(151, 21, 21)'
}
function azulFlash(){
    btnAzul.style.backgroundColor = 'rgb(31, 13, 196)'
}

function piscaBotao(valorDeUmAQuatro){
    if(valorDeUmAQuatro == 1){
        btnVerde.style.backgroundColor = 'rgb(48, 236, 48)'
        const verdeFlashStoper = () => {setTimeout(verdeFlash, 400)}
        verdeFlashStoper()
        clearTimeout(verdeFlashStoper)
    } 
    if(valorDeUmAQuatro == 2){
        btnAmarelo.style.backgroundColor = 'rgb(250, 250, 35)'
        const amareloFlashStoper = () => {setTimeout(amareloFlash, 400)}
        amareloFlashStoper()
        clearTimeout(amareloFlashStoper)
    } 
    if(valorDeUmAQuatro == 3){
        btnVermelho.style.backgroundColor = 'rgb(230, 27, 27)'
        const vermelhoFlashStoper = () => {setTimeout(vermelhoFlash, 400)}
        vermelhoFlashStoper()
        clearTimeout(vermelhoFlashStoper)
    } 
    if(valorDeUmAQuatro == 4){
        btnAzul.style.backgroundColor = 'rgb(42, 63, 252)'
        const azulFlashStoper = () => {setTimeout(azulFlash, 400)}
        azulFlashStoper()
        clearTimeout(azulFlashStoper)
    }
}

//---------------------------
function rodadaDoPCMensagem(){
    jogoContainer.innerHTML = ""

    jogoContainer.innerHTML = `
    <button class="btn verde" id="1" value="1" onclick=""></button>
    <button class="btn amarelo" id="2" value="2" onclick=""></button>
    <button class="btn vermelho" id="3" value="3" onclick=""></button>
    <button class="btn azul" id="4" value="4" onclick=""></button>

    <div class="jogo-mensagem" id="jogo-mensagem">
        <h3 id="muitobem">Muito bem!</h3>
        <p style="margin-bottom:80px">Preste Atenção Nas Luzes</p>
    </div>`

    if(rodada === 1){
        let mensagemMuitoBem = document.getElementById('muitobem')
        mensagemMuitoBem.innerText = "Vamos Começar!!"
    }

    getButtons()
}

function rodadaDoPC(){
    rodadaDoPCMensagem()
    
    let counter = 0
    let sequencia = []

    for(i = 0; i < rodada; i++){
        sequencia.push(sequenciaDasLuzes[i])
    }

    const piscaUmBotao = ()=> {
        piscaBotao(sequencia[counter])

        if(counter == rodada){
            clearInterval(teste)
            rodadaUsuario()
        }
        counter++
    }

    let teste = setInterval((piscaUmBotao),800)
}
//-----------------------------------------------
function rodadaUsuarioMensagem(){
    jogoContainer.innerHTML = ""

    jogoContainer.innerHTML = `
    <button class="btn verde" id="1" value="1" onclick=""></button>
    <button class="btn amarelo" id="2" value="2" onclick=""></button>
    <button class="btn vermelho" id="3" value="3" onclick=""></button>
    <button class="btn azul" id="4" value="4" onclick=""></button>

    <div class="jogo-mensagem" id="jogo-mensagem">
        <h3 id='mensagem' style="margin-bottom: 40px">Repita a ordem das cores</h3>
    </div>`

    getButtons()
}

function rodadaUsuario(){
    esperandoCondicao()
    rodadaUsuarioMensagem()
    sequenciaDoUsuario = []

    btnVerde.style.cursor = 'pointer'
    btnVermelho.style.cursor = 'pointer'
    btnAmarelo.style.cursor = 'pointer'
    btnAzul.style.cursor = 'pointer'

    btnVerde.addEventListener('click', (e) => {
        piscaBotao(e.target.value)
        sequenciaDoUsuario.push(e.target.value)
    })
    btnVermelho.addEventListener('click', (e) => {
        piscaBotao(e.target.value)
        sequenciaDoUsuario.push(e.target.value)
    })
    btnAzul.addEventListener('click', (e) => {
        piscaBotao(e.target.value)
        sequenciaDoUsuario.push(e.target.value)
    })
    btnAmarelo.addEventListener('click', (e) => {
        piscaBotao(e.target.value)
        sequenciaDoUsuario.push(e.target.value)
    })

    esperandoCondicao()
}

function check(sequenciaDoUsuario) {

    let acertou

    for(let i = 0; i < sequenciaDoUsuario.length; i++){
        if (sequenciaDoUsuario[i] == sequenciaDasLuzes[i]){
            acertou = true
        } else {
            acertou = false
        }
    }

    if (acertou === false) {
        perdeu()
    }    
    if (rodada === sequenciaDasLuzes.length){       
        acertou = false
        setTimeout(venceu(nome), 2000)
    }
    if(acertou === true) {
        rodada += 1

        maiorPontuacao = rodada

        sequenciaDoUsuario = []
        rodadaDoPC()    
    } 
}

function venceu() { 
    jogoContainer.innerHTML = ""
    sequenciaDoUsuario = []
    rodada = 1

    jogoContainer.innerHTML = `
    <button class="btn verde" id="1" value="1" onclick=""></button>
    <button class="btn amarelo" id="2" value="2" onclick=""></button>
    <button class="btn vermelho" id="3" value="3" onclick=""></button>
    <button class="btn azul" id="4" value="4" onclick=""></button>

    <div class="jogo-mensagem" id="jogo-mensagem">
        <h3>Você Venceu!!</h3>
        <p>Será que foi sorte?</p>
        <p>Maior pontuação: <small>${maiorPontuacao}</small> pontos</p>
        <button class="iniciar-btn" id="iniciar" onclick="rodadaDoPC()">Jogar Novamente</button>
    </div>`

    criaSequenciaDasLuzes()
    getButtons()
}

function perdeu(){
    jogoContainer.innerHTML = ""
    sequenciaDoUsuario = []
    rodada = 1

    jogoContainer.innerHTML = `
    <button class="btn verde" id="1" value="1" onclick=""></button>
    <button class="btn amarelo" id="2" value="2" onclick=""></button>
    <button class="btn vermelho" id="3" value="3" onclick=""></button>
    <button class="btn azul" id="4" value="4" onclick=""></button>

    <div class="jogo-mensagem" id="jogo-mensagem">
        <h3>Você Errou!!!!</h3>
        <p>Tudo bem... quem não erra?</p>
        <p>Maior pontuacao: <small>${maiorPontuacao}</small> pontos</p>
        <button class="iniciar-btn" id="iniciar" onclick="rodadaDoPC()">Tente outra vez!</button>
    </div>`

    criaSequenciaDasLuzes()
    getButtons()
}

function esperandoCondicao() {
    if(sequenciaDoUsuario.length < rodada) {
       window.setTimeout(esperandoCondicao, 2000) /// mudar aqui para menos
    } else {
      check(sequenciaDoUsuario)
    }
}