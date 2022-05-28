//puxa / chama as rotas
const filmesRoutes = require("./routes/filmesRoutes")

const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/filmes",filmesRoutes)


module.exports = app