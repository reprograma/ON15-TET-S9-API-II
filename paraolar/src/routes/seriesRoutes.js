const controller = require ("../controllers/seriesController")

const express = require ("express") 

const router = express.Router()


router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.get("/filtro", controller.getFiltro)

router.post("/cadastrar", controller.createMovie)

router.delete("/delete/:id", controller.deletePorId)

router.put("/update/:id", controller.putUpdateId)

router.patch("/updatetitle/:id", controller.patchUpdateTitleid)

router.patch("/update/titulo", controller.patchUpdateTitle)

module.exports = router