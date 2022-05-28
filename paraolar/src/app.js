const express = require("express")   // VARiÁVEL PARA IMPORTAR EXPRESS

const cors = require("cors")        // VAR PARA IMPORTAR O CORS

const app = express()    

app.use(express.json())           //PERMITE BODYPARSER

app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes.js")          // VARiÁVEL COM A ROTAS DOS FILMES

const seriesRoutes = require("./routes/seriesRoutes.js")         // VARiÁVEL COM A ROTAS DAS SÉRIES

app.use("/filmes", filmesRoutes)                                // ROTA RAÍZ DOS FILMES

app.use("/series", seriesRoutes)                               // ROTA RAÍZ DAS SÉRIES

module.exports = app                                          // EXPORTANDO APP