const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes.js")

app.use("filmes", filmesRoutes)
app.use("/series", seriesRoutes)

module.exports = app

