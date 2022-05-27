const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const filmesRoutes = require("./routes/filmesRoutes")

module.exports = app