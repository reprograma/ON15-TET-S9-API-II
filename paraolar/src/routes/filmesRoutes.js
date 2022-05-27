const controller = require("../controllers/filmesController")

const express = require("express") 


const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/buscar/:id", controller.getById)

router.get("/filtro", controller.getTitle)

router.post("/cadastrar", controller.createMovie)

router.delete("/deletar/:id", controller.deleteById)

router.put("/substituir/:id", controller.updateAll)

router.patch("/updateTitulo/:id", controller.updateTille)

router.patch("/update/:id", controller.update)

module.exports = router