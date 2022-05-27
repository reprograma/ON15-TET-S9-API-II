//indicação das rotas e requisições | configuração das rotas raízes 

//chamando o express
const express = require("express")
//executando o express
const app = express()
//body parser
app.use(express.json())

const filmesRoutes = require("./routes/filmesRoutes.js")
const seriesRoutes = require("./routes/seriesRoutes")

//rotas RAÍZES de filmes e séries
app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)

//exportando o app para usar fora do app.js
module.exports = app