//ROTAS E MÉTODOS DE SÉRIES

//chamar o controller de series
const controller = require("../controllers/seriesController")

const express = require("express") //chamando o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota, função)
router.get("/", controller.getAll)


router.get("/:id", controller.getById)

router.post("/cadastrar", controller.creatMovie)

//exportando pra ser usado no app.js
module.exports = router

