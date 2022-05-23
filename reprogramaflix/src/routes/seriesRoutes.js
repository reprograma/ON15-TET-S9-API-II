// IMPORTAR FUNÇÕES CONTROLE - SERIES
const controller = require("../controllers/seriesController");

const express = require("express");

const router = express.Router();

// ROTA TODAS AS SERIES
router.get("/catalogo", controller.getAll);

// ROTA BUSCAR SERIES POR ID
router.get("/buscar/:id", controller.getByID);

// ROTA BUSCAR SERIES POR TITULO
router.get("/filtro", controller.getByTitle);

// ROTA BUSCAR SERIES POR GENERO
router.get("/genero", controller.getByGenre);

// ROTA CADASTRAR NOVA SERIE
router.post("/cadastrar", controller.createSerie);

// ROTA DELETAR SERIE POR ID
router.delete("/delete/:id", controller.deleteByID);

// ROTA SUBSTITUIR SERIE INTEIRA
router.put("/substituir/:id", controller.updateAll);

// ROTA ATUALIZAR TITULO DA SERIE
router.patch("/updateTitulo/:id", controller.updateTitle);

// ROTA ATUALIZAR QUALQUER ITEM DA SERIE
router.patch("/updateItens/:id", controller.updateItems);

// EXPORTAR ROTAS
module.exports = router