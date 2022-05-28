const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

//router.metodo http(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.get("/filtro", controller.getByTitle)

router.post("/cadastrar", controller.createSerie)

router.put("/catalogo/update/:id", controller.replaceSerie)

router.patch("/updateTitle/:id", controller.updateTitle)

router.patch("/updateBody/:id", controller.updateBody)

router.delete("/catalogo/deletar/:id", controller.deleteSerie)

module.exports = router