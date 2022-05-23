<<<<<<< HEAD
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






=======
//centralizar o conteudo da aplição
//config as rotas raizes

//chamei o express
const express = require("express")
const app = express() //executei

app.use(express.json()) //uso o bodyparser

//import da continuação das rotas de filme
const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//criando a rota raiz de series
app.use("/series", seriesRoutes)

//exportando pra usar o app no server.js
module.exports = app
>>>>>>> d7fd2eb411423ef73c1141bce9253dee1645f020
