const controller =require("../controllers/seriesController.js")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/buscar/:id", controller.getById)
router.get("/filtrar", controller.searchTitle)
router.get("/genero", controller.searchGenre)
router.post("/cadastrar", controller.createMovie)
router.put("/substituir/:id", controller.replaceById)
router.patch("/updateTitulo/:id", controller.updateTitle)
router.patch("/updateActors/:id", controller.updateActors)
router.delete("/deletar/:id", controller.deletar)

module.exports = router