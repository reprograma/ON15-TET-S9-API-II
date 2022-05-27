//   const filmesJson = require("../models/filmes.json")
//   const seriesJson = require("..models/series.json")

//  const express = require("express")
//  const app = express()
//  app.use(express.json())

 


const app = require("./src/app")

const PORT = 3040

app.listen(PORT, () => {
    console.log(`PORTA RODANDO ${PORT}`)
})



