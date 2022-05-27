//As rotas e metodos de filmes

//chamar o controller de filmes
const controller = require("../controllers/filmesController")

const express = require("express") //chamar o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota,função)
router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.post("/cadastrar", controller.createMovie)

module.exports = router