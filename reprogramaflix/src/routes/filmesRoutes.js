const controller = require("../controllers/filmesController")

const express = require("express") 


const router = express.Router()


router.get("/catalogo", controller.getAll)
router.get("/buscar/:id", controller.getById)
router.get("/filtrar", controller.searchTitle)
router.get("/genero", controller.searchGenre)
router.post("/cadastrar", controller.createMovie)
router.put("/substituir/:id", controller.replaceById)
router.patch("/updateTitulo/:id", controller.updateTitle)
router.patch("/updateYear/:id", controller.updateYear)
router.delete("/deletar/:id", controller.excluir)


module.exports = router