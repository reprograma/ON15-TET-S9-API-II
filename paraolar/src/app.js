//centralizar o conteudo da aplição
//config as rotas raizes

//chamei o express
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes.js")
const seriesRoutes = require("./routes/seriesRoutes.js")

app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)


module.exports = app