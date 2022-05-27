const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/buscar/:id", controller.getById)

router.get("/filtro", controller.getTitle)

router.get("/genero", controller.getByGenre)

router.post("/cadastrar", controller.createSerie)

router.delete("/deletar/:id", controller.deleteById)

router.put("/substituir/:id", controller.updateAll)

router.patch("/updateTitulo/:id", controller.updateTille)

router.patch("/update/:id", controller.update)

module.exports = router