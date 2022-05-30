const controller = require("../controllers/seriesController")

const express = require("express")
const router = express.Router()

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createMovie)

module.exports = router