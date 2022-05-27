const routerFilmes = require("./routes/filmesRoutes")
const routerSeries = require("./routes/seriesRoutes")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.use("/filmes",routerFilmes)
app.use("/series",routerSeries)

module.exports = app 