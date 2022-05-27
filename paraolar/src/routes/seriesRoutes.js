const controller = require("../controllers/seriesController")
const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/:id", controller.getById)
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.post("/cadastrar", controller.createSerie)
router.delete("/deletar/:id", controller.deleteSerie)
router.put("/update/:id", controller.updateSerie)
router.patch("/update/titulo", controller.updateByTitle)
router.patch("/updateParcial/:id", controller.updateById)

module.exports = router