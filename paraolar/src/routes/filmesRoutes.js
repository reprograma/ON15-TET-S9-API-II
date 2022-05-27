const controller = require("../controllers/filmesController")
const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/:id", controller.getById)
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.post("/cadastrar", controller.createMovie)
router.delete("/deletar/:id", controller.deleteMovie)
router.put("/update/:id", controller.updateMovie)
router.patch("/update/titulo", controller.updateByTitle)
router.patch("/updateParcial/:id", controller.updateById)

module.exports = router