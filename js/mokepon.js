const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'
const sectionbotonMascotaJugador = document.getElementById('boton-seleccionar')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-enemigo')

const sectionReiniciar = document.getElementById('reiniciar')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo  = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './imagenes/fuego.png', 5)
let capipepo = new Mokepon('Capipepo', './imagenes/agua.png', 5)
let ratigueya = new Mokepon('Ratigueya', './imagenes/tierra.png', 5)

hipodoge.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌾', id: 'boton-tierra'},
)

capipepo.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌾', id: 'boton-tierra'},
)

ratigueya.ataques.push(
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
)

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() { 
    sectionSeleccionarMascota.style.display = 'block'
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
        <div class="personaje-fuego">
            <img class="imagen-fuego" src="${mokepon.foto}" alt="${mokepon.nombre}">
            <label for="${mokepon.nombre}">${mokepon.nombre}</label>
            <input type="radio" name="mascota" id=${mokepon.nombre}>
        </div>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    })

    

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionbotonMascotaJugador.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('SELECCIONA UNA MASCOTA PARA CONTINUAR')
    } 

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="botones BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                 ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            ataqueEnemigoAleatorio ()
        })
    })
    
}

function seleccionarMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[ataqueAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[ataqueAleatorio].ataques
    secuenciaAtaque()
}

function ataqueEnemigoAleatorio () {
    let ataqueAleatorio = aleatorio (0, ataquesMokeponEnemigo.length -1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
       ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
         ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATASTE BRO")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE BRO')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE BRO')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE BRO')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE MI BRO, LO SIENTO')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } 
    }  

    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador = victoriasEnemigo) {
        mensajeFinal('EMPATASTE, BRO!')
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal('FELICIDADES! GANASTE!!!')
    } else {
        mensajeFinal('PERDISTE BRO, LO SIENTO!')
    }
}

function crearMensaje (resultado) {
    let nuevoAtaqueDelJugador  = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

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