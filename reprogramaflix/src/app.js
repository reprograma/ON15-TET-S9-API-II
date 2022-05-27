//centralizar o conteudo da aplição
//config as rotas raizes

//chamei o express
const express = require("express")
const app = express() //executei

app.use(express.json()) //uso o bodyparser

//import da continuação das rotas de filme
const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//criando a rota raiz de series
app.use("/series", seriesRoutes)

//exportando pra usar o app no server.js
module.exports = app


const express = require("express")
const cors = require("cors")

const app2 = express()


app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes.js")
const seriesRoutes = require("./routes/seriesRoutes.js")

app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)

module.exports = app2
