const express = require("express")
const app = express() 

app.use(express.json()) 

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")
//RAIZ FILME        
app.use("/filmes", filmesRoutes)
//RAIZ SERIES
app.use("/series", seriesRoutes)

//exportando pra usar o app no server.js
module.exports = app
