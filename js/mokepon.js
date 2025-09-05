const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'
const sectionbotonMascotaJugador = document.getElementById('boton-seleccionar')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-enemigo')

const sectionReiniciar = document.getElementById('reiniciar')

let ataqueJugador
let ataqueEnemigo 
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() { 
    sectionSeleccionarMascota.style.display = 'block'
    sectionSeleccionarAtaque.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionbotonMascotaJugador.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge' 
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('SELECCIONA UNA MASCOTA PARA CONTINUAR')
    } 

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO🔥'
    ataqueEnemigoAleatorio ()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA💧'
    ataqueEnemigoAleatorio ()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA🌾'
    ataqueEnemigoAleatorio ()
}

function ataqueEnemigoAleatorio () {
    ataqueEnemigo = aleatorio (1, 3)
    if (ataqueEnemigo == 1) {
       ataqueEnemigo = 'FUEGO🔥'
    } else if (ataqueEnemigo == 2) {
        ataqueEnemigo = 'AGUA💧'
    } else {
         ataqueEnemigo = 'TIERRA🌾'
    }

    combate()
}

function combate() {
    if(ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATASTE BRO')
    } else if(ataqueJugador == 'FUEGO🔥' && ataqueEnemigo == 'TIERRA🌾') {
        crearMensaje('GANASTE BRO')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA💧' && ataqueEnemigo == 'FUEGO🔥') {
        crearMensaje('GANASTE BRO')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA🌾' && ataqueEnemigo == 'AGUA💧') {
        crearMensaje('GANASTE BRO')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('PERDISTE MI BRO, LO SIENTO')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }   

    revisarVidas()
}

function revisarVidas(){
    if (vidasEnemigo == 0) {
        mensajeFinal('FELICIDADES! GANASTE')
    } else if (vidasJugador == 0) {
        mensajeFinal('LO SIENTO, PERDISTE')
    }
}

function crearMensaje (resultado) {
    let nuevoAtaqueDelJugador  = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function mensajeFinal (resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'flex'
}

function reiniciarJuego(){
        location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)