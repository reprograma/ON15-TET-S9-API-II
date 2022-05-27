const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json()) 

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

app.use("/filmes", filmesRoutes)

app.use("/series", seriesRoutes)

module.exports = app