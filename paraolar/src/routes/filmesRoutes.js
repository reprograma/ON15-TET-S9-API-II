const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/lista", controller.getAll)
router.get("/lista/:id", controller.getById)
router.post("/lista", controller.createMovie)

module.exports = router