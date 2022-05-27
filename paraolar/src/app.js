//centralizar o conteudo da aplicação
//config as rotas raizes

//chamei e executei o express
const express = require("express")
const app = express()

app.use(express.json())// uso o bodyparser

const cors = require("cors")
app.use(cors())

//import da continuação das rotas de filme
const filmesRoutes = require("./routes/filmesRoutes")
//import da continuação das rotas de series
const seriesRoutes = require("./routes/seriesRoutes")


//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//criando rota raiz de series
app.use("/series", seriesRoutes)


//exportando pra usar o app no server
module.exports = app