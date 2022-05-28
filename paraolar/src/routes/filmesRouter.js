const controller = require("../controllers/filmesController")
const express = require("express")
const router = express.Router()

router.get("/catalago", controller.getAll)
router.get("/catalago/:id", controller.getById)
router.post("/cadastrar", controller.creatMovie)

module.exports = router


