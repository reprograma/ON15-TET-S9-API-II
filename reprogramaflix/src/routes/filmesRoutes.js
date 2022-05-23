
// filmesRouter.js

//AS ROTAS E METODOS DE FILMES

//chamar o controller de filmes
const controller = require("../controllers/filmesController")

const express = require("express") //chamando o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota, função)
router.get("/catalogo", controller.getAll)

//exportando pra ser usado no app.js
module.exports = router
