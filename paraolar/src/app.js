const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes.js")
const seriesRoutes = require("./routes/seriesRoutes.js")
const entradaRoutes = require("./routes/entradaRoutes.js")

app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)
app.use("/assistir", entradaRoutes)

module.exports = app






