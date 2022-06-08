<<<<<<< HEAD
// IMPORTAR FUNÇÕES CONTROLE - FILMES
const controller = require("../controllers/filmesController");

const express = require("express");

const router = express.Router();

// ROTA TODOS OS FILMES
router.get("/catalogo", controller.getAll);

// ROTA BUSCAR FILMES POR ID
router.get("/buscar/:id", controller.getByID);

// ROTA BUSCAR FILMES POR TITULO
router.get("/filtro", controller.getByTitle);

// ROTA BUSCAR FILMES POR GENERO
router.get("/genero", controller.getByGenre);

// ROTA CADASTRAR NOVO FILME
router.post("/cadastrar", controller.createMovie);

// ROTA DELETAR FILME POR ID
router.delete("/delete/:id", controller.deleteByID);

// ROTA SUBSTITUIR FILME INTEIRO
router.put("/substituir/:id", controller.updateAll);

// ROTA ATUALIZAR TITULO DO FILME
router.patch("/updateTitulo/:id", controller.updateTitle);

// ROTA ATUALIZAR QUALQUER ITEM DO FILME
router.patch("/updateItens/:id", controller.updateItems);

// EXPORTAR ROTAS
module.exports = router

=======
//AS ROTAS E METODOS DE FILMES

//chamar o controller de filmes
const controller = require("../controllers/filmesController")

const express = require("express") //chamando o express

//função de rotas do express
const router = express.Router()

//router.metodo http(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/catalogo/:id", controller.getById)

router.post("/cadastrar", controller.createMovie)

//exportando pra ser usado no app.js
module.exports = router
>>>>>>> d7fd2eb411423ef73c1141bce9253dee1645f020
