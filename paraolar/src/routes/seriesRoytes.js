//As rotas e métodos para Séries


const controller = require('../controllers/seriesController')

const express = require('express')

//função express
const router = express.Router()

//router.metodo http(rota,função)
router.get('/catalogo', controller.getAll)

router.get('/catalogo/:id', controller.getById)

router.get('/title', controller.getByTitle)

router.get('/genero', controller.getByGenre)

router.post('/adicionar', controller.createSerie)

router.delete('/delete/:id', controller.deleteById)

router.put('/substituir/:id', controller.updateAll)

router.patch('/atualizarTitulo/:id', controller.updateTitle)

router.patch('/atualizarItem/:id', controller.updateBody)

module.exports = router
