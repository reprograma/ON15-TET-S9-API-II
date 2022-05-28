const express = require("express");
const routes = express.Router();
const controller = require("../controller/seriesController");


routes.get("/listar", controller.getAll);
routes.get("/listar/:id", controller.getById);
routes.get("/buscarNome", controller.getByTitle);
routes.post("/criar", controller.createSerie);
routes.put("/atualizar/:id", controller.atualizarSerie);
routes.patch("/atualizarTitulo/:id", controller.atualizarPorId);
routes.patch("/atualizaTitulo", controller.atualizarPorTitulo);
routes.delete("/deletar/:id", controller.deletarPorId);



module.exports = routes;