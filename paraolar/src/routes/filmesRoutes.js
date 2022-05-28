//rotas chama o controler

const filmesController = require("../controller/filmesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo",filmesController.getAll)
// router.get("/:id",filmesController.getId)
// router.get("/",filmesController.getNome)
router.post("/criar",filmesController.create)
router.delete("/deletar/:id",filmesController.deletar)
router.put("/update/:id",filmesController.updateId)
//router.patch("/updateTitle",filmesController.updateTitle)
//router.patch("/update:id",filmesController.updateId)

module.exports = router