const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)

module.exports = app