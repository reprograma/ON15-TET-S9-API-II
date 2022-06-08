// IMPORTAR EXPRESS
const express = require("express");

// IMPORTAR CORS
const cors = require("cors");

const app = express();

// PERMITE QUE A API DECODIFIQUE OS REQUESTS
app.use(express.json());

app.use(cors());

// IMPORTAR ROTAS DE FILMES
const filmesRoutes = require("./routes/filmesRoutes.js");

// IMPORTAR ROTAS DE SERIES
const seriesRoutes = require("./routes/seriesRoutes.js");

// IMPORTAR ROTAS DE ENTRADA
const entradaRoutes = require("./routes/entradaRoutes.js");

// DEFINIR INICIO DA ROTA FILME 
app.use("/filmes", filmesRoutes);

// DEFINIR INICIO DA ROTA SERIE
app.use("/series", seriesRoutes);

// DEFINIR INICIO DA ROTA ENTRADA
app.use("/assistir", entradaRoutes);

// EXPORTAR INICIO DAS ROTAS
module.exports = app






