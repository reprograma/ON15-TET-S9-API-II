const controller = require("../controllers/filmesController")

const express = require("express") 


const router = express.Router()


router.get("/catalogo", controller.getAll)
router.get("/:id", controller.getById)
router.get("/pesquisar", controller.searchTitle)
router.post("/criar", controller.createMovie)
router.delete("/deletar/:id", controller.deleteMovie)
router.patch("/update/:id", controller.updateMovie)
router.patch("/updateTitle", controller.updateTitle)


module.exports = router
