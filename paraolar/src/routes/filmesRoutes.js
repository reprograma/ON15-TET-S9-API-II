//AS ROTAS E METODOS DE FILMES

//chamar o controller de filmes
const controller = require("../controllers/filmesController")

const express = require("express") //chamando o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.post("/cadastrar", controller.createMovie)

router.get("/filtrar", controller.searchTitle)

router.get("/genero", controller.searchGenre)

router.put("/substituir/:id", controller.replaceById)

router.patch("/updateTitulo/:id", controller.updateTitle)

router.patch("/updateGenre/:id", controller.updateGenre)

router.delete("/deletar/:id", controller.excluir)


//exportando pra ser usado no app.js
module.exports = router

