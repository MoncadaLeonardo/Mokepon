const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaque(ataque) {
        if (!this.ataques) {
            this.ataques = []
        }
        this.ataques.push(ataque)
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({ enemigos })
})

// 👉 Guardar un ataque del jugador
app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataque = req.body.ataque || null
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0 && ataque) {
        jugadores[jugadorIndex].asignarAtaque(ataque)
    }

    res.end()
})

// 👉 Obtener ataques del enemigo
app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const enemigo = jugadores.find((jugador) => jugador.id !== jugadorId)
    
    res.send({
        ataques: enemigo?.ataques || []
    })
})

app.delete("/salir/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId)

    if (jugadorIndex >= 0) {
        jugadores.splice(jugadorIndex, 1) // eliminar jugador de la lista
        console.log(`Jugador ${jugadorId} eliminado`)
    }

    res.end()
})

app.listen(8080, () => {
    console.log("Servidor Funcionando en http://localhost:8080")
})
