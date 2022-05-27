const express = require("express")
const app = express()

const filmesRoutes = require("./routes/filmesRoutes")
app.use("/filmes", filmesRoutes)

const seriesRoutes = require("./routes/seriesRoutes")
app.use("/series", seriesRoutes)



module.exports = app