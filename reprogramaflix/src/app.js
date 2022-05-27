//configurar as rota raiz de todos os arquivos 
//centralizando todo o conteudo da aplicação

const express = require("express")
const app = express()

app.use(express.json()) //para uso do bodyparser no post

//importar a continuação das rotas do filme
const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRouters")

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//criando rota raiz de séries
app.use("/series", seriesRoutes)


//exportando pra usar no server.js
module.exports = app