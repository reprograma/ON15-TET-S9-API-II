const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)                             // TODAS AS SERIES

router.get("/catalogo/:id", controller.getByID)                        // SERIES POR ID
                                      
router.get("/titulo", controller.getByTitle)                           // SERIES POR TITULO

router.get("/genero", controller.getByGenre)                           // SERIES POR GENERO

router.post("/cadastrar", controller.createSerie)                      // CADASTRAR SERIE

router.delete("/deletar/:id", controller.deleteByID)                    // DELETAR SERIE

router.put("/substituir/:id", controller.updateAll)                    // SUBSTITUI TODOS OS ITENS DE UMA SERIE

router.patch("/updateTitulo/:id", controller.updateTitle)              // SUBSTITUI O TITULO DE UMA SERIE

router.patch("/updateItens/:id", controller.updateItens)               // ATUALIZAR QUALQUER ITEM DE UMA SERIE

module.exports = router                                                // EXPORTAR TODAS AS ROTAS