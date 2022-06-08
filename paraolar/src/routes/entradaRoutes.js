// IMPORTAR FUNÇÕES CONTROLE - ENTRADA
const controller = require("../controllers/entradaController");

const express = require("express");

const router = express.Router();

// ROTA MENSAGEM
router.get("", controller.getMessage);

module.exports = router