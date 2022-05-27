//rotas e verbos

//na pasta Routes chamamos os controlles (nesse caso, de filmes)
const controller = require("../controllers/filmesControllers")

//chamar o express
const express = require("express")

//função de rotas do express
const router = express.Router()

//construção: router.métodoUsadoDoCRUD(minharota, funçaoUsada) 
//aqui estarão todas as rotas construídas por meio das lógicas no Controller

//[GET] /filmes/catalogo (todos os filmes)
router.get("/catalogo", controller.getAll)
//[GET] /filmes/:id (filmes pelo ID)
router.get("/:id", controller.getById)
//[GET] /filmes?titulo:value
router.get("/visualizarFilme", controller.searchTitle)
//[POST]/filmes/criar
router.post("/criar", controller.createMovie)
//[DELETE]/filmes/deletar/:id
router.delete("/deletar/:id", controller.deleting)
//[PUT]/filmes/update/:id
router.put("/update/:id", controller.completeUpdate)
//[PATCH]/filmes/updateTitle?id=value
router.patch("/updateTitle/:id", controller.updatedTitle)

//[PATCH]/filmes/update/:id (atualiza o que vier no body)
//nao entendi o que é pra ser feito nessa rota 

module.exports = router