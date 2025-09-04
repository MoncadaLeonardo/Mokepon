let ataqueJugador
let ataqueEnemigo 
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() { 
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let sectionbotonMascotaJugador = document.getElementById('boton-seleccionar')
    sectionbotonMascotaJugador.style.display = 'none'

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')


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
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

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
let spanVidasJugador = document.getElementById('vidas-jugador')
let spanVidasEnemigo = document.getElementById('vidas-enemigo')

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
    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataque-jugador')
    let ataquesDelEnemigo = document.getElementById('ataque-enemigo')

    let nuevoAtaqueDelJugador  = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function mensajeFinal (resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')

    sectionMensajes.innerHTML = resultadoFinal

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'flex'
}

function reiniciarJuego(){
        location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)