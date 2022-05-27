//As rotas e métodos de Filmes

//Chamar o controller de filmes
const controller = require('../controllers/filmesController')

const express = require('express')

//função de rotas do express
const router = express.Router()

//router.metodo http(rota,função)
router.get('/catalogo', controller.getAll)

router.get('/catalogo/:id', controller.getById)

router.get('/title', controller.getByTitle)

router.post('/cadastrar', controller.createMovie)

router.delete('/deletar/:id', controller.deleteById)

router.put('/atualizar/:id', controller.updateAll)

router.patch('/atualizar/title/:id', controller.updateTitle)

router.patch('/atualizar/body/:id', controller.updateBody)

//exportando pra ser usado no app.js
module.exports = router