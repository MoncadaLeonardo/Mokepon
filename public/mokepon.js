/* mokepon.js - versión corregida para mostrar ataque del ENEMIGO correcto */

/* ------------------ referencias DOM ------------------ */
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionbotonMascotaJugador = document.getElementById('boton-seleccionar')

const sectionReglasJuego = document.getElementById('section-reglas')
const botonReglas = document.getElementById('reglas')

const sectionComoJugar = document.getElementById('como-jugar')
const botonRegresarInicio = document.getElementById('regresar-inicio')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

/* ------------------ estado ------------------ */
let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []        // historial local de tus ataques
let ataqueEnemigo  = []       // historial local de ataques enemigo (lo que vamos recibiendo)
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mokeponmap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

/* ------------------ clases y personajes ------------------ */
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho) 
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto)
    }
}

let hipodoge = new Mokepon('Hipodoge', './imagenes/fuego.png', 5, './imagenes/mokefuegoJugador.png')
let capipepo = new Mokepon('Capipepo', './imagenes/agua.png', 5, './imagenes/mokeaguaJugador.png')
let ratigueya = new Mokepon('Ratigueya', './imagenes/tierra.png', 5, './imagenes/moketierraJugador.png')

const HIPODOGE_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌾', id: 'boton-tierra'},
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌾', id: 'boton-tierra'},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🌾', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya)

/* ------------------ iniciar ------------------ */
function iniciarJuego() { 
    sectionSeleccionarMascota.style.display = 'block'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionComoJugar.style.display = 'none'

    mokepones.forEach((mokepon) =>{
        let ataquesHTML = mokepon.ataques.map(ataque => `<span>${ataque.nombre}</span>`).join(" ")
        opcionDeMokepones = `
            <div class="personajes"> 
                <img class="imagen-personaje" src="${mokepon.foto}" alt="${mokepon.nombre}">
                <label for="${mokepon.nombre}">${mokepon.nombre}</label>
                <input type="radio" name="mascota" id=${mokepon.nombre}>
                <div class="ataques-personaje">
                    <p>Ataques:</p>
                    <p>${ataquesHTML}</p>
                </div>
            </div>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonReglas.addEventListener('click', ReglasJuego)
    botonRegresarInicio.addEventListener('click', RegresarPantallaPrincipal)

    // conexion con servidor
    unirseAlJuego()
}

/* ---------- backend minimal: unirse / enviar posicion ---------- */
function unirseAlJuego() {
    fetch("http://192.168.0.113:8080/unirse")
        .then(res => res.text())
        .then(id => {
            console.log('mi id ->', id)
            jugadorId = id
        })
}

/* ---------- UI helpers ---------- */
function ReglasJuego() {
    sectionComoJugar.style.display = 'flex'
    sectionbotonMascotaJugador.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'none'
    sectionReglasJuego.style.display = 'none'
    botonReglas.style.display = 'none'
}
function RegresarPantallaPrincipal() { location.reload() }

/* ---------- seleccionar mascota ---------- */
function seleccionarMascotaJugador() {
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
        return
    }

    sectionbotonMascotaJugador.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'none'
    
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.113:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mokepon: mascotaJugador })
    })
}

/* ---------- ataques: render y secuencia ---------- */
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
    contenedorAtaques.innerHTML = ''
    ataques.forEach((ataque, idx) => {
        ataquesMokepon = `<button id="${ataque.id}-${idx}" class="botones BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botones = document.querySelectorAll('.BAtaque')
}

/* secuencia por turno: al click -> muestro tu ataque, POST al server, poll esperando ataque enemigo */
function secuenciaAtaque() {
    if (!botones || botones.length === 0) return
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let ataqueSeleccionado = null;
            if(e.target.textContent === '🔥') ataqueSeleccionado = 'FUEGO';
            else if (e.target.textContent === '💧') ataqueSeleccionado = 'AGUA';
            else ataqueSeleccionado = 'TIERRA';

            // mostrar ataque elegido ya en la UI
            crearMensajeAtaqueJugador(ataqueSeleccionado)

            // añadir al historial local
            ataqueJugador.push(ataqueSeleccionado)

            // deshabilitar boton
            boton.style.background = '#112f58';
            boton.disabled = true;

            // enviar ataque al servidor (un solo ataque por turno)
            enviarAtaqueTurno(ataqueSeleccionado)
        })
    })
}

/* Enviar un solo ataque (turno) al servidor */
function enviarAtaqueTurno(ataque) {
    fetch(`http://192.168.0.113:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ataque })
    })
    .then(res => {
        if (res.ok) {
            // esperar la respuesta del enemigo para ESTE TURNO (poll usando TU jugadorId)
            esperarAtaqueEnemigo()
        } else {
            console.warn('Error al enviar ataque, status', res.status)
        }
    })
}

/* ---------- CORRECCIÓN CRÍTICA ----------
   Antes se hacía GET con enemigoId; eso devolvía el jugador distinto a enemigoId (puede ser TU proprio),
   por eso veías tus ataques replicados.
   Ahora hacemos GET con TU jugadorId: /mokepon/{TU_ID}/ataques -> servidor devuelve ataques del ENEMIGO.
*/
function esperarAtaqueEnemigo() {
    // si no hay enemigo asignado (aún), usamos IA local para que funcione en local testing
    if (!enemigoId) {
        const ataqueIA = ataqueEnemigoAleatorioLocal()
        crearMensajeAtaqueEnemigo(ataqueIA)
        ataqueEnemigo.push(ataqueIA)
        // resolver inmediatamente con el último turno
        resolverTurno(ataqueJugador[ataqueJugador.length - 1], ataqueIA)
        return
    }

    // turno index que queremos resolver (último que hizo el jugador)
    const turnoIndex = ataqueJugador.length - 1

    // Polling: pedimos al servidor los ataques del ENEMIGO relativo a TI (pasando TU jugadorId)
    fetch(`http://192.168.0.113:8080/mokepon/${jugadorId}/ataques`)
        .then(res => {
            if (!res.ok) {
                // reintentar después
                setTimeout(esperarAtaqueEnemigo, 500)
                return null
            }
            return res.json()
        })
        .then(data => {
            if (!data) return
            const enemigosAtaques = Array.isArray(data.ataques) ? data.ataques : []
            // si el enemigo ya tiene ataque para este turno
            if (enemigosAtaques.length > turnoIndex) {
                const ataqueEnemigoTurno = enemigosAtaques[turnoIndex]
                // si no lo tenemos local, lo agregamos y lo mostramos
                if (ataqueEnemigo.length <= turnoIndex) {
                    ataqueEnemigo.push(ataqueEnemigoTurno)
                    crearMensajeAtaqueEnemigo(ataqueEnemigoTurno)
                }
                // resolver el turno con los dos ataques
                resolverTurno(ataqueJugador[turnoIndex], ataqueEnemigoTurno)
            } else {
                // aún no llegó el ataque enemigo para este turno → reintentar
                setTimeout(esperarAtaqueEnemigo, 500)
            }
        })
        .catch(err => {
            console.error('Error polling ataques enemigo:', err)
            setTimeout(esperarAtaqueEnemigo, 700)
        })
}

/* fallback IA local para pruebas sin servidor o si enemigoId no está definido */
function ataqueEnemigoAleatorioLocal() {
    const opciones = ['FUEGO','AGUA','TIERRA']
    return opciones[aleatorio(0, opciones.length - 1)]
}

/* resolver la lógica del turno (se llama cuando ambos ataques del turno están disponibles) */
function resolverTurno(ataqueJ, ataqueE) {
    // mostrar resultado y actualizar marcador
    if (ataqueJ === ataqueE) {
        crearMensaje('EMPATE')
    } else if (
        (ataqueJ === 'FUEGO' && ataqueE === 'TIERRA') ||
        (ataqueJ === 'AGUA' && ataqueE === 'FUEGO') ||
        (ataqueJ === 'TIERRA' && ataqueE === 'AGUA')
    ) {
        crearMensaje('GANASTE')
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else {
        crearMensaje('PERDISTE')
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
    }

    // si ya hay 5 turnos completos, revisar resultado final
    if (ataqueJugador.length === 5 && ataqueEnemigo.length === 5) {
        setTimeout(revisarVidas, 700)
    }
}

/* UI: mostrar mensajes y ataques en lista */
function crearMensaje(resultado) {
    sectionMensajes.innerHTML = resultado;
}
function crearMensajeAtaqueJugador(ataque) {
    const nuevo = document.createElement('p'); nuevo.textContent = ataque
    ataquesDelJugador.appendChild(nuevo);
}
function crearMensajeAtaqueEnemigo(ataque) {
    const nuevo = document.createElement('p'); nuevo.textContent = ataque
    ataquesDelEnemigo.appendChild(nuevo);
}

/* -------- funciones legacy (compatibilidad) -------- */
function ataqueEnemigoAleatorio () {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
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
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        indexAmbosOponentes(index, index)
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            crearMensaje("EMPATE")
        } else if (
            (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') ||
            (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') ||
            (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')
        ) {
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

/* resultado final */
function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo) {
        mensajeFinal('EMPATASTE, BRO!')
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal('FELICIDADES! GANASTE!!!')
    } else {
        mensajeFinal('PERDISTE BRO, LO SIENTO!')
    }
}
function mensajeFinal (resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'flex'
}
function reiniciarJuego(){
      fetch(`http://localhost:8080/salir/${jugadorId}`, {
        method: "DELETE"
    }).then(() => {
        // Reinicia el cliente también
        jugadorId = null
        ataquesJugador = []
        ataquesEnemigo = []
        vidasJugador = 0
        vidasEnemigo = 0

        // refrescar pantalla
        window.location.reload()
    })
}

/* ---------- canvas/mapa (sin cambios) ---------- */
function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    mascotaJugadorObjeto.x = Math.max(0, Math.min(mascotaJugadorObjeto.x, mapa.width - mascotaJugadorObjeto.ancho))
    mascotaJugadorObjeto.y = Math.max(0, Math.min(mascotaJugadorObjeto.y, mapa.height - mascotaJugadorObjeto.alto))

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.113:8080/mokepon/${jugadorId}/posicion`, {
        method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ x, y })
    })
    .then(function (res) {
        if (!res.ok) { console.warn('Respuesta no OK de /posicion', res.status); return; }
        return res.json();
    })
    .then(function (data) {
        if (!data) return;
        const enemigos = Array.isArray(data.enemigos) ? data.enemigos : [];
        const enemigosFiltrados = enemigos.filter(e => e && e.id);
        mokeponesEnemigos = enemigosFiltrados.map(function (enemigo) {
            let mokeponEnemigo = null;
            const mokeponNombre = enemigo.mokepon?.nombre || "";
            if (mokeponNombre === "Hipodoge") {
                mokeponEnemigo = new Mokepon('Hipodoge', './imagenes/fuego.png', 5, './imagenes/mokefuego.png', enemigo.id);
            } else if (mokeponNombre === "Capipepo") {
                mokeponEnemigo = new Mokepon('Capipepo', './imagenes/agua.png', 5, './imagenes/mokeagua.png', enemigo.id);
            } else if (mokeponNombre === "Ratigueya") {
                mokeponEnemigo = new Mokepon('Ratigueya', './imagenes/tierra.png', 5, './imagenes/moketierra.png', enemigo.id);
            } else {
                mokeponEnemigo = new Mokepon('Desconocido', './imagenes/mokeplaceholder.png', 1, './imagenes/mokeplaceholder.png', enemigo.id);
            }
            if (typeof enemigo.x === 'number') mokeponEnemigo.x = enemigo.x;
            if (typeof enemigo.y === 'number') mokeponEnemigo.y = enemigo.y;
            return mokeponEnemigo;
        });
        console.log('mokeponesEnemigos procesados:', mokeponesEnemigos);
    })
    .catch(function (err) { console.error('Error en enviarPosicion:', err); });
}

function moverDerecha() { mascotaJugadorObjeto.velocidadX = 5 }
function moverAbajo() { mascotaJugadorObjeto.velocidadY = 5 }
function moverIzquierda() { mascotaJugadorObjeto.velocidadX = -5 }
function moverArriba() { mascotaJugadorObjeto.velocidadY = -5 }
function detenerMovimiento() { mascotaJugadorObjeto.velocidadX = 0; mascotaJugadorObjeto.velocidadY = 0 }

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp': moverArriba(); break
        case 'ArrowRight': moverDerecha(); break
        case 'ArrowDown': moverAbajo(); break
        case 'ArrowLeft': moverIzquierda(); break
        default: break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
    sectionReglasJuego.style.display = 'none'
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) return mokepones[i]
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    mostrarAtaques(obtenerAtaquesPorNombre(enemigo.nombre))
    secuenciaAtaque()
}

function obtenerAtaquesPorNombre(nombre) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre === nombre) return mokepones[i].ataques
    }
    return []
}

/* start */
window.addEventListener('load', iniciarJuego)
