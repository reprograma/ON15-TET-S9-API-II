const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)                          // TODOS OS FILMES

router.get("/catalogo/:id", controller.getByID)                     // FILMES POR ID

router.get("/titulo", controller.getByTitle)                        // FILMES POR TITULO

router.get("/genero", controller.getByGenre)                        // FILMES POR GENERO

router.post("/cadastrar", controller.createMovie)                   // CADASTRAR FILME

router.delete("/deletar/:id", controller.deleteByID)                 // DELETAR FILME

router.put("/substituir/:id", controller.updateAll)                 // SUBSTITUI TODOS OS ITENS DE FILME

router.patch("/updateTitulo/:id", controller.updateTitle)           // ATUALIZAR TITULO DO FILME

router.patch("/updateItens/:id", controller.updateItens)            // ATUALIZAR QUALQUER ITEM DO FILME

module.exports = router                                             // EXPORTAR TODAS AS ROTAS