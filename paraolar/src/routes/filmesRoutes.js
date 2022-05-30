//AS ROTAS E METODOS DE FILMES

const controller = require("../controllers/filmesController")

const express = require("express")
const router = express.Router()

//router.metodo http(rota, função)
router.get("/filmes", controller.getAll)

router.get("/filmes/:id", controller.getById)

router.post("/filmes/cadastrar", controller.createMovie)

module.exports = router