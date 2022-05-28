//AS ROTAS E METODOS DE FILMES

//chamar o controller de filmes
const controller = require("../controllers/filmesController")

const express = require("express") //chamando o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.get("/filtro", controller.getByTitle)

router.post("/cadastrar", controller.createMovie)

router.put("/catalogo/update/:id", controller.replaceMovie)

router.patch("/updateTitle/:id", controller.updateTitle)

router.patch("/updateBody/:id", controller.updateBody)

router.delete("/catalogo/deletar/:id", controller.deleteMovie)

//exportando pra ser usado no app.js
module.exports = router
