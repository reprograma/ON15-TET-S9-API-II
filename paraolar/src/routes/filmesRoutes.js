const control = require("../controllers/filmesController")
const express = require("express")
const router = express.Router()

router.get("/assistir",control.getAll)
router.get("/buscar/:id",control.getById)
router.get("/buscar",control.getByTitle)
router.get("/filtrar",control.getByGenre)
router.delete("/deletar/:id",control.deleteById)
router.post("/criar",control.createMovie)
router.put("/update/:id",control.updateAll)
router.patch("/update/:id",control.update)
router.patch("/updatetitle",control.updateTitle)


module.exports = router