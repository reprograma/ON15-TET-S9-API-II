const controller = require("../controllers/seriesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.get("/nome", controller.getName)

router.get("/genero", controller.getGenre)

router.post("/cadastrar", controller.createSerie)

router.patch("/titulo/:id", controller.updateTitle)

router.patch("/alterar/:id", controller.updateSerie)

router.put("/substituir/:id", controller.changeAll)

router.delete("/deletar/:id", controller.deleteAll)

module.exports = router







module.exports = router