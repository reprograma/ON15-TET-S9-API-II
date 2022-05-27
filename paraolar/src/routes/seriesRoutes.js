const controller = require("../controllers/seriesController")

//chamar o express
const express = require("express")

//função de rotas do express
const router = express.Router()

//construção: router.métodoUsadoDoCRUD(minharota, funçaoUsada) 
//aqui estarão todas as rotas construídas por meio das lógicas no Controller

//[GET] /series/catalogo (todas as séries)
router.get("/catalogo", controller.getAll)
//[GET] /series/:id
router.get("/:id", controller.getById)
//[GET] /series?titulo:value (serie pelo nome)
router.get("/visualizarSerie", controller.searchTitle)
//[GET] /series?genero:value (retorna série pelo gênero)
router.get("/series/genero", controller.searchByGenre)
//[POST]/series/criar
router.post("/criar", controller.createShow)
//[DELETE]/series/deletar/:id
router.delete("/deletar/:id", controller.deleting)
//[PUT]/series/update/:id (atualiza por inteiro)
router.put("/update/:id", controller.completeUpdate)
//[PATCH]/series/updateTitle?id=value
router.patch("/updateTitle/:id", controller.updatedTitle)


//[PATCH]/series/update/:id (atualiza o que vier no body)
//nao entendi o que é pra ser feito nessa rota 

module.exports = router