const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/buscar/:id", controller.getByID)

router.get("/filtro", controller.getByTitle)

router.post("/cadastrar", controller.createSerie)

router.delete("/delete/:id", controller.deleteByID)

router.put("/substituir/:id", controller.updateAll)

router.patch("/updateTitulo/:id", controller.updateTitle)

module.exports = router