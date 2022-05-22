const controller = require("../controllers/entradaController")

const express = require("express")

const router = express.Router()

router.get("", controller.getMessage)

module.exports = router