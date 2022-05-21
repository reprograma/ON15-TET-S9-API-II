//centralizar o conteudo da aplição
//config as rotas raizes

//chamei o express
const express = require("express")
const app = express() //executei

//import da continuação das rotas de filme
const filmesRoutes = require("./routes/filmesRoutes")

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//exportando pra usar o app no server.js
module.exports = app
