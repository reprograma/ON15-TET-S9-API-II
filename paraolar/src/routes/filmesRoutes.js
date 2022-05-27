const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll) 

router.get("/buscar/:id", controller.getById)

router.get("/filtrar", controller.getByTitle)

router.get("/genero", controller.getByGenre)

router.post("/cadastrar", controller.createMovie)

router.put("/substituir/:id", controller.replaceTitle)

router.patch("/updateTitulo/:id", controller.updateTitle)

router.delete("/deletar/:id", controller.deleteTitle)

module.exports = router