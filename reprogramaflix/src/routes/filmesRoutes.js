const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/buscar/:id", controller.getByID)

router.get("/filtro", controller.getByTitle)

router.get("/genero", controller.getByGenre)

router.post("/cadastrar", controller.createMovie)

router.delete("/delete/:id", controller.deleteByID)

router.put("/substituir/:id", controller.updateAll)

router.patch("/updateTitulo/:id", controller.updateTitle)

router.patch("/updateItens/:id", controller.updateItems)

module.exports = router

